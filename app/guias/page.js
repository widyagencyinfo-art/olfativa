import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { GUIDES } from "@/lib/guides";

export const metadata = {
  title: "Guías de perfumería",
  description:
    "Guías sobre perfumes: diferencias EDP vs EDT, familias olfativas, cómo aplicar perfume, cómo elegir tu fragancia, conservación, sillage, decants y más.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/guias", label: "Guías" },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Guías de perfumería: {GUIDES.length} artículos para entenderlo todo</h1>
          <p>
            {GUIDES.length} guías para entenderlo todo sobre el mundo de los
            perfumes: concentraciones, familias olfativas, aplicación,
            conservación, elección, ingredientes, perfumistas y mucho más.
          </p>
        </div>
        <article className="prose" style={{ maxWidth: "820px", margin: "24px 0", lineHeight: "1.7" }}>
          <p>
            La perfumería es uno de los oficios más antiguos y a la vez de
            los más opacos: a menudo se siente como un mundo con sus propias
            palabras y reglas. Estas guías están escritas para resolver eso.
            Cada artículo va directamente a una duda concreta (
            <Link href="/guias/diferencia-edp-edt-edc-parfum">
              "¿qué significa EDP, EDT o Parfum?"
            </Link>
            ,{" "}
            <Link href="/guias/como-aplicar-perfume-correctamente">
              "¿cómo se aplica un perfume para que dure todo el día?"
            </Link>
            ,{" "}
            <Link href="/guias/familias-olfativas">
              "¿qué son las familias olfativas?"
            </Link>
            ) y la resuelve con lenguaje claro y ejemplos concretos del
            catálogo.
          </p>
          <p>
            Si nunca has tenido perfume propio, empieza por{" "}
            <Link href="/guias/como-elegir-perfume">
              cómo elegir el perfume perfecto
            </Link>{" "}
            y{" "}
            <Link href="/guias/familias-olfativas">
              las 7 familias olfativas
            </Link>. Si ya tienes algo de criterio y quieres profundizar,
            te recomendamos{" "}
            <Link href="/guias/notas-olfativas-piramide">
              la pirámide olfativa
            </Link>{" "}
            y{" "}
            <Link href="/guias/perfumes-nicho-vs-disenador">
              nicho vs diseñador
            </Link>.
          </p>
          <p>
            Y si quieres terminología precisa, complementa estas guías con el{" "}
            <Link href="/glosario">glosario de perfumería</Link> donde
            encontrarás 60+ términos clave explicados en una línea. ¿Te van más
            los datos? Echa un vistazo a{" "}
            <Link href="/estudio/perfumeria-en-datos">
              la perfumería en datos
            </Link>
            : las notas más usadas, las familias dominantes y el precio medio
            del perfume, calculados sobre todo el catálogo.
          </p>
        </article>
        <div className="tile-grid" style={{ marginTop: "24px" }}>
          {GUIDES.map((g) => (
            <Link key={g.slug} href={`/guias/${g.slug}`} className="tile">
              <h3>{g.title}</h3>
              <p>{g.description.slice(0, 130)}…</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
