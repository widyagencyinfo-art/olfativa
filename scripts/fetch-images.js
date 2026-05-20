#!/usr/bin/env node
/**
 * Busca una foto real para cada perfume en Wikipedia (ES → EN → FR).
 * Si encuentra una página relevante con imagen, la guarda en el campo
 * `image` y `imageSource` de cada perfume.
 *
 * Imágenes de Wikipedia/Wikimedia Commons → libres de derechos para uso
 * razonable con atribución. Olfativa muestra "Foto: Wikipedia" debajo.
 */

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "perfumes.json");
const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

const norm = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const HEADERS = {
  "User-Agent": "Olfativa/1.0 (https://olfativa-five.vercel.app)",
};

async function searchLang(lang, query) {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
    query
  )}&srlimit=3&utf8=1&origin=*`;
  try {
    const res = await fetch(url, { headers: HEADERS });
    const json = await res.json();
    return json.query?.search || [];
  } catch (e) {
    return [];
  }
}

async function getThumb(lang, title) {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail|name&pithumbsize=800&titles=${encodeURIComponent(
    title
  )}&utf8=1&origin=*`;
  try {
    const res = await fetch(url, { headers: HEADERS });
    const json = await res.json();
    const pages = json.query?.pages || {};
    const page = Object.values(pages)[0];
    return page?.thumbnail?.source || null;
  } catch (e) {
    return null;
  }
}

function titleMatches(title, perfume) {
  const t = norm(title);
  // Rechaza paginas de marca, empresa, isla, joyeria, etc. — solo queremos
  // articulos del perfume concreto.
  if (/corporation|company|empresa|entreprise|joyer[íi]a|group|island|isla|carr[ée]/i.test(title)) return false;
  if (/\(brand\)|\(marca\)|\(maison\)|\(empresa\)/i.test(title)) return false;
  const name = norm(perfume.name);
  // El titulo debe contener el nombre del perfume (significativo).
  if (name.length < 4) return false;
  if (t.includes(name)) return true;
  // Para nombres compuestos, acepta si al menos las primeras 2 palabras estan.
  const words = name.split(/\s+/).filter((w) => w.length > 3);
  if (words.length >= 2 && words.every((w) => t.includes(w))) return true;
  return false;
}

async function findImage(perfume) {
  const queries = [
    `${perfume.brand} ${perfume.name} perfume`,
    `${perfume.brand} ${perfume.name} fragancia`,
    `${perfume.brand} ${perfume.name}`,
  ];
  for (const lang of ["es", "en", "fr"]) {
    for (const q of queries) {
      const hits = await searchLang(lang, q);
      for (const hit of hits) {
        if (!titleMatches(hit.title, perfume)) continue;
        await sleep(120);
        const thumb = await getThumb(lang, hit.title);
        if (thumb) {
          return { url: thumb, source: `Wikipedia (${lang})`, title: hit.title };
        }
      }
      await sleep(80);
    }
  }
  return null;
}

(async () => {
  let hits = 0;
  let misses = 0;
  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    if (p.image && p.image.startsWith("http")) {
      console.log(`SKIP ${p.slug} (ya tiene imagen)`);
      hits++;
      continue;
    }
    const img = await findImage(p);
    if (img) {
      p.image = img.url;
      p.imageSource = img.source;
      p.imageTitle = img.title;
      console.log(`OK   ${p.slug}  ←  ${img.title} (${img.source})`);
      hits++;
    } else {
      console.log(`MISS ${p.slug}`);
      misses++;
    }
    // guardar progresivamente cada 10 perfumes
    if (i % 10 === 9) {
      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }
    await sleep(150);
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  console.log("---");
  console.log(`Hechos: ${hits}/${data.length}  Sin foto: ${misses}`);
})();
