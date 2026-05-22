import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import { getAllPerfumes } from "@/lib/data";

export const metadata = {
  title: "Catálogo completo de perfumes",
  description:
    "Catálogo completo de perfumes con notas, perfil olfativo, precio, marca e historia. Más de 280 fragancias de gran consumo, nicho y lujo.",
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
          <h1>Catálogo completo de perfumes ({perfumes.length})</h1>
          <p>
            Catálogo completo con {perfumes.length} fragancias. Cada ficha
            incluye notas, perfil olfativo, precio, historia y la mejor época
            del año para usarla.
          </p>
        </div>
        <article className="prose" style={{ maxWidth: "820px", margin: "20px 0", lineHeight: "1.7" }}>
          <p>
            Este es el catálogo completo de perfumes de Olfativa: desde los
            grandes superventas comerciales (Dior Sauvage, Chanel N°5, Le
            Male) hasta las joyas del nicho de lujo (Creed Aventus, Baccarat
            Rouge 540, Tom Ford Tobacco Vanille). Todas las fichas tienen el
            mismo nivel de detalle: pirámide olfativa, perfumista, año,
            precio orientativo, ocasión y temporada ideales.
          </p>
          <p>
            Si te abruma la cantidad, prueba el{" "}
            <Link href="/buscar">buscador con filtros</Link> para acotar por
            género, familia, marca o precio. O directamente las{" "}
            <Link href="/mejores">listas curadas</Link> con los mejores de
            cada categoría.
          </p>
        </article>
        <div style={{ marginTop: "24px" }}>
          <PerfumeGrid perfumes={perfumes} />
        </div>
      </div>
    </>
  );
}
