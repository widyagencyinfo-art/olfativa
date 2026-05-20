import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CLONES } from "@/lib/clones";
import { getPerfumeBySlug } from "@/lib/data";

export const metadata = {
  title: "Clones de perfumes: las mejores alternativas baratas",
  description:
    "Las mejores alternativas baratas a los perfumes más caros: Creed Aventus, Baccarat Rouge 540, Tom Ford Tobacco Vanille, Le Labo Santal 33 y más.",
  alternates: { canonical: "/clones" },
};

export default function ClonesIndexPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/clones", label: "Clones" },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Clones y alternativas baratas de perfumes</h1>
          <p>
            Selección curada de los mejores clones del mercado. Cada página
            compara un perfume caro con 4-6 alternativas asequibles y te
            explica cuál elegir.
          </p>
        </div>
        <div className="tile-grid" style={{ marginTop: "24px" }}>
          {CLONES.map((c) => {
            const original = getPerfumeBySlug(c.originalSlug);
            return (
              <Link key={c.slug} href={`/clones/${c.slug}`} className="tile">
                <h3>{c.h1.replace(/:.*$/, "")}</h3>
                <p>
                  {original
                    ? `Original: ${original.brand} ${original.name} (${original.priceRange.max}€)`
                    : c.description.slice(0, 110)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
