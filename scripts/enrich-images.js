#!/usr/bin/env node
/**
 * Enriquece perfumes.json con fotos reales del frasco.
 * Cascada (en orden de prioridad por calidad de match):
 *   1. DuckDuckGo Images (devuelve el producto especifico)
 *   2. Open Beauty Facts API (libre, fotos de productos)
 *   3. Wikimedia Commons (filtrado por marca/nombre en titulo)
 *   4. Wikipedia (solo si la pagina tiene "perfume" o "fragrance"
 *      y la marca/nombre en el titulo)
 *
 * Uso:
 *   node scripts/enrich-images.js              # todos sin imagen
 *   node scripts/enrich-images.js --sample 30  # solo 30 al azar
 *   node scripts/enrich-images.js --force      # reescribe los que ya tienen
 */

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "perfumes.json");
const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const SAMPLE_IDX = args.indexOf("--sample");
const SAMPLE = SAMPLE_IDX >= 0 ? parseInt(args[SAMPLE_IDX + 1], 10) : null;

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

async function fetchSafe(url, opts = {}) {
  try {
    const r = await fetch(url, {
      ...opts,
      headers: { "User-Agent": UA, ...(opts.headers || {}) }
    });
    return r;
  } catch (e) {
    return null;
  }
}

async function imageHeadOk(url) {
  try {
    const r = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": UA }
    });
    if (!r.ok) return false;
    const t = r.headers.get("content-type") || "";
    const l = parseInt(r.headers.get("content-length") || "0", 10);
    if (!t.startsWith("image/")) return false;
    if (l && l < 3000) return false;
    return true;
  } catch (e) {
    return false;
  }
}

