import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import { getAllPerfumes } from "@/lib/data";

export const metadata = {
  title: "Todos los perfumes",
  description:
    "Catálogo completo de perfumes con notas, perfil olfativo, precio, marca e historia. Explora todas las fragancias de Olfativa.",
  alternates: { canonical: "/perfumes" },
};

export default function PerfumesPage() {
  const perfumes = getAllPerfumes();
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/perfumes", label: "Perfumes" },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Todos los perfumes</h1>
          <p>
            Catálogo completo con {perfumes.length} fragancias. Cada ficha
            incluye notas, perfil olfativo, precio, historia y la mejor época
            del año para usarla.
          </p>
        </div>
        <div style={{ marginTop: "24px" }}>
          <PerfumeGrid perfumes={perfumes} />
        </div>
      </div>
    </>
  );
}
