import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeExplorer from "@/components/PerfumeExplorer";
import { getAllPerfumes, getFamilies, getBrands } from "@/lib/data";

export const metadata = {
  title: "Buscador de perfumes",
  description:
    "Buscador avanzado de perfumes: filtra por género, familia olfativa, nota, marca, temporada y precio para encontrar tu fragancia ideal.",
  alternates: { canonical: "/buscar" },
};

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
      </div>
    </>
  );
}
