import perfumesData from "@/data/perfumes.json";

export const SITE_NAME = "Olfativa";
export const SITE_URL = "https://olfativa.es";
export const SITE_DESCRIPTION =
  "Olfativa es la enciclopedia de perfumes: busca cualquier fragancia y descubre sus notas, perfil olfativo, precio, marca, historia y la mejor época del año para usarla.";

const GENDER_LABELS = {
  hombre: "Hombre",
  mujer: "Mujer",
  unisex: "Unisex",
};

const SEASON_LABELS = {
  primavera: "Primavera",
  verano: "Verano",
  otono: "Otoño",
  invierno: "Invierno",
};

const OCCASION_LABELS = {
  diario: "Uso diario",
  oficina: "Oficina",
  cita: "Cita",
  eventos: "Eventos",
  ocio: "Ocio",
};

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const perfumes = perfumesData
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name, "es"));

export function getAllPerfumes() {
  return perfumes;
}

export function getPerfumeBySlug(slug) {
  return perfumes.find((p) => p.slug === slug) || null;
}

export function getSimilarPerfumes(perfume) {
  if (!perfume.similar) return [];
  return perfume.similar
    .map((slug) => getPerfumeBySlug(slug))
    .filter(Boolean);
}

export function genderLabel(value) {
  return GENDER_LABELS[value] || value;
}

export function seasonLabel(value) {
  return SEASON_LABELS[value] || value;
}

export function occasionLabel(value) {
  return OCCASION_LABELS[value] || value;
}

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

