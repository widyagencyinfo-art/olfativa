#!/usr/bin/env node
/**
 * Avisa a Bing, Yandex y otros buscadores compatibles con IndexNow de
 * que las URLs del sitio han cambiado. Sin rate limit, sin UI, gratis.
 *
 * Uso: node scripts/indexnow.js
 * Envia el listado completo de URLs del sitio extraido del sitemap.
 */
const fs = require("fs");
const path = require("path");

const KEY = "0d0993b1a22524ab851b319adf1efeb6";
const HOST = "olfativa.es";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Cargar todas las URLs del catalogo + paginas estaticas para enviarlas
const data = require(path.join(__dirname, "..", "data", "perfumes.json"));
const guides = require(path.join(__dirname, "..", "lib", "guides.js")).GUIDES;
const clones = require(path.join(__dirname, "..", "lib", "clones.js")).CLONES;
const lists = require(path.join(__dirname, "..", "lib", "lists.js")).LISTS;

const urls = [
  `https://${HOST}/`,
  `https://${HOST}/perfumes`,
  `https://${HOST}/marcas`,
  `https://${HOST}/notas`,
  `https://${HOST}/mejores`,
  `https://${HOST}/clones`,
  `https://${HOST}/guias`,
  `https://${HOST}/buscar`,
  `https://${HOST}/sobre`,
  `https://${HOST}/genero/hombre`,
  `https://${HOST}/genero/mujer`,
  `https://${HOST}/genero/unisex`,
  `https://${HOST}/temporada/primavera`,
  `https://${HOST}/temporada/verano`,
  `https://${HOST}/temporada/otono`,
  `https://${HOST}/temporada/invierno`,
  ...data.map((p) => `https://${HOST}/perfumes/${p.slug}`),
  ...data.map((p) => `https://${HOST}/alternativas/${p.slug}`),
  ...clones.map((c) => `https://${HOST}/clones/${c.slug}`),
  ...guides.map((g) => `https://${HOST}/guias/${g.slug}`),
  ...lists.map((l) => `https://${HOST}/mejores/${l.slug}`),
];

// IndexNow recomienda lotes de hasta 10.000 URLs. Mandamos todo en uno.
async function submit() {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  console.log(`Enviando ${urls.length} URLs a IndexNow...`);
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log("Status:", res.status, res.statusText);
  const text = await res.text();
  if (text) console.log("Respuesta:", text);
}

submit().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
