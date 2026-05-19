import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getComparisonPairs, getPerfumeBySlug } from "@/lib/data";

export const metadata = {
  title: "Comparativas de perfumes",
  description:
    "Comparativas de perfumes enfrentados: notas, precio, duración y proyección para decidir cuál comprar. Decenas de comparativas en Olfativa.",
  alternates: { canonical: "/comparativas" },
};

export default function ComparativasPage() {
  const pairs = getComparisonPairs();

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/comparativas", label: "Comparativas" },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Comparativas de perfumes</h1>
          <p>
            {pairs.length} comparativas para ayudarte a decidir. Enfrentamos
            perfumes parecidos y te decimos cuál comprar según precio,
            duración y perfil olfativo.
          </p>
        </div>
        <div className="tile-grid" style={{ marginTop: "24px" }}>
          {pairs.map((pair) => {
            const a = getPerfumeBySlug(pair.a);
            const b = getPerfumeBySlug(pair.b);
            return (
              <Link
                key={pair.slug}
                href={`/comparativas/${pair.slug}`}
                className="tile"
              >
                <h3>
                  {a.name} vs {b.name}
                </h3>
                <p>
                  {a.brand} · {b.brand}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
