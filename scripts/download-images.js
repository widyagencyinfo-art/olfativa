#!/usr/bin/env node
/**
 * Descarga cada imagen externa de perfumes.json a public/photos/perfumes/
 * y reemplaza el campo image por la URL local. Asi:
 * - No dependemos de servidores externos que cambian/expiran/bloquean
 * - No hay problemas de hotlinking (403 Akamai)
 * - El servidor es Vercel CDN: mas rapido y siempre disponible
 *
 * Si una imagen no se puede descargar (403, 404, timeout), el campo
 * image se borra y la ficha cae al OG dinamico que ya generamos.
 */

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "perfumes.json");
const OUT_DIR = path.join(__dirname, "..", "public", "photos", "perfumes");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const args = process.argv.slice(2);
const FORCE = args.includes("--force");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36";

function pickExt(url, contentType) {
  if (contentType?.includes("png")) return "png";
  if (contentType?.includes("webp")) return "webp";
  if (contentType?.includes("jpeg")) return "jpg";
  if (contentType?.includes("jpg")) return "jpg";
  const m = url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i);
  if (m) return m[1].toLowerCase() === "jpeg" ? "jpg" : m[1].toLowerCase();
  return "jpg";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function downloadOne(perfume) {
  const url = perfume.image;
  if (!url || !url.startsWith("http")) return { ok: false, reason: "no-url" };
  // Si ya esta descargada y no force, skip
  if (!FORCE) {
    for (const ext of ["jpg", "png", "webp"]) {
      if (fs.existsSync(path.join(OUT_DIR, `${perfume.slug}.${ext}`))) {
        return { ok: true, reason: "cached", ext };
      }
    }
  }
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "es,en;q=0.9"
      },
      redirect: "follow"
    });
    if (!res.ok) return { ok: false, reason: `status-${res.status}` };
    const ct = res.headers.get("content-type") || "";
    if (!ct.startsWith("image/")) return { ok: false, reason: "not-image" };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 3000) return { ok: false, reason: "too-small" };
    const ext = pickExt(url, ct);
    const outPath = path.join(OUT_DIR, `${perfume.slug}.${ext}`);
    fs.writeFileSync(outPath, buf);
    return { ok: true, ext, bytes: buf.length };
  } catch (e) {
    return { ok: false, reason: `err-${e.code || e.message}` };
  }
}

(async () => {
  const candidates = data.filter(
    (p) => p.image && p.image.startsWith("http")
  );
  console.log(`Descargando ${candidates.length} imagenes...`);
  let okCount = 0;
  let failCount = 0;
  const reasons = {};
  for (let i = 0; i < candidates.length; i++) {
    const p = candidates[i];
    const r = await downloadOne(p);
    if (r.ok) {
      p.image = `/photos/perfumes/${p.slug}.${r.ext}`;
      okCount++;
      if (i % 20 === 0 || r.reason !== "cached") {
        console.log(
          `  ✓ [${i + 1}/${candidates.length}] ${p.brand} ${p.name} ${r.reason || `(${r.bytes}b)`}`
        );
      }
    } else {
      delete p.image;
      delete p.imageSource;
      delete p.imageTitle;
      delete p.imageLicense;
      failCount++;
      reasons[r.reason] = (reasons[r.reason] || 0) + 1;
      console.log(
        `  ✗ [${i + 1}/${candidates.length}] ${p.brand} ${p.name} -> ${r.reason}`
      );
    }
    // guardado incremental cada 25
    if ((i + 1) % 25 === 0) {
      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }
    await sleep(120);
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  console.log(
    `\nTotal: ${okCount} OK, ${failCount} fail (${((okCount * 100) / candidates.length).toFixed(0)}%)`
  );
  console.log("Fallos por razon:", reasons);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
