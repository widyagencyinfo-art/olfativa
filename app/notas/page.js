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
          <h1>Notas olfativas</h1>
          <p>
            {notes.length} notas presentes en el catálogo. Pulsa cualquier nota
            para ver todos los perfumes que la contienen.
          </p>
        </div>
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
