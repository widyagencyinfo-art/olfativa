import {
  SITE_URL,
  getAllPerfumes,
  getBrands,
  getNotes,
  getComparisonPairs,
} from "@/lib/data";
import { LISTS } from "@/lib/lists";
import { GUIDES } from "@/lib/guides";
import { CLONES } from "@/lib/clones";
import { ZODIAC } from "@/lib/zodiac";

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    "",
    "/perfumes",
    "/marcas",
    "/notas",
    "/buscar",
    "/comparativas",
    "/mejores",
    "/clones",
    "/guias",
    "/glosario",
    "/preguntas-frecuentes",
    "/test/familia-olfativa",
    "/perfume-zodiacal",
    "/sobre",
    "/aviso-legal",
    "/politica-privacidad",
    "/politica-cookies",
    "/divulgacion-afiliados",
    "/genero/hombre",
    "/genero/mujer",
    "/genero/unisex",
    "/temporada/primavera",
    "/temporada/verano",
    "/temporada/otono",
    "/temporada/invierno",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const perfumes = getAllPerfumes();

  const perfumePages = perfumes.map((p) => ({
    url: `${SITE_URL}/perfumes/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const alternativesPages = perfumes.map((p) => ({
    url: `${SITE_URL}/alternativas/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const comparisonPages = getComparisonPairs().map((pair) => ({
    url: `${SITE_URL}/comparativas/${pair.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const brandPages = getBrands().map((b) => ({
    url: `${SITE_URL}/marcas/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const notePages = getNotes().map((n) => ({
    url: `${SITE_URL}/notas/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const listPages = LISTS.map((l) => ({
    url: `${SITE_URL}/mejores/${l.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const guidePages = GUIDES.map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const clonePages = CLONES.map((c) => ({
    url: `${SITE_URL}/clones/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const zodiacPages = ZODIAC.map((s) => ({
    url: `${SITE_URL}/perfume-zodiacal/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [
    ...staticPages,
    ...perfumePages,
    ...alternativesPages,
    ...comparisonPages,
    ...brandPages,
    ...notePages,
    ...listPages,
    ...guidePages,
    ...clonePages,
    ...zodiacPages,
  ];
}
