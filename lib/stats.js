import { getAllPerfumes } from "@/lib/data";

// ---------------------------------------------------------------------------
// Estadísticas del catálogo, computadas EN VIVO desde data/perfumes.json.
// Nunca se hardcodean cifras: si el catálogo crece, el estudio se actualiza
// solo. Esto es lo que hace que la pieza sea un activo enlazable honesto.
// ---------------------------------------------------------------------------

function countBy(items, keyFn) {
  const map = new Map();
  for (const it of items) {
    const k = keyFn(it);
    if (k == null || k === "") continue;
    map.set(k, (map.get(k) || 0) + 1);
  }
  return map;
}

function topEntries(map, n) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

function median(nums) {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function mean(nums) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

let cached = null;

export function getDatasetStats() {
  if (cached) return cached;

  const perfumes = getAllPerfumes();
  const N = perfumes.length;
  const pct = (c) => Math.round((1000 * c) / N) / 10; // 1 decimal

  // --- Notas: frecuencia global (en cuántos perfumes aparece cada nota) ---
  const noteCount = new Map();
  for (const p of perfumes) {
    const n = p.notes || {};
    const all = new Set([
      ...(n.top || []),
      ...(n.heart || []),
      ...(n.base || []),
    ]);
    for (const note of all) noteCount.set(note, (noteCount.get(note) || 0) + 1);
  }
  const topNotes = topEntries(noteCount, 15).map(([name, count]) => ({
    name,
    count,
    pct: pct(count),
  }));

  // --- Familias olfativas ---
  const famMap = countBy(perfumes, (p) => p.family);
  const families = topEntries(famMap, 10).map(([name, count]) => ({
    name,
    count,
    pct: pct(count),
  }));

  // --- Género ---
  const genderMap = countBy(perfumes, (p) => p.gender);
  const genderLabels = { hombre: "Hombre", mujer: "Mujer", unisex: "Unisex" };
  const genders = ["hombre", "mujer", "unisex"]
    .map((k) => ({
      key: k,
      name: genderLabels[k] || k,
      count: genderMap.get(k) || 0,
      pct: pct(genderMap.get(k) || 0),
    }))
    .filter((g) => g.count > 0);

  // --- Concentración (top 5 + resto agrupado) ---
  const concMap = countBy(perfumes, (p) => p.concentration);
  const concTop = topEntries(concMap, 5);
  const concTopSum = concTop.reduce((a, [, c]) => a + c, 0);
  const concentrations = concTop.map(([name, count]) => ({
    name,
    count,
    pct: pct(count),
  }));
  if (N - concTopSum > 0) {
    concentrations.push({
      name: "Otras concentraciones",
      count: N - concTopSum,
      pct: pct(N - concTopSum),
    });
  }

  // --- Marcas ---
  const brandMap = countBy(perfumes, (p) => p.brand);
  const brandCount = brandMap.size;
  const topBrands = topEntries(brandMap, 10).map(([name, count]) => {
    const slug = (perfumes.find((p) => p.brand === name) || {}).brandSlug;
    return { name, slug, count };
  });

  // --- Décadas ---
  const years = perfumes.map((p) => p.year).filter(Boolean);
  const decMap = new Map();
  for (const y of years) {
    const d = Math.floor(y / 10) * 10;
    decMap.set(d, (decMap.get(d) || 0) + 1);
  }
  const decades = [...decMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([decade, count]) => ({
      decade,
      label: `${decade}s`,
      count,
      pct: pct(count),
    }));
  const maxDecade = Math.max(...decades.map((d) => d.count));

  // --- Precio ---
  const mids = [];
  const perMl = [];
  for (const p of perfumes) {
    const pr = p.priceRange || {};
    if (typeof pr.min === "number" && typeof pr.max === "number") {
      mids.push((pr.min + pr.max) / 2);
    }
    if (typeof p.pricePerMl === "number") perMl.push(p.pricePerMl);
  }

  // --- Temporadas y ocasiones (multivalor) ---
  const seasonMap = new Map();
  const occMap = new Map();
  for (const p of perfumes) {
    for (const s of p.seasons || []) seasonMap.set(s, (seasonMap.get(s) || 0) + 1);
    for (const o of p.occasions || []) occMap.set(o, (occMap.get(o) || 0) + 1);
  }
  const seasonLabels = {
    primavera: "Primavera",
    verano: "Verano",
    otono: "Otoño",
    invierno: "Invierno",
  };
  const seasons = ["primavera", "verano", "otono", "invierno"]
    .filter((k) => seasonMap.has(k))
    .map((k) => ({
      key: k,
      name: seasonLabels[k] || k,
      count: seasonMap.get(k),
      pct: pct(seasonMap.get(k)),
    }));
  const occLabels = {
    diario: "Diario",
    oficina: "Oficina",
    cita: "Cita",
    eventos: "Eventos",
    ocio: "Ocio",
    fiesta: "Fiesta",
  };
  const occasions = topEntries(occMap, 6).map(([k, count]) => ({
    key: k,
    name: occLabels[k] || k,
    count,
    pct: pct(count),
  }));

  // --- Perfumistas más presentes (descarta valores que no son personas) ---
  const perfumerMap = countBy(perfumes, (p) => p.perfumer);
  const topPerfumers = topEntries(perfumerMap, 6)
    .filter(([name]) => !/parfums|maison|laboratoire|in-house/i.test(name))
    .map(([name, count]) => ({ name, count }));

  cached = {
    total: N,
    brandCount,
    noteCountDistinct: noteCount.size,
    ratingAvg: Math.round(mean(perfumes.map((p) => p.rating).filter(Boolean)) * 100) / 100,
    yearMin: Math.min(...years),
    yearMax: Math.max(...years),
    topNotes,
    families,
    genders,
    concentrations,
    topBrands,
    decades,
    maxDecade,
    priceMeanMid: Math.round(mean(mids)),
    priceMedianMid: Math.round(median(mids)),
    pricePerMlMean: Math.round(mean(perMl) * 100) / 100,
    pricePerMlMedian: Math.round(median(perMl) * 100) / 100,
    seasons,
    occasions,
    topPerfumers,
  };
  return cached;
}
