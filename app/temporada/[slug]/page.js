import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import { getPerfumesBySeason, seasonLabel } from "@/lib/data";

const VALID = ["primavera", "verano", "otono", "invierno"];

const INTRO = {
  primavera:
    "Perfumes de primavera: florales frescos, verdes y cítricos luminosos ideales para los días templados.",
  verano:
    "Perfumes de verano: frescos, acuáticos y cítricos ligeros, perfectos para el calor y los días soleados.",
  otono:
    "Perfumes de otoño: amaderados, especiados y ligeramente dulces para la temporada de transición.",
  invierno:
    "Perfumes de invierno: orientales cálidos, gourmands envolventes y ambarinos potentes para el frío.",
};

export function generateStaticParams() {
  return VALID.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!VALID.includes(slug)) return {};
  const label = seasonLabel(slug);
  const title = `Perfumes de ${label.toLowerCase()}`;
  return {
    title,
    description: INTRO[slug],
    alternates: { canonical: `/temporada/${slug}` },
    openGraph: { title: `${title} | Olfativa`, description: INTRO[slug] },
  };
}

export default async function TemporadaPage({ params }) {
  const { slug } = await params;
  if (!VALID.includes(slug)) notFound();

  const perfumes = getPerfumesBySeason(slug);
  const label = seasonLabel(slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          {
            href: `/temporada/${slug}`,
            label: `Perfumes de ${label.toLowerCase()}`,
          },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Perfumes de {label.toLowerCase()}</h1>
          <p>{INTRO[slug]}</p>
        </div>
        <div style={{ marginTop: "24px" }}>
          <PerfumeGrid perfumes={perfumes} />
        </div>
      </div>
    </>
  );
}
