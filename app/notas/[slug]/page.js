import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import { getNotes, getNoteBySlug } from "@/lib/data";

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  const title = `Perfumes con ${note.name}`;
  const description = `${note.count} perfumes con nota de ${note.name.toLowerCase()}. Descubre fragancias con ${note.name.toLowerCase()} y conoce su perfil olfativo, precio e historia.`;
  return {
    title,
    description,
    alternates: { canonical: `/notas/${note.slug}` },
    openGraph: { title: `${title} | Olfativa`, description },
  };
}

export default async function NotaPage({ params }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/notas", label: "Notas" },
          { href: `/notas/${note.slug}`, label: note.name },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Perfumes con {note.name.toLowerCase()}</h1>
          <p>
            {note.count} {note.count === 1 ? "perfume contiene" : "perfumes contienen"}{" "}
            la nota de {note.name.toLowerCase()} en su pirámide olfativa.
          </p>
        </div>
        <div style={{ marginTop: "24px" }}>
          <PerfumeGrid perfumes={note.perfumes} />
        </div>
      </div>
    </>
  );
}
