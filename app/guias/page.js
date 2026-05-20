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
          <h1>Guías de perfumería</h1>
          <p>
            {GUIDES.length} guías para entenderlo todo sobre los perfumes:
            concentraciones, familias olfativas, aplicación, conservación,
            elección y mucho más.
          </p>
        </div>
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
