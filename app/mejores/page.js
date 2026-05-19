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
          <h1>Listas de perfumes recomendados</h1>
          <p>
            {LISTS.length} listas curadas para descubrir tu próximo perfume:
            por género, temporada, familia olfativa, ocasión, duración y
            precio.
          </p>
        </div>
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
