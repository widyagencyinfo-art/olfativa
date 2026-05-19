import { perfumes } from "./data";

function longevityMax(p) {
  const m = String(p.longevity).match(/(\d+)\D*(\d+)?/);
  if (!m) return 0;
  return Number(m[2] || m[1]);
}

const byRating = (a, b) => b.rating - a.rating || a.name.localeCompare(b.name);

export const LISTS = [
  {
    slug: "mejores-perfumes-de-hombre",
    h1: "Mejores perfumes de hombre",
    title: "Mejores perfumes de hombre",
    description:
      "Los mejores perfumes de hombre del mercado: frescos para el día, intensos para la noche y clásicos imprescindibles. Notas, precio y dónde comprarlos.",
    intro:
      "Selección de los perfumes masculinos más populares y mejor valorados de Olfativa. Incluye desde clásicos contemporáneos como Dior Sauvage o Bleu de Chanel hasta favoritos de nicho.",
    filter: (p) => p.gender === "hombre",
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-de-mujer",
    h1: "Mejores perfumes de mujer",
    title: "Mejores perfumes de mujer",
    description:
      "Los mejores perfumes de mujer: florales luminosos, gourmands dulces y orientales sensuales. Con notas, precio e historia de cada uno.",
    intro:
      "Selección de los perfumes femeninos más vendidos y aclamados por la crítica. Desde los grandes clásicos como Chanel N°5 hasta los superventas modernos como Good Girl o La Vie Est Belle.",
    filter: (p) => p.gender === "mujer",
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-unisex",
    h1: "Mejores perfumes unisex",
    title: "Mejores perfumes unisex",
    description:
      "Los mejores perfumes unisex sin distinción de género: amaderados, ambarinos y aromáticos para todo el mundo. Notas, precio y consejos.",
    intro:
      "Perfumes unisex pensados para usar todo el año por cualquier persona. Una categoría en auge dominada por casas como Tom Ford, Le Labo, Byredo o Maison Francis Kurkdjian.",
    filter: (p) => p.gender === "unisex",
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-para-verano",
    h1: "Mejores perfumes para verano",
    title: "Mejores perfumes para verano",
    description:
      "Los mejores perfumes para el verano: frescos, acuáticos y cítricos que no empalagan con el calor. Selección de hombre, mujer y unisex.",
    intro:
      "En verano se buscan fragancias ligeras y luminosas que no resulten pesadas con el calor. Cítricos, acuáticos y aromáticos verdes son las apuestas más seguras.",
    filter: (p) => p.seasons.includes("verano"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-para-invierno",
    h1: "Mejores perfumes para invierno",
    title: "Mejores perfumes para invierno",
    description:
      "Los mejores perfumes para el invierno: orientales cálidos, gourmands envolventes y amaderados especiados. Selección con precios y notas.",
    intro:
      "En invierno funcionan especialmente bien los perfumes cálidos y densos. Vainillas, ámbar, tabaco, cuero, especias y maderas brillan con el frío.",
    filter: (p) => p.seasons.includes("invierno"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-baratos",
    h1: "Mejores perfumes baratos por menos de 60€",
    title: "Mejores perfumes baratos",
    description:
      "Los mejores perfumes baratos por menos de 60€ con calidad real: clásicos, clones famosos y descubrimientos asequibles para hombre y mujer.",
    intro:
      "Selección de perfumes asequibles que ofrecen una calidad muy por encima de su precio. Incluye clones famosos como Armaf Club de Nuit Intense Man y joyas árabes como Lattafa Khamrah.",
    filter: (p) => p.priceRange.min < 60,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-de-larga-duracion",
    h1: "Mejores perfumes de larga duración",
    title: "Mejores perfumes de larga duración",
    description:
      "Los perfumes que más duran en la piel: hasta 12-14 horas de proyección. Selección de los más resistentes con precios y notas.",
    intro:
      "La duración de un perfume depende de su concentración, sus materias primas y la piel. Estos son los perfumes con mayor estela y permanencia del catálogo.",
    filter: (p) => longevityMax(p) >= 10,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-amaderados",
    h1: "Mejores perfumes amaderados",
    title: "Mejores perfumes amaderados",
    description:
      "Los mejores perfumes amaderados: cedro, sándalo, vetiver y maderas exóticas. Selección con precios, notas y para qué temporada.",
    intro:
      "La familia amaderada es una de las más populares y versátiles. Va desde frescos amaderados aromáticos hasta amaderados especiados muy intensos.",
    filter: (p) => /amaderado/i.test(p.family),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-orientales",
    h1: "Mejores perfumes orientales",
    title: "Mejores perfumes orientales",
    description:
      "Los mejores perfumes orientales: vainilla, ámbar, especias y resinas. Selección de fragancias cálidas con notas y precio.",
    intro:
      "Los perfumes orientales son cálidos, especiados y envolventes. La familia ideal para las noches frías y para quien busca presencia y carácter.",
    filter: (p) => /oriental/i.test(p.family),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-florales",
    h1: "Mejores perfumes florales",
    title: "Mejores perfumes florales",
    description:
      "Los mejores perfumes florales: rosa, jazmín, peonía, tuberosa y muchos más. Selección con notas, precios e historia.",
    intro:
      "La familia floral es la más amplia y rica de la perfumería. Desde un ramo solar y luminoso hasta florales blancos opulentos y sensuales.",
    filter: (p) => /floral/i.test(p.family),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-para-la-oficina",
    h1: "Mejores perfumes para la oficina",
    title: "Mejores perfumes para la oficina",
    description:
      "Los mejores perfumes para la oficina: discretos, profesionales y de proyección moderada. Selección para hombre y mujer.",
    intro:
      "Para la oficina conviene una fragancia elegante de proyección contenida que no invada el espacio. Frescos cítricos, aromáticos limpios y florales suaves son las mejores apuestas.",
    filter: (p) => p.occasions.includes("oficina"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-para-citas",
    h1: "Mejores perfumes para citas",
    title: "Mejores perfumes para citas",
    description:
      "Los mejores perfumes para una cita: sensuales, magnéticos y memorables. Selección para él y para ella con notas y precios.",
    intro:
      "Para una cita romántica los perfumes ganadores suelen ser orientales, gourmands o amaderados con un toque dulce. Buscan sensualidad y proyección sin saturar.",
    filter: (p) => p.occasions.includes("cita"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-de-nicho",
    h1: "Mejores perfumes de nicho",
    title: "Mejores perfumes de nicho",
    description:
      "Los mejores perfumes de nicho: casas independientes con composiciones de autor y materias primas de calidad. Selección con precios.",
    intro:
      "La perfumería de nicho propone creaciones más artísticas y diferenciadas que las grandes marcas comerciales. Incluye casas como Creed, Parfums de Marly, Xerjoff, MFK, Kilian, Le Labo, Byredo o Initio.",
    filter: (p) => p.priceRange.min >= 150,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "perfumes-mas-vendidos",
    h1: "Los perfumes más vendidos",
    title: "Los perfumes más vendidos",
    description:
      "Los perfumes más vendidos y mejor valorados del catálogo. Hombre, mujer y unisex con notas, precios e historia.",
    intro:
      "Ranking general con los perfumes mejor valorados por los usuarios, sin filtros de género ni de familia. La mejor manera de descubrir grandes referencias en cualquier estilo.",
    filter: () => true,
    sort: byRating,
    limit: 20,
  },
];

export function getAllLists() {
  return LISTS.map(({ filter, sort, ...rest }) => rest);
}

export function getList(slug) {
  const def = LISTS.find((l) => l.slug === slug);
  if (!def) return null;
  let result = perfumes.filter(def.filter);
  if (def.sort) result = result.slice().sort(def.sort);
  if (def.limit) result = result.slice(0, def.limit);
  return { ...def, perfumes: result };
}
