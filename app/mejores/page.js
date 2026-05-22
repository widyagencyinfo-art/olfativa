import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LISTS } from "@/lib/lists";

export const metadata = {
  title: "Listas de los mejores perfumes",
  description:
    "Las mejores listas de perfumes: por género, temporada, familia olfativa, ocasión, duración y precio. Encuentra tu próxima fragancia.",
  alternates: { canonical: "/mejores" },
};

export default function MejoresIndexPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/mejores", label: "Listas" },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Mejores perfumes 2026: {LISTS.length} listas curadas</h1>
          <p>
            {LISTS.length} listas curadas de los mejores perfumes del mercado,
            organizadas por género, temporada, familia, ocasión, edad,
            momento del año y presupuesto.
          </p>
        </div>
        <article className="prose" style={{ maxWidth: "820px", margin: "24px 0", lineHeight: "1.7" }}>
          <p>
            Elegir un perfume sin orientación es como pedir una recomendación
            de vino sin saber si te gusta tinto o blanco. Estas listas están
            pensadas para que llegues directamente a la zona que te interesa
            y compares las mejores opciones en cada categoría.
          </p>
          <p>
            <strong>Por género</strong>: encontrarás los más vendidos para{" "}
            <Link href="/mejores/mejores-perfumes-de-hombre">hombre</Link>,{" "}
            <Link href="/mejores/mejores-perfumes-de-mujer">mujer</Link> y{" "}
            <Link href="/mejores/mejores-perfumes-unisex">unisex</Link>.{" "}
            <strong>Por temporada</strong>: lo mejor de{" "}
            <Link href="/mejores/mejores-perfumes-para-verano">verano</Link>{" "}
            y de{" "}
            <Link href="/mejores/mejores-perfumes-para-invierno">invierno</Link>.{" "}
            <strong>Por ocasión</strong>:{" "}
            <Link href="/mejores/mejores-perfumes-para-la-oficina">oficina</Link>,{" "}
            <Link href="/mejores/mejores-perfumes-para-citas">cita</Link>,{" "}
            <Link href="/mejores/mejores-perfumes-para-bodas">boda</Link>,{" "}
            <Link href="/mejores/mejores-perfumes-entrevista-trabajo">
              entrevista de trabajo
            </Link>.{" "}
            <strong>Por edad</strong>: para{" "}
            <Link href="/mejores/mejores-perfumes-hombre-joven">
              hombre joven
            </Link>,{" "}
            <Link href="/mejores/mejores-perfumes-mujer-madura">
              mujer madura
            </Link>{" "}
            o{" "}
            <Link href="/mejores/mejores-perfumes-adolescentes">
              adolescentes
            </Link>.
          </p>
          <p>
            <strong>Por presupuesto</strong>: desde los{" "}
            <Link href="/mejores/mejores-perfumes-menos-30-euros">
              mejores perfumes baratos por menos de 30€
            </Link>{" "}
            hasta los{" "}
            <Link href="/mejores/mejores-perfumes-de-nicho">
              grandes nicho de lujo
            </Link>. Cada lista incluye precio orientativo, notas, perfil
            olfativo y enlace de compra. Olfativa actualiza estas selecciones
            periódicamente con los lanzamientos más relevantes del año.
          </p>
        </article>
        <div className="tile-grid" style={{ marginTop: "24px" }}>
          {LISTS.map((l) => (
            <Link key={l.slug} href={`/mejores/${l.slug}`} className="tile">
              <h3>{l.title}</h3>
              <p>{l.description.slice(0, 90)}…</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
