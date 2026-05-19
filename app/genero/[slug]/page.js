import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import { getGenders, getPerfumesByGender, genderLabel } from "@/lib/data";

const VALID = ["hombre", "mujer", "unisex"];

const INTRO = {
  hombre:
    "Perfumes de hombre populares: desde frescos cítricos y acuáticos para el día hasta orientales especiados y amaderados para la noche.",
  mujer:
    "Perfumes de mujer populares: florales luminosos, gourmands dulces y chipres elegantes con sus notas, precio e historia.",
  unisex:
    "Perfumes unisex pensados para todo el mundo: amaderados, ambarinos y aromáticos sin género que funcionan en cualquier ocasión.",
};

export function generateStaticParams() {
  return VALID.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!VALID.includes(slug)) return {};
  const label = genderLabel(slug);
  const title = `Perfumes de ${label.toLowerCase()}`;
  return {
    title,
    description: INTRO[slug],
    alternates: { canonical: `/genero/${slug}` },
    openGraph: { title: `${title} | Olfativa`, description: INTRO[slug] },
  };
}

export default async function GeneroPage({ params }) {
  const { slug } = await params;
  if (!VALID.includes(slug)) notFound();

  const perfumes = getPerfumesByGender(slug);
  const label = genderLabel(slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: `/genero/${slug}`, label: `Perfumes de ${label.toLowerCase()}` },
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
