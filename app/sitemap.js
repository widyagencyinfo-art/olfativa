import {
  SITE_URL,
  getAllPerfumes,
  getBrands,
  getNotes,
} from "@/lib/data";

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    "",
    "/perfumes",
    "/marcas",
    "/notas",
    "/buscar",
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

  const perfumePages = getAllPerfumes().map((p) => ({
    url: `${SITE_URL}/perfumes/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
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

  return [...staticPages, ...perfumePages, ...brandPages, ...notePages];
}
