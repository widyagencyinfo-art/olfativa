// Anade 12 perfumes virales en TikTok / redes (2022-2026) al catalogo.
// Son los perfumes que generan miles de busquedas mensuales en Google ES.
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "data", "perfumes.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
const existing = new Set(data.map((p) => p.slug));

const VIRAL = [
  {
    slug: "sol-de-janeiro-cheirosa-62",
    name: "Cheirosa 62",
    concentration: "Eau de Parfum",
    brand: "Sol de Janeiro",
    brandSlug: "sol-de-janeiro",
    gender: "unisex",
    year: 2022,
    perfumer: "Yann Vasnier",
    family: "Gourmand tropical",
    notes: {
      top: ["Pistacho", "Almendra"],
      heart: ["Caramelo salado", "Jazmín"],
      base: ["Vainilla", "Sándalo"]
    },
    priceRange: { min: 38, max: 78, currency: "EUR" },
    pricePerMl: 0.78,
    seasons: ["primavera", "verano"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "cita"],
    projection: "Media",
    longevity: "6-8 horas",
    history: "Cheirosa 62 es el perfume del cuerpo Bum Bum Cream convertido en fragancia. Lanzado en 2022, Yann Vasnier capturó el famoso aroma brasileño a pistacho, caramelo y vainilla que se viralizó en TikTok en 2023-2024. Sol de Janeiro reportó ventas récord gracias a este lanzamiento.",
    similar: ["lattafa-yara", "kayali-vanilla-28", "ariana-grande-cloud"],
    rating: 4.4
  },
  {
    slug: "sol-de-janeiro-cheirosa-68",
    name: "Cheirosa 68 Beija Flor",
    concentration: "Eau de Parfum",
    brand: "Sol de Janeiro",
    brandSlug: "sol-de-janeiro",
    gender: "unisex",
    year: 2023,
    perfumer: "Honorine Blanc",
    family: "Floral frutal",
    notes: {
      top: ["Lichi", "Pera"],
      heart: ["Rosa", "Jazmín"],
      base: ["Vainilla", "Almizcle"]
    },
    priceRange: { min: 38, max: 78, currency: "EUR" },
    pricePerMl: 0.78,
    seasons: ["primavera", "verano"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "cita"],
    projection: "Media",
    longevity: "6-8 horas",
    history: "Beija Flor (colibrí en portugués) es la versión más floral y femenina de Sol de Janeiro, lanzada en 2023. Honorine Blanc combinó lichi y rosa sobre una base vainillada que recuerda a los gourmands brasileños. Otro viral de la marca tras Cheirosa 62.",
    similar: ["sol-de-janeiro-cheirosa-62", "ysl-mon-paris", "kayali-vanilla-28"],
    rating: 4.3
  },
  {
    slug: "glossier-you",
    name: "You",
    concentration: "Eau de Parfum",
    brand: "Glossier",
    brandSlug: "glossier",
    gender: "unisex",
    year: 2017,
    perfumer: "Frank Voelkl y Pascal Gaurin",
    family: "Almizcle floral",
    notes: {
      top: ["Pimienta rosa", "Iris"],
      heart: ["Ambrette", "Iris"],
      base: ["Almizcle blanco", "Ambretta"]
    },
    priceRange: { min: 60, max: 80, currency: "EUR" },
    pricePerMl: 1.6,
    seasons: ["primavera", "verano", "otono"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "oficina"],
    projection: "Suave",
    longevity: "6-8 horas",
    history: "Glossier You fue diseñado por Frank Voelkl y Pascal Gaurin para oler como vos misma, pero mejor. Es un skin scent puro de almizcle blanco, iris y pimienta rosa que cambia en cada piel. Viral en TikTok en 2021-2024 como ejemplo de skin scent perfecto y siempre agotado.",
    similar: ["maison-margiela-replica-jazz-club", "byredo-mojave-ghost", "le-labo-santal-33"],
    rating: 4.4
  },
  {
    slug: "phlur-missing-person",
    name: "Missing Person",
    concentration: "Eau de Parfum",
    brand: "Phlur",
    brandSlug: "phlur",
    gender: "unisex",
    year: 2022,
    perfumer: "Frank Voelkl",
    family: "Almizcle blanco",
    notes: {
      top: ["Bergamota", "Cardamomo"],
      heart: ["Jazmín sambac", "Almizcle"],
      base: ["Ámbar", "Almizcle blanco"]
    },
    priceRange: { min: 75, max: 110, currency: "EUR" },
    pricePerMl: 1.45,
    seasons: ["primavera", "otono", "invierno"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "cita"],
    projection: "Media",
    longevity: "7-9 horas",
    history: "Lanzado en 2022, Missing Person fue viral en TikTok como el perfume que huele a la persona que echas de menos. Frank Voelkl construyó un acorde de almizcle blanco íntimo, ámbar suave y jazmín que recuerda a piel limpia. Agotado durante meses en EEUU tras el boom social.",
    similar: ["glossier-you", "byredo-mojave-ghost", "le-labo-santal-33"],
    rating: 4.5
  },
  {
    slug: "kayali-vanilla-28",
    name: "Vanilla 28",
    concentration: "Eau de Parfum",
    brand: "Kayali",
    brandSlug: "kayali",
    gender: "unisex",
    year: 2018,
    perfumer: "Mona Kattan",
    family: "Gourmand vainilla",
    notes: {
      top: ["Bergamota", "Brandy"],
      heart: ["Vainilla orquidea", "Jazmín"],
      base: ["Vainilla Madagascar", "Ámbar"]
    },
    priceRange: { min: 85, max: 130, currency: "EUR" },
    pricePerMl: 1.7,
    seasons: ["otono", "invierno"],
    timeOfDay: ["noche"],
    occasions: ["cita", "fiesta"],
    projection: "Alta",
    longevity: "9-12 horas",
    history: "Kayali es la casa de Mona Kattan, hermana de Huda Beauty. Vanilla 28 fue uno de sus primeros lanzamientos (2018) y se viralizó masivamente en TikTok como la vainilla más sexy y duradera del mercado. Combina vainilla cremosa con brandy y ámbar nocturno.",
    similar: ["lattafa-yara", "ysl-black-opium", "tom-ford-tobacco-vanille"],
    rating: 4.5
  },
  {
    slug: "kayali-yum-pistachio-gelato-33",
    name: "Yum Pistachio Gelato 33",
    concentration: "Eau de Parfum",
    brand: "Kayali",
    brandSlug: "kayali",
    gender: "unisex",
    year: 2024,
    perfumer: "Mona Kattan",
    family: "Gourmand",
    notes: {
      top: ["Pistacho", "Cardamomo"],
      heart: ["Helado de leche", "Almendra"],
      base: ["Vainilla", "Caramelo"]
    },
    priceRange: { min: 85, max: 130, currency: "EUR" },
    pricePerMl: 1.7,
    seasons: ["primavera", "verano", "otono"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "cita"],
    projection: "Media-alta",
    longevity: "8-10 horas",
    history: "Lanzado en 2024 por Kayali, Yum Pistachio Gelato 33 se viralizó instantáneamente en TikTok como el gourmand más adictivo del año. Pistacho cremoso sobre helado de leche y caramelo, una experiencia totalmente comestible diseñada por Mona Kattan.",
    similar: ["sol-de-janeiro-cheirosa-62", "lattafa-yara", "kayali-vanilla-28"],
    rating: 4.6
  },
  {
    slug: "phlur-father-figure",
    name: "Father Figure",
    concentration: "Eau de Parfum",
    brand: "Phlur",
    brandSlug: "phlur",
    gender: "unisex",
    year: 2024,
    perfumer: "Daniela Andrier",
    family: "Amaderado especiado",
    notes: {
      top: ["Cardamomo", "Pimienta rosa"],
      heart: ["Cuero suave", "Vetiver"],
      base: ["Cedro", "Ámbar"]
    },
    priceRange: { min: 75, max: 110, currency: "EUR" },
    pricePerMl: 1.45,
    seasons: ["otono", "invierno"],
    timeOfDay: ["dia", "noche"],
    occasions: ["oficina", "cita"],
    projection: "Media-alta",
    longevity: "8-10 horas",
    history: "Father Figure de Phlur, lanzado en 2024, fue el siguiente viral tras Missing Person. Daniela Andrier diseñó un amaderado especiado con cardamomo y cuero que recuerda a un abrigo de invierno masculino-elegante. Otro skin scent agotado en TikTok.",
    similar: ["phlur-missing-person", "le-labo-santal-33", "maison-margiela-by-the-fireplace"],
    rating: 4.5
  },
  {
    slug: "dior-jadore-parfum-deau",
    name: "J'adore Parfum d'Eau",
    concentration: "Eau de Parfum",
    brand: "Dior",
    brandSlug: "dior",
    gender: "mujer",
    year: 2022,
    perfumer: "Francis Kurkdjian",
    family: "Floral verde",
    notes: {
      top: ["Magnolia", "Neroli"],
      heart: ["Madreselva", "Jazmín"],
      base: ["Almizcle blanco", "Sándalo"]
    },
    priceRange: { min: 90, max: 145, currency: "EUR" },
    pricePerMl: 1.45,
    seasons: ["primavera", "verano"],
    timeOfDay: ["dia"],
    occasions: ["diario", "oficina"],
    projection: "Media",
    longevity: "7-9 horas",
    history: "Francis Kurkdjian asumió la dirección creativa de Dior y debutó con J'adore Parfum d'Eau en 2022: la primera J'adore sin alcohol, basada en agua. Versión más fresca, verde y aireada del clásico, pensada para verano. Hito en perfumería de lujo sostenible.",
    similar: ["dior-jadore", "chloe-eau-de-parfum", "valentino-born-in-roma"],
    rating: 4.4
  },
  {
    slug: "snif-tribute",
    name: "Tribute",
    concentration: "Eau de Parfum",
    brand: "Snif",
    brandSlug: "snif",
    gender: "unisex",
    year: 2021,
    perfumer: "Frank Voelkl",
    family: "Amaderado especiado",
    notes: {
      top: ["Cardamomo", "Bergamota"],
      heart: ["Mate", "Iris"],
      base: ["Cuero", "Sándalo"]
    },
    priceRange: { min: 60, max: 95, currency: "EUR" },
    pricePerMl: 1.2,
    seasons: ["otono", "invierno"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "cita"],
    projection: "Media",
    longevity: "7-9 horas",
    history: "Snif es una marca neoyorquina viral en TikTok desde 2021. Tribute es su clon homenaje al Aventus de Creed: piña ahumada, cuero y abedul a 60-90€ en lugar de 350€. Su modelo de venta directa con muestras gratis lo convirtió en fenómeno.",
    similar: ["creed-aventus", "armaf-club-de-nuit-intense-man", "lattafa-asad"],
    rating: 4.3
  },
  {
    slug: "ariana-grande-cloud",
    name: "Cloud",
    concentration: "Eau de Parfum",
    brand: "Ariana Grande",
    brandSlug: "ariana-grande",
    gender: "mujer",
    year: 2018,
    perfumer: "Clement Gavarry",
    family: "Gourmand",
    notes: {
      top: ["Pera", "Bergamota"],
      heart: ["Crema de coco", "Praline"],
      base: ["Almizcle", "Madera ámbar"]
    },
    priceRange: { min: 35, max: 65, currency: "EUR" },
    pricePerMl: 0.65,
    seasons: ["primavera", "verano", "otono"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "cita"],
    projection: "Media-alta",
    longevity: "7-9 horas",
    history: "Cloud de Ariana Grande, lanzado en 2018, se mantuvo años en el top de ventas de perfumes celebrity. Clement Gavarry creó un gourmand-azul con coco, praline y nube de almizcle que enganchó a la generación Z. Sigue siendo viral en TikTok cada Navidad.",
    similar: ["sol-de-janeiro-cheirosa-62", "ysl-black-opium", "lattafa-yara"],
    rating: 4.3
  },
  {
    slug: "kayali-eden-juicy-apple-01",
    name: "Eden Juicy Apple 01",
    concentration: "Eau de Parfum",
    brand: "Kayali",
    brandSlug: "kayali",
    gender: "unisex",
    year: 2023,
    perfumer: "Mona Kattan",
    family: "Floral frutal",
    notes: {
      top: ["Manzana roja", "Bergamota"],
      heart: ["Jazmín", "Lirio"],
      base: ["Vainilla", "Ámbar"]
    },
    priceRange: { min: 85, max: 130, currency: "EUR" },
    pricePerMl: 1.7,
    seasons: ["primavera", "verano", "otono"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "cita"],
    projection: "Media-alta",
    longevity: "8-10 horas",
    history: "Eden Juicy Apple 01 fue el primer lanzamiento Kayali tras la viralización de Vanilla 28. Mona Kattan capturó el aroma de la manzana roja recién mordida sobre una base floral vainillada. Otro éxito instantáneo en TikTok en 2023-2024.",
    similar: ["kayali-vanilla-28", "chloe-eau-de-parfum", "sol-de-janeiro-cheirosa-68"],
    rating: 4.4
  },
  {
    slug: "lattafa-fakhar",
    name: "Fakhar Lattafa",
    concentration: "Eau de Parfum",
    brand: "Lattafa",
    brandSlug: "lattafa",
    gender: "hombre",
    year: 2021,
    perfumer: "Lattafa",
    family: "Amaderado especiado",
    notes: {
      top: ["Bergamota", "Manzana"],
      heart: ["Canela", "Cedro"],
      base: ["Ámbar", "Pachulí"]
    },
    priceRange: { min: 22, max: 45, currency: "EUR" },
    pricePerMl: 0.45,
    seasons: ["otono", "invierno"],
    timeOfDay: ["dia", "noche"],
    occasions: ["diario", "cita"],
    projection: "Alta",
    longevity: "9-12 horas",
    history: "Fakhar Lattafa, lanzado en 2021, se viralizó en TikTok como uno de los mejores clones del legendario Stronger With You Intensely de Armani: manzana caramelizada, canela y ámbar a una fracción del precio (25€ vs 110€). Hito de la perfumería árabe asequible.",
    similar: ["giorgio-armani-stronger-with-you-intensely", "lattafa-khamrah", "armaf-club-de-nuit-intense-man"],
    rating: 4.4
  }
];

let added = 0;
let skipped = 0;
VIRAL.forEach((p) => {
  if (existing.has(p.slug)) {
    console.log("  saltado (ya existe):", p.slug);
    skipped++;
  } else {
    data.push(p);
    added++;
  }
});

// Validar refs similar
const allSlugs = new Set(data.map((p) => p.slug));
const broken = [];
VIRAL.forEach((p) => {
  p.similar.forEach((s) => {
    if (!allSlugs.has(s)) broken.push(`${p.slug} -> similar missing: ${s}`);
  });
});

if (broken.length) {
  console.log("ROTAS:", broken.length);
  broken.forEach((b) => console.log(" ", b));
  process.exit(1);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log(`Anadidos: ${added}, saltados: ${skipped}, total: ${data.length}`);
