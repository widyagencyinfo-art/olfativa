#!/usr/bin/env node
/**
 * Genera una foto de IA para cada perfume usando Pollinations.ai
 * (modelo FLUX, gratuito y sin API key). Guarda las imagenes en
 * /public/perfumes/{slug}.jpg y actualiza el campo `image` del JSON.
 *
 * Conserva las imagenes que ya provienen de Wikipedia (URLs http://).
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_PATH = path.join(__dirname, "..", "data", "perfumes.json");
const IMG_DIR = path.join(__dirname, "..", "public", "perfumes");
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

function seedFor(slug) {
  return parseInt(
    crypto.createHash("md5").update(slug).digest("hex").slice(0, 8),
    16
  );
}

function pollinationsUrl(perfume) {
  const prompt = `professional product photography of a perfume bottle of ${perfume.name} by ${perfume.brand}, ${perfume.concentration}, ${perfume.family} fragrance, isolated on pure white background, studio lighting, no people, no text overlay, commercial product shot, sharp focus, centered, elegant glass bottle`;
  // modelo "default" de Pollinations — gratuito y publico
  const params = new URLSearchParams({
    width: "600",
    height: "800",
    nologo: "true",
    seed: String(seedFor(perfume.slug)),
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?${params.toString()}`;
}

async function downloadOne(perfume, attempt = 1) {
  const dest = path.join(IMG_DIR, `${perfume.slug}.jpg`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
    return { skipped: true, size: fs.statSync(dest).size };
  }
  const url = pollinationsUrl(perfume);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Olfativa/1.0" },
    });
    if (!res.ok) {
      // 402 = quota: esperar mas tiempo y reintentar
      if (res.status === 402 && attempt < 5) {
        const wait = 30000 * attempt;
        console.log(`   quota, esperando ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
        return downloadOne(perfume, attempt + 1);
      }
      throw new Error(`HTTP ${res.status}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) throw new Error("image too small");
    fs.writeFileSync(dest, buf);
    return { saved: true, size: buf.length };
  } catch (e) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 5000 * attempt));
      return downloadOne(perfume, attempt + 1);
    }
    return { error: e.message };
  }
}

async function runSerial(items, fn, delayMs) {
  for (const item of items) {
    await fn(item);
    if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
  }
}

(async () => {
  const toGen = data.filter(
    (p) => !(p.image && p.image.startsWith("http"))
  );
  console.log(`Generando ${toGen.length} imagenes IA via Pollinations...`);
  let done = 0;
  let ok = 0;
  let fail = 0;
  // serie con 8s entre peticiones para no saltar la cuota gratuita
  await runSerial(
    toGen,
    async (perfume) => {
      const r = await downloadOne(perfume);
      done++;
      if (r.saved || r.skipped) {
        perfume.image = `/perfumes/${perfume.slug}.jpg`;
        delete perfume.imageSource;
        delete perfume.imageTitle;
        ok++;
        console.log(
          `[${done}/${toGen.length}] ${r.skipped ? "SKIP" : "OK  "} ${perfume.slug} (${r.size}b)`
        );
      } else {
        fail++;
        console.log(`[${done}/${toGen.length}] FAIL ${perfume.slug}: ${r.error}`);
      }
      if (done % 10 === 0) {
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
      }
    },
    8000
  );
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  console.log("---");
  console.log(`Hechos: ${ok}/${toGen.length}  Fallos: ${fail}`);
})();
