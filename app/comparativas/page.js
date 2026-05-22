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
          <h1>Comparativas de perfumes: cuál comprar entre dos parecidos</h1>
          <p>
            {pairs.length} comparativas directas para ayudarte a decidir.
            Enfrentamos perfumes parecidos y te decimos cuál comprar según
            precio, duración, proyección y perfil olfativo.
          </p>
        </div>
        <article className="prose" style={{ maxWidth: "820px", margin: "24px 0", lineHeight: "1.7" }}>
          <p>
            Una de las preguntas más frecuentes en perfumería es{" "}
            <strong>"¿Sauvage o Bleu de Chanel?"</strong>,{" "}
            <strong>"¿Aventus o Layton?"</strong>,{" "}
            <strong>"¿Le Male o 1 Million?"</strong>. Cuando dos perfumes
            cubren un perfil parecido, elegir entre ellos depende de matices
            que no son obvios al leer las notas: la proyección, la duración
            real en piel, la familia exacta, el precio por mililitro y el
            carácter (más comercial vs más adulto, más fresco vs más cálido).
          </p>
          <p>
            En cada comparativa enfrentamos dos perfumes lado a lado con una
            tabla de especificaciones, una explicación de las{" "}
            <strong>diferencias clave</strong> y un veredicto editorial
            ("para quién es mejor cada uno"). Cada comparativa se genera
            automáticamente a partir de los pares de perfumes que comparten
            ADN olfativo en el catálogo.
          </p>
          <p>
            Si lo que buscas son alternativas más baratas a un perfume caro
            (en vez de comparar dos similares), te recomendamos las{" "}
            <Link href="/clones">páginas de clones</Link>. Y si quieres
            descubrir perfumes nuevos en función del perfil de uno que ya
            te gusta, prueba la sección de alternativas de cada ficha.
          </p>
        </article>
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
