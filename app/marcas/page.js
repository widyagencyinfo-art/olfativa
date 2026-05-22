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
          <h1>Marcas de perfumes: todas las casas perfumeras del catálogo</h1>
          <p>
            {brands.length} casas perfumeras representadas en Olfativa, desde
            las grandes firmas de diseñador (Dior, Chanel, YSL, Paco Rabanne,
            Versace) hasta la perfumería de nicho y lujo más exclusiva (Creed,
            Parfums de Marly, MFK, Tom Ford Private Blend, Le Labo, Byredo,
            Amouage).
          </p>
        </div>
        <article className="prose" style={{ maxWidth: "820px", margin: "24px 0", lineHeight: "1.7" }}>
          <p>
            La perfumería moderna se organiza en torno a dos grandes mundos:
            las <strong>marcas de diseñador</strong>, ligadas a casas de
            moda y cosmética que producen perfumes a gran escala con
            campañas publicitarias masivas (Dior, Chanel, Hugo Boss, Versace,
            Paco Rabanne, Carolina Herrera), y la <strong>perfumería de
            nicho</strong>, formada por casas independientes que apuestan
            por composiciones de autor y materias primas de alta calidad
            (Creed, Parfums de Marly, Maison Francis Kurkdjian, Xerjoff,
            Amouage, Initio, Frédéric Malle, Le Labo, Byredo, Diptyque).
          </p>
          <p>
            En esta página tienes un acceso ordenado alfabéticamente a todas
            las marcas con perfumes en el catálogo. Cada nombre lleva al
            listado completo de su producción con notas olfativas, precio,
            historia y mejor temporada para usar cada fragancia.
          </p>
          <p>
            Si no sabes por dónde empezar, te recomendamos arrancar por las
            casas más vendidas (Dior, Chanel, YSL, Paco Rabanne) y luego ir
            descubriendo el universo de nicho a través de las{" "}
            <Link href="/guias/perfumes-nicho-vs-disenador">
              guías de perfumería
            </Link>{" "}
            o de las{" "}
            <Link href="/mejores">listas curadas de los mejores perfumes</Link>.
          </p>
        </article>
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