// ============ 1) DuckDuckGo Images ============
async function tryDuckDuckGo(perfume) {
  const q = `${perfume.brand} ${perfume.name} ${perfume.concentration} perfume bottle`;
  const initUrl = `https://duckduckgo.com/?q=${encodeURIComponent(
    q
  )}&iax=images&ia=images`;
  const initRes = await fetchSafe(initUrl);
  if (!initRes || !initRes.ok) return null;
  const html = await initRes.text();
  const vqdMatch =
    html.match(/vqd=['"]([\d-]+)['"]/) ||
    html.match(/vqd=([\d-]+)/);
  if (!vqdMatch) return null;
  const vqd = vqdMatch[1];

  const imgUrl = `https://duckduckgo.com/i.js?l=es-es&o=json&q=${encodeURIComponent(
    q
  )}&vqd=${vqd}&p=1&s=0`;
  const ir = await fetchSafe(imgUrl, {
    headers: {
      Referer: initUrl,
      Accept: "application/json"
    }
  });
  if (!ir || !ir.ok) return null;
  let ij;
  try {
    ij = await ir.json();
  } catch (e) {
    return null;
  }
  const results = ij.results || [];
  const brandN = norm(perfume.brand);
  const nameN = norm(perfume.name);
  // Filtramos: que la URL o titulo contenga la marca, prioritarios
  const scored = results
    .map((r) => {
      const u = r.image || r.thumbnail || "";
      const t = norm(r.title || "") + " " + norm(r.source || "") + " " + norm(u);
      let s = 0;
      if (t.includes(brandN)) s += 5;
      if (t.includes(nameN)) s += 5;
      if (/notino|druni|primor|sephora|fragrantica|parfumo|amazon|elcorteingles|douglas/.test(t))
        s += 3;
      if (r.width && r.width >= 400) s += 2;
      if (/\.(jpg|jpeg|png|webp)(\?|$)/i.test(u)) s += 1;
      return { r, s, u };
    })
    .filter((x) => x.u && x.s > 0)
    .sort((a, b) => b.s - a.s);

  for (const x of scored.slice(0, 6)) {
    if (await imageHeadOk(x.u)) {
      return {
        image: x.u,
        imageSource: x.r.source || new URL(x.u).hostname,
        imageTitle: x.r.title || `${perfume.brand} ${perfume.name}`,
        imageLicense: "© original owner"
      };
    }
  }
  return null;
}

// ============ 2) Open Beauty Facts ============
async function tryOpenBeautyFacts(perfume) {
  const q = `${perfume.brand} ${perfume.name}`;
  const url = `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    q
  )}&search_simple=1&action=process&json=1&page_size=5`;
  const r = await fetchSafe(url);
  if (!r || !r.ok) return null;
  let j;
  try { j = await r.json(); } catch (e) { return null; }
  const products = j.products || [];
  const brandN = norm(perfume.brand);
  const nameN = norm(perfume.name);
  for (const p of products) {
    const pn = norm(p.product_name || "");
    const pb = norm(p.brands || "");
    if (!(pn.includes(nameN) || pb.includes(brandN))) continue;
    const img = p.image_front_url || p.image_url || p.image_small_url;
    if (img && (await imageHeadOk(img))) {
      return {
        image: img,
        imageSource: "Open Beauty Facts",
        imageTitle: p.product_name || perfume.name,
        imageLicense: "CC BY-SA 3.0"
      };
    }
  }
  return null;
}

// ============ 3) Wikimedia Commons (filtrado) ============
async function tryCommons(perfume) {
  const q = `${perfume.brand} ${perfume.name} perfume`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(
    q
  )}&gsrlimit=5&prop=imageinfo&iiprop=url|size&origin=*`;
  const r = await fetchSafe(url);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const pages = j.query?.pages || {};
  const brandN = norm(perfume.brand);
  const nameN = norm(perfume.name);
  for (const k of Object.keys(pages)) {
    const title = pages[k].title || "";
    const tN = norm(title);
    if (!(tN.includes(brandN) || tN.includes(nameN))) continue;
    const info = pages[k].imageinfo?.[0];
    if (info?.url && /\.(jpg|jpeg|png|webp)$/i.test(info.url)) {
      if (await imageHeadOk(info.url)) {
        return {
          image: info.url,
          imageSource: "Wikimedia Commons",
          imageTitle: title,
          imageLicense: "Creative Commons"
        };
      }
    }
  }
  return null;
}

// ============ 4) Wikipedia (filtrado estricto) ============
async function tryWikipedia(perfume) {
  const langs = ["en", "es", "fr"];
  const brandN = norm(perfume.brand);
  const nameN = norm(perfume.name);
  for (const lang of langs) {
    const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
      `${perfume.brand} ${perfume.name} perfume`
    )}&srlimit=5&utf8=1&origin=*`;
    const r = await fetchSafe(searchUrl);
    if (!r || !r.ok) continue;
    const j = await r.json();
    const hits = j.query?.search || [];
    for (const hit of hits) {
      const title = hit.title;
      const tN = norm(title);
      // Solo aceptar si: contiene marca Y nombre, O contiene "perfume"/"fragrance"
      const hasMarca = tN.includes(brandN);
      const hasNombre = tN.includes(nameN);
      const isPerfumePage = /perfume|fragrance|eau de|parfum/.test(tN);
      if (!((hasMarca && hasNombre) || (isPerfumePage && (hasMarca || hasNombre)))) continue;

      const pageUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles=${encodeURIComponent(
        title
      )}&origin=*`;
      const pr = await fetchSafe(pageUrl);
      if (!pr || !pr.ok) continue;
      const pj = await pr.json();
      const pages = pj.query?.pages || {};
      for (const k of Object.keys(pages)) {
        const original = pages[k].original;
        if (original?.source && (await imageHeadOk(original.source))) {
          return {
            image: original.source,
            imageSource: `Wikipedia (${lang})`,
            imageTitle: title,
            imageLicense: "Wikipedia"
          };
        }
      }
    }
  }
  return null;
}

const SOURCES = [
  ["ddg", tryDuckDuckGo],
  ["openbeauty", tryOpenBeautyFacts],
  ["commons", tryCommons],
  ["wikipedia", tryWikipedia]
];

async function enrichOne(perfume) {
  for (const [name, fn] of SOURCES) {
    try {
      const result = await fn(perfume);
      if (result) return { ...result, _via: name };
    } catch (e) {
      // skip
    }
    await sleep(120);
  }
  return null;
}

(async () => {
  let candidates = data.filter((p) => FORCE || !p.image);
  if (SAMPLE) {
    candidates = candidates
      .sort(() => Math.random() - 0.5)
      .slice(0, SAMPLE);
  }
  console.log(`Procesando ${candidates.length} perfumes`);
  let ok = 0;
  let fail = 0;
  const sourceCount = {};
  for (let i = 0; i < candidates.length; i++) {
    const p = candidates[i];
    const result = await enrichOne(p);
    if (result) {
      p.image = result.image;
      p.imageSource = result.imageSource;
      p.imageTitle = result.imageTitle;
      p.imageLicense = result.imageLicense;
      ok++;
      sourceCount[result._via] = (sourceCount[result._via] || 0) + 1;
      console.log(
        `  ✓ [${i + 1}/${candidates.length}] ${p.brand} ${p.name} (${result._via})`
      );
    } else {
      fail++;
      console.log(`  ✗ [${i + 1}/${candidates.length}] ${p.brand} ${p.name}`);
    }
    if ((i + 1) % 10 === 0) {
      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }
    await sleep(300);
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  console.log(
    `\nTotal: ${ok} OK, ${fail} fail (${((ok * 100) / candidates.length).toFixed(0)}%)`
  );
  console.log("Por fuente:", sourceCount);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
