import perfumesData from "@/data/perfumes.json";

export const SITE_NAME = "Olfativa";
export const SITE_URL = "https://olfativa-five.vercel.app";
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

export function getFamilies() {
  const map = new Map();
  for (const p of perfumes) {
    map.set(p.family, (map.get(p.family) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
