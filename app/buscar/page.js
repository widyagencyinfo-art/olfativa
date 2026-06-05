import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeExplorer from "@/components/PerfumeExplorer";
import { getAllPerfumes, getFamilies, getBrands } from "@/lib/data";

export const metadata = {
  title: "Buscador de perfumes y fragancias por nota y familia",
  description:
    "Buscador de perfumes y fragancias: filtra por género, familia olfativa, nota, marca, temporada y precio para encontrar tu fragancia ideal entre cientos de perfumes.",
  alternates: { canonical: "/buscar" },
  openGraph: {
    title: "Buscador de perfumes | Olfativa",
    description:
      "Filtra entre cientos de perfumes por género, familia olfativa, nota, marca, temporada y precio.",
    type: "website",
    url: "/buscar",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buscador de perfumes | Olfativa",
    description:
      "Filtra entre cientos de perfumes por género, familia olfativa, nota, marca, temporada y precio.",
  },
};

// Atajos de búsqueda rastreables: convierten /buscar en un hub que enlaza a
// páginas indexables (género, temporada, listas) en lugar de ser solo un
// widget JS opaco para Google.
const SEARCH_SHORTCUTS = [
  { href: "/genero/hombre", label: "Perfumes de hombre" },
  { href: "/genero/mujer", label: "Perfumes de mujer" },
  { href: "/genero/unisex", label: "Perfumes unisex" },
  { href: "/temporada/verano", label: "Para verano" },
  { href: "/temporada/invierno", label: "Para invierno" },
  { href: "/mejores/mejores-perfumes-de-larga-duracion", label: "Larga duración" },
  { href: "/mejores/mejores-perfumes-baratos", label: "Baratos" },
  { href: "/mejores/mejores-perfumes-de-nicho", label: "De nicho" },
  { href: "/clones", label: "Clones y alternativas" },
  { href: "/notas", label: "Por nota olfativa" },
  { href: "/marcas", label: "Por marca" },
];

export default function BuscarPage() {
  const perfumes = getAllPerfumes();
  const families = getFamilies();
  const brands = getBrands();

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/buscar", label: "Buscar" },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Buscador de perfumes</h1>
          <p>
            Filtra entre {perfumes.length} perfumes por nombre, marca, nota,
            género, familia olfativa, temporada y precio.
          </p>
        </div>
        <PerfumeExplorer
          perfumes={perfumes}
          families={families}
          brands={brands}
        />
        <nav className="chip-row" aria-label="Búsquedas populares" style={{ marginTop: "28px" }}>
          {SEARCH_SHORTCUTS.map((s) => (
            <Link key={s.href} href={s.href} className="chip">
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
