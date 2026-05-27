#!/usr/bin/env node
/**
 * Actualiza perfumes.json para que cada perfume con imagen procesada
 * por rembg (sin fondo, en public/photos/perfumes-clean/[slug].png)
 * apunte a esa version transparente.
 *
 * Los perfumes que no tengan version clean mantienen su image actual
 * (que aun apunta a public/photos/perfumes/[slug].jpg).
 */

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "perfumes.json");
const CLEAN_DIR = path.join(
  __dirname,
  "..",
  "public",
  "photos",
  "perfumes-clean"
);

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const cleanFiles = new Set(
  fs.readdirSync(CLEAN_DIR).filter((f) => f.endsWith(".png"))
);

let updated = 0;
let kept = 0;
data.forEach((p) => {
  if (cleanFiles.has(`${p.slug}.png`)) {
    p.image = `/photos/perfumes-clean/${p.slug}.png`;
    p.imageProcessed = true;
    updated++;
  } else {
    kept++;
  }
});

fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
console.log(`Actualizados: ${updated}, no procesados: ${kept}`);
