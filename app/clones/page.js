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
          <h1>Clones de perfumes: las mejores alternativas baratas de 2026</h1>
          <p>
            Selección curada de {CLONES.length} clones de los perfumes más
            caros del mercado. Cada página compara un original con 4-6
            alternativas asequibles y te explica cuál elegir.
          </p>
        </div>
        <article className="prose" style={{ maxWidth: "820px", margin: "24px 0", lineHeight: "1.7" }}>
          <p>
            Los <strong>clones de perfumes</strong> son fragancias asequibles
            que imitan el perfil olfativo de perfumes mucho más caros (Creed
            Aventus, Baccarat Rouge 540, Tom Ford Tobacco Vanille, Dior
            Sauvage…) a una fracción del precio. No son falsificaciones: son
            creaciones legítimas, normalmente fabricadas por casas árabes o
            de nicho asequible (Lattafa, Armaf, Nishane, Mancera, Maison
            Alhambra), que se inspiran en el ADN aromático de un superventas
            sin infringir derechos.
          </p>
          <p>
            ¿Por qué existen tantos clones? Porque un perfume de nicho de
            300€ y un clon árabe de 30€ pueden usar materias primas de
            calidad similar. Lo que pagas en el original es la firma, el
            frasco, las campañas y el margen comercial. Para el aroma puro,
            la diferencia es mucho más sutil de lo que parece. Por eso el
            mercado de clones es uno de los segmentos de mayor crecimiento
            en perfumería desde 2020.
          </p>
          <p>
            En cada página de clones te explicamos cuáles son los mejores y
            por qué, junto con un <strong>veredicto editorial</strong>{" "}
            (qué clon comprar según presupuesto y prioridad), una tabla de
            comparación, FAQ específicas y enlaces de compra en Amazon,
            Notino y Druni para que pruebes la opción que más te interese.
          </p>
        </article>
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
