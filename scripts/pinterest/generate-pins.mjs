#!/usr/bin/env node
/**
 * Genera pines de Pinterest (1000x1500) a partir de las fotos de perfumes.
 * Cada pin: foto + paleta de su familia olfativa + nombre/marca/notas + CTA.
 * Salida: scripts/pinterest/out/*.png  +  scripts/pinterest/pins.csv
 *
 * Uso: node scripts/pinterest/generate-pins.mjs [N]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(__dirname, "out");
const SITE = "https://olfativa.es";
const N = parseInt(process.argv[2] || "24", 10);

const FAMILY_THEMES = {
  amaderado: { liquid: "#9a6b3f", dark: "#6f4a27", bg1: "#efe3d2", bg2: "#dcc7a8" },
  oriental: { liquid: "#b5582e", dark: "#8a3f1d", bg1: "#f3ddcb", bg2: "#e6bfa0" },
  ambar: { liquid: "#cf9b3e", dark: "#a7791f", bg1: "#f7ead0", bg2: "#ecd4a3" },
  floral: { liquid: "#d2799a", dark: "#a85273", bg1: "#f8e3ea", bg2: "#eec7d6" },
  chipre: { liquid: "#9c8a3e", dark: "#766528", bg1: "#ece7cf", bg2: "#d8cda6" },
  aromatico: { liquid: "#5b9e8e", dark: "#3d7567", bg1: "#dceee8", bg2: "#bbddd2" },
  acuatico: { liquid: "#5897c4", dark: "#3a6f96", bg1: "#dcecf8", bg2: "#b9d6ec" },
  citrico: { liquid: "#dab63c", dark: "#ad8d24", bg1: "#fbf3cf", bg2: "#f0e0a0" },
};
function theme(family) {
  const k = String(family || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(" ")[0];
  return FAMILY_THEMES[k] || FAMILY_THEMES.amaderado;
}
const genderLabel = (g) => ({ hombre: "Hombre", mujer: "Mujer", unisex: "Unisex" }[g] || g);

// Tablero por familia PRINCIPAL (consolida sub-familias para no tener 17
// tableros con 1 pin cada uno). Pinterest premia tableros llenos y temáticos.
const BOARD_BY_FAMILY = {
  amaderado: "Perfumes amaderados",
  oriental: "Perfumes orientales",
  ambar: "Perfumes ámbar y especiados",
  floral: "Perfumes florales",
  chipre: "Perfumes chipre",
  aromatico: "Perfumes aromáticos y frescos",
  acuatico: "Perfumes acuáticos y frescos",
  citrico: "Perfumes cítricos",
  gourmand: "Perfumes gourmand y dulces",
  almizcle: "Perfumes almizclados",
};
function boardFor(family) {
  const k = String(family || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(" ")[0];
  return BOARD_BY_FAMILY[k] || "Perfumes recomendados";
}

function pinHtml(p, imgAbsPath) {
  const t = theme(p.family);
  const topNotes = (p.notes?.top || []).slice(0, 3).join(" · ");
  // Embed en base64: Playwright bloquea file:// desde contenido about:blank.
  const b64 = fs.readFileSync(imgAbsPath).toString("base64");
  const fileUrl = `data:image/webp;base64,${b64}`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
.pin{width:1000px;height:1500px;position:relative;overflow:hidden;
  background:linear-gradient(150deg, ${t.bg1}, ${t.bg2});
  font-family:'Inter',sans-serif;display:flex;flex-direction:column}
.glow{position:absolute;top:-180px;left:50%;transform:translateX(-50%);
  width:900px;height:900px;border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,.7), rgba(255,255,255,0) 65%)}
.brandmark{position:relative;z-index:2;text-align:center;padding:46px 0 0;
  font-family:'Fraunces',serif;font-weight:700;letter-spacing:3px;
  font-size:30px;color:${t.dark};text-transform:uppercase}
.photo{position:relative;z-index:2;flex:1;display:flex;align-items:center;justify-content:center;padding:20px 60px 0}
.photo img{max-height:660px;max-width:760px;object-fit:contain;
  filter:drop-shadow(0 30px 50px rgba(60,40,20,.28))}
.info{position:relative;z-index:2;background:rgba(255,255,255,.92);
  margin:0 0 0;padding:48px 64px 56px;border-top:1px solid rgba(0,0,0,.05)}
.eyebrow{font-size:26px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${t.dark};margin-bottom:8px}
.name{font-family:'Fraunces',serif;font-weight:600;font-size:74px;line-height:1.02;color:#2a2620;margin-bottom:18px}
.meta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:22px}
.chip{font-size:25px;padding:9px 20px;border-radius:999px;background:${t.bg1};color:${t.dark};font-weight:600}
.notes{font-size:30px;color:#4a443c;line-height:1.4;margin-bottom:30px}
.notes b{color:${t.dark}}
.cta{display:flex;align-items:center;justify-content:space-between;gap:16px;
  background:${t.liquid};color:#fff;border-radius:18px;padding:26px 34px}
.cta-main{font-family:'Fraunces',serif;font-weight:600;font-size:34px}
.cta-url{font-size:26px;font-weight:600;opacity:.95}
</style></head>
<body>
<div class="pin">
  <div class="glow"></div>
  <div class="brandmark">Olfativa</div>
  <div class="photo"><img src="${fileUrl}" alt="${p.name}"></div>
  <div class="info">
    <div class="eyebrow">${p.brand}</div>
    <div class="name">${p.name}</div>
    <div class="meta">
      <span class="chip">${p.family}</span>
      <span class="chip">${genderLabel(p.gender)}</span>
      <span class="chip">★ ${Number(p.rating).toFixed(1)}</span>
    </div>
    ${topNotes ? `<div class="notes"><b>Notas de salida:</b> ${topNotes}</div>` : ""}
    <div class="cta">
      <span class="cta-main">Notas, precio y opiniones</span>
      <span class="cta-url">olfativa.es</span>
    </div>
  </div>
</div>
</body></html>`;
}

function csvEscape(s) {
  return `"${String(s).replace(/"/g, '""')}"`;
}

async function main() {
  const perfumes = JSON.parse(fs.readFileSync(path.join(ROOT, "data/perfumes.json"), "utf8"));
  // Solo con foto local existente
  const withPhoto = perfumes.filter((p) => {
    if (!p.image || !p.image.startsWith("/photos")) return false;
    return fs.existsSync(path.join(ROOT, "public", p.image));
  });
  // Top por rating, máx 2 por marca para variar
  const byBrand = {};
  const picked = [];
  for (const p of [...withPhoto].sort((a, b) => b.rating - a.rating)) {
    byBrand[p.brand] = (byBrand[p.brand] || 0) + 1;
    if (byBrand[p.brand] > 2) continue;
    picked.push(p);
    if (picked.length >= N) break;
  }

  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 1 });

  const rows = [["archivo", "titulo", "descripcion", "enlace", "tablero"]];
  let i = 0;
  for (const p of picked) {
    const imgAbs = path.join(ROOT, "public", p.image);
    await page.setContent(pinHtml(p, imgAbs), { waitUntil: "networkidle" });
    await page.waitForTimeout(350); // fuentes
    const file = `${String(++i).padStart(2, "0")}-${p.slug}.png`;
    await page.screenshot({ path: path.join(OUT, file), clip: { x: 0, y: 0, width: 1000, height: 1500 } });

    const topNotes = (p.notes?.top || []).slice(0, 3).join(", ");
    const title = `${p.name} de ${p.brand}: notas, precio y opiniones`;
    const desc = `${p.name} (${p.concentration}) de ${p.brand}, perfume ${String(p.family).toLowerCase()} de ${genderLabel(p.gender).toLowerCase()}.${topNotes ? ` Notas de salida: ${topNotes}.` : ""} Descubre su pirámide olfativa completa, duración, mejor época del año, precio y opiniones en Olfativa. #perfumes #fragancias #${String(p.family).toLowerCase().replace(/\s+/g, "")}`;
    const board = boardFor(p.family);
    rows.push([file, title, desc, `${SITE}/perfumes/${p.slug}`, board].map(csvEscape));
    process.stdout.write(`  ✓ ${file}\n`);
  }
  await browser.close();

  fs.writeFileSync(path.join(__dirname, "pins.csv"), rows.map((r) => r.join(",")).join("\n"));
  console.log(`\n${picked.length} pines generados en scripts/pinterest/out/`);
  console.log("CSV con títulos/descripciones SEO: scripts/pinterest/pins.csv");
}
main().catch((e) => { console.error("Error:", e.message); process.exit(1); });
