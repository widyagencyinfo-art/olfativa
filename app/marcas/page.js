import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getBrands } from "@/lib/data";

export const metadata = {
  title: "Marcas de perfumes",
  description:
    "Descubre todas las marcas y casas perfumeras: Dior, Chanel, Tom Ford, Creed y muchas más. Explora sus perfumes en Olfativa.",
  alternates: { canonical: "/marcas" },
};

export default function MarcasPage() {
  const brands = getBrands();
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/marcas", label: "Marcas" },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Marcas de perfumes</h1>
          <p>
            {brands.length} casas perfumeras representadas en Olfativa, desde
            grandes firmas de diseñador hasta perfumería de nicho.
          </p>
        </div>
        <div className="tile-grid" style={{ marginTop: "24px" }}>
          {brands.map((b) => (
            <Link key={b.slug} href={`/marcas/${b.slug}`} className="tile">
              <h3>{b.name}</h3>
              <p>
                {b.count} {b.count === 1 ? "perfume" : "perfumes"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
