import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getNotes } from "@/lib/data";

export const metadata = {
  title: "Notas olfativas",
  description:
    "Explora los perfumes por sus notas olfativas: vainilla, bergamota, oud, jazmín, cuero y muchas más. Encuentra fragancias por nota en Olfativa.",
  alternates: { canonical: "/notas" },
};

export default function NotasPage() {
  const notes = getNotes();
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/notas", label: "Notas" },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Notas olfativas: las moléculas que componen un perfume</h1>
          <p>
            {notes.length} notas distintas presentes en el catálogo de
            Olfativa. Cada perfume es una mezcla de notas que evolucionan en
            tres tiempos: salida, corazón y fondo.
          </p>
        </div>
        <article className="prose" style={{ maxWidth: "820px", margin: "24px 0", lineHeight: "1.7" }}>
          <p>
            Las <strong>notas olfativas</strong> son las moléculas
            individuales o naturales que un perfumista combina para crear
            una fragancia. Una nota puede ser un cítrico (bergamota, limón),
            una flor (rosa, jazmín, tuberosa), una madera (sándalo, cedro,
            oud), una especia (cardamomo, pimienta rosa), una resina
            (incienso, ámbar) o una molécula sintética moderna (ambroxan,
            iso e super).
          </p>
          <p>
            En la <Link href="/guias/notas-olfativas-piramide">pirámide
            olfativa</Link> clásica, las notas se organizan en tres niveles
            según cuándo se huelen: las <strong>notas de salida</strong>{" "}
            son las más volátiles y se perciben los primeros 15-30 minutos
            (cítricos, hierbas); las <strong>notas de corazón</strong>{" "}
            aparecen entre los 30 minutos y las 4 horas (florales,
            especias); las <strong>notas de fondo</strong> son las más
            pesadas y duran hasta 12 horas en piel (maderas, ámbar,
            vainilla, almizcle).
          </p>
          <p>
            Pulsa cualquier nota de la lista de abajo para ver todos los
            perfumes que la contienen. Es una forma muy útil de descubrir
            fragancias nuevas a partir de una nota que ya te gusta. Si
            quieres profundizar en qué huele cada una, visita el{" "}
            <Link href="/glosario">glosario de perfumería</Link>.
          </p>
        </article>
        <div className="chip-row" style={{ marginTop: "24px" }}>
          {notes.map((n) => (
            <Link key={n.slug} href={`/notas/${n.slug}`} className="chip">
              {n.name} ({n.count})
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