export function familyTheme(family) {
  const first = String(family || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(" ")[0];
  return FAMILY_THEMES[first] || FAMILY_THEMES.amaderado;
}

export function concentrationShort(concentration) {
  const map = {
    "Eau de Parfum": "EDP",
    "Eau de Toilette": "EDT",
    "Eau de Parfum Intense": "EDP Intense",
    Parfum: "Parfum",
    Cologne: "Cologne",
  };
  return map[concentration] || concentration;
}

// Genera una "respuesta rapida" auto-generada para cada perfume.
// 40-60 palabras factuales, optimizadas para AI Overview de Google,
// ChatGPT, Perplexity y featured snippets. Se incrusta en un bloque
// marcado como Speakable schema.
export function perfumeAnswer(perfume) {
  const topNotes = perfume.notes.top.slice(0, 3).join(", ").toLowerCase();
  const baseNotes = perfume.notes.base.slice(0, 2).join(" y ").toLowerCase();
  const seasonsTxt = perfume.seasons
    .map((s) => seasonLabel(s).toLowerCase())
    .join(", ");
  const timeTxt = perfume.timeOfDay
    .map((t) => (t === "dia" ? "día" : "noche"))
    .join(" y ");
  return `${perfume.name} de ${perfume.brand} es un ${perfume.concentration} ${perfume.family.toLowerCase()} para ${genderLabel(perfume.gender).toLowerCase()} lanzado en ${perfume.year} por ${perfume.perfumer}. Combina ${topNotes} con un fondo de ${baseNotes}. Dura ${perfume.longevity} con proyección ${perfume.projection.toLowerCase()}. Ideal para ${seasonsTxt}, de ${timeTxt}. Precio orientativo: ${formatPrice(perfume)}.`;
}

// FAQ auto-generado por perfume basado en los datos. Incluye las
// preguntas que la gente busca en Google sobre cualquier perfume.
// Se renderiza en HTML y como FAQPage schema -> "People Also Ask".
export function perfumeFaq(perfume) {
  const seasonsList = perfume.seasons
    .map((s) => seasonLabel(s).toLowerCase())
    .join(", ");
  const occList = perfume.occasions.map((o) => occasionLabel(o).toLowerCase()).join(", ");
  const timeOfDay = perfume.timeOfDay
    .map((t) => (t === "dia" ? "el día" : "la noche"))
    .join(" y ");
  const topNotes = perfume.notes.top.slice(0, 4).join(", ").toLowerCase();
  const heartNotes = perfume.notes.heart.slice(0, 3).join(", ").toLowerCase();
  const baseNotes = perfume.notes.base.slice(0, 3).join(", ").toLowerCase();

  return [
    {
      q: `¿${perfume.name} es para hombre o para mujer?`,
      a: `${perfume.name} de ${perfume.brand} es un perfume de ${genderLabel(
        perfume.gender
      ).toLowerCase()}, lanzado en ${perfume.year} y firmado por el perfumista ${perfume.perfumer}.`,
    },
    {
      q: `¿Cuánto dura ${perfume.name} en la piel?`,
      a: `${perfume.name} tiene una duración aproximada de ${perfume.longevity} con proyección ${perfume.projection.toLowerCase()}. La duración real depende del tipo de piel, la hidratación y la temperatura ambiente.`,
    },
    {
      q: `¿Cómo huele ${perfume.name}?`,
      a: `${perfume.name} es un perfume ${perfume.family.toLowerCase()}. Abre con notas de ${topNotes}. Su corazón está dominado por ${heartNotes}, y la base la forman ${baseNotes}.`,
    },
    {
      q: `¿En qué época del año se usa ${perfume.name}?`,
      a: `${perfume.name} es ideal para ${seasonsList}, principalmente de ${timeOfDay}. Encaja especialmente bien para ${occList}.`,
    },
    {
      q: `¿Cuánto cuesta ${perfume.name}?`,
      a: `${perfume.name} (${perfume.concentration}) tiene un precio orientativo de ${formatPrice(perfume)}, lo que equivale a unos ${perfume.pricePerMl.toFixed(2)}€ por mililitro. El precio real varía según el tamaño del frasco y la tienda.`,
    },
    {
      q: `¿Qué perfumes son parecidos a ${perfume.name}?`,
      a: `Los perfumes más parecidos a ${perfume.name} son los que comparten su familia ${perfume.family.toLowerCase()}. Ver alternativas completas en la página de alternativas a ${perfume.name}.`,
    },
  ];
}

// Descripcion expandida "Como huele" (3-4 frases, narrativa).
export function perfumeScentDescription(perfume) {
  const t = perfume.notes.top.slice(0, 4).join(", ").toLowerCase();
  const h = perfume.notes.heart.slice(0, 4).join(", ").toLowerCase();
  const b = perfume.notes.base.slice(0, 4).join(", ").toLowerCase();
  return `Los primeros minutos de ${perfume.name} están dominados por las notas de salida: ${t}. Cuando estas se evaporan, emerge el corazón del perfume con ${h}, que es la fase más reconocible y dura varias horas en piel. Por último, conforme avanza el día aparece la base más profunda y persistente: ${b}. Esta evolución es lo que define el carácter ${perfume.family.toLowerCase()} del perfume.`;
}

// "Quien deberia usar [perfume]" (1-2 frases con perfil de comprador).
export function perfumeAudience(perfume) {
  const gender = genderLabel(perfume.gender).toLowerCase();
  const isUnisex = perfume.gender === "unisex";
  const family = perfume.family.toLowerCase();
  const seasons = perfume.seasons.map((s) => seasonLabel(s).toLowerCase()).join(", ");
  const occasions = perfume.occasions
    .map((o) => occasionLabel(o).toLowerCase())
    .join(", ");
  const priceTier =
    perfume.priceRange.min < 50
      ? "presupuesto ajustado"
      : perfume.priceRange.min < 120
      ? "presupuesto medio"
      : perfume.priceRange.min < 200
      ? "gama alta de diseñador"
      : "lujo y nicho";

  const audiencePrefix = isUnisex
    ? "Pensado para cualquier persona"
    : `Pensado para ${gender}`;

  return `${audiencePrefix} que busque un perfume ${family} para ${occasions}, especialmente en ${seasons}. Encaja en un ${priceTier} dentro del catálogo de ${perfume.brand}. Si te gustan los perfumes ${family}, ${perfume.name} es una elección a considerar muy seriamente.`;
}

export function googleImagesUrl(perfume) {
  const query = `${perfume.brand} ${perfume.name} ${perfume.concentration} perfume`;
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}

export function formatPrice(perfume) {
  const { min, max, currency } = perfume.priceRange;
  const symbol = currency === "EUR" ? "€" : currency;
  return `${min}${symbol} - ${max}${symbol}`;
}

export function getBrands() {
  const map = new Map();
  for (const p of perfumes) {
    if (!map.has(p.brandSlug)) {
      map.set(p.brandSlug, { slug: p.brandSlug, name: p.brand, count: 0 });
    }
    map.get(p.brandSlug).count += 1;
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export function getBrandBySlug(slug) {
  const brand = getBrands().find((b) => b.slug === slug);
  if (!brand) return null;
  return {
    ...brand,
    perfumes: perfumes.filter((p) => p.brandSlug === slug),
  };
}

export function getNotes() {
  const map = new Map();
  for (const p of perfumes) {
    const all = [...p.notes.top, ...p.notes.heart, ...p.notes.base];
    for (const note of all) {
      const slug = slugify(note);
      if (!map.has(slug)) {
        map.set(slug, { slug, name: note, count: 0 });
      }
      map.get(slug).count += 1;
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function getNoteBySlug(slug) {
  const note = getNotes().find((n) => n.slug === slug);
  if (!note) return null;
  return {
    ...note,
    perfumes: perfumes.filter((p) => {
      const all = [...p.notes.top, ...p.notes.heart, ...p.notes.base];
      return all.some((n) => slugify(n) === slug);
    }),
  };
}

export function getGenders() {
  const map = new Map();
  for (const p of perfumes) {
    map.set(p.gender, (map.get(p.gender) || 0) + 1);
  }
  return [...map.entries()].map(([slug, count]) => ({
    slug,
    name: genderLabel(slug),
    count,
  }));
}

export function getPerfumesByGender(slug) {
  return perfumes.filter((p) => p.gender === slug);
}

export function getSeasons() {
  const order = ["primavera", "verano", "otono", "invierno"];
  return order.map((slug) => ({
    slug,
    name: seasonLabel(slug),
    count: perfumes.filter((p) => p.seasons.includes(slug)).length,
  }));
}

export function getPerfumesBySeason(slug) {
  return perfumes.filter((p) => p.seasons.includes(slug));
}

// ---------- Comparativas ----------
export function getComparisonPairs() {
  const seen = new Set();
  const pairs = [];
  for (const p of perfumes) {
    for (const otherSlug of p.similar || []) {
      const other = getPerfumeBySlug(otherSlug);
      if (!other) continue;
      const [a, b] = [p.slug, other.slug].sort();
      const key = `${a}-vs-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push({ slug: key, a, b });
    }
  }
  return pairs;
}

export function getComparison(slug) {
  const idx = slug.indexOf("-vs-");
  if (idx === -1) return null;
  const aSlug = slug.slice(0, idx);
  const bSlug = slug.slice(idx + 4);
  const a = getPerfumeBySlug(aSlug);
  const b = getPerfumeBySlug(bSlug);
  if (!a || !b) return null;
  return { a, b };
}

// ---------- Alternativas ----------
export function getAlternatives(perfume) {
  const out = [];
  const used = new Set([perfume.slug]);
  for (const slug of perfume.similar || []) {
    const p = getPerfumeBySlug(slug);
    if (p && !used.has(p.slug)) {
      out.push(p);
      used.add(p.slug);
    }
  }
  for (const p of perfumes) {
    if (used.has(p.slug)) continue;
    if (p.family === perfume.family && p.gender === perfume.gender) {
      out.push(p);
      used.add(p.slug);
    }
  }
  return out.sort((x, y) => y.rating - x.rating);
}

export function getCheaperAlternatives(perfume, list) {
  return list.filter((p) => p.priceRange.min < perfume.priceRange.min);
}

export function getFamilies() {
  const map = new Map();
  for (const p of perfumes) {
    map.set(p.family, (map.get(p.family) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
