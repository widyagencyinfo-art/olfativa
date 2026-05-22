#!/usr/bin/env node
/**
 * Avisa a Bing, Yandex y otros buscadores compatibles con IndexNow de
 * que las URLs del sitio han cambiado. Sin rate limit, sin UI, gratis.
 *
 * Uso: node scripts/indexnow.js
 * Lee el sitemap.xml en vivo y envia todas las URLs encontradas.
 */

const KEY = "0d0993b1a22524ab851b319adf1efeb6";
const HOST = "olfativa.es";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function getUrlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  const xml = await res.text();
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  return matches.map((m) => m.replace(/<\/?loc>/g, ""));
}

async function submitBatch(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, statusText: res.statusText, body: text };
}

(async () => {
  const urls = await getUrlsFromSitemap();
  console.log(`Encontradas ${urls.length} URLs en el sitemap.`);

  // IndexNow admite hasta 10.000 URLs por peticion. Mandamos en lotes de 9000
  // para ir holgados.
  const chunkSize = 9000;
  let totalOk = 0;
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize);
    const r = await submitBatch(chunk);
    console.log(
      `Lote ${Math.floor(i / chunkSize) + 1}: ${chunk.length} URLs -> ${r.status} ${r.statusText}`
    );
    if (r.body) console.log("  Respuesta:", r.body.slice(0, 200));
    if (r.status === 200 || r.status === 202) totalOk += chunk.length;
  }
  console.log("---");
  console.log(`Enviadas con exito: ${totalOk}/${urls.length}`);
})().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
