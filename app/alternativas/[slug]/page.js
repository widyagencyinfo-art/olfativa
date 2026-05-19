import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import BuyBox from "@/components/BuyBox";
import {
  getAllPerfumes,
  getPerfumeBySlug,
  getAlternatives,
  getCheaperAlternatives,
  formatPrice,
  genderLabel,
  SITE_URL,
} from "@/lib/data";

export function generateStaticParams() {
  return getAllPerfumes().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const perfume = getPerfumeBySlug(slug);
  if (!perfume) return {};
  const title = `Perfumes parecidos a ${perfume.name}: alternativas y clones`;
  const description = `Los mejores perfumes parecidos a ${perfume.name} de ${perfume.brand}: alternativas con notas similares, opciones más baratas y dónde comprarlas.`;
  return {
    title,
    description,
    alternates: { canonical: `/alternativas/${perfume.slug}` },
    openGraph: { title: `${title} | Olfativa`, description },
  };
}

export default async function AlternativasPage({ params }) {
  const { slug } = await params;
  const perfume = getPerfumeBySlug(slug);
  if (!perfume) notFound();

  const alternatives = getAlternatives(perfume);
  const cheaper = getCheaperAlternatives(perfume, alternatives);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Qué perfume se parece a ${perfume.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: alternatives.length
            ? `Entre los perfumes más parecidos a ${perfume.name} están ${alternatives
                .slice(0, 4)
                .map((p) => `${p.name} de ${p.brand}`)
                .join(", ")}, por compartir familia olfativa y notas.`
            : `${perfume.name} tiene un perfil ${perfume.family.toLowerCase()} muy característico.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Hay alguna alternativa más barata a ${perfume.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: cheaper.length
            ? `Sí. Alternativas más económicas a ${perfume.name} son ${cheaper
                .slice(0, 3)
                .map((p) => `${p.name} (${formatPrice(p)})`)
                .join(", ")}.`
            : `${perfume.name} ya se encuentra en una franja de precio contenida dentro de su categoría.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/perfumes", label: "Perfumes" },
          {
            href: `/perfumes/${perfume.slug}`,
            label: perfume.name,
          },
          {
            href: `/alternativas/${perfume.slug}`,
            label: "Alternativas",
          },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Perfumes parecidos a {perfume.name}</h1>
          <p>
            {perfume.name} de {perfume.brand} es un perfume{" "}
            {perfume.family.toLowerCase()} de {genderLabel(perfume.gender).toLowerCase()}.
            Estas son las mejores alternativas con un perfil olfativo similar,
            incluidas opciones más económicas.
          </p>
        </div>

        {cheaper.length > 0 && (
          <div className="block">
            <h2>Alternativas más baratas a {perfume.name}</h2>
            <p style={{ color: "var(--text-soft)", marginBottom: "18px" }}>
              Si te gusta {perfume.name} pero buscas gastar menos, estos
              perfumes ofrecen un aire parecido a un precio más bajo.
            </p>
            <PerfumeGrid perfumes={cheaper} />
          </div>
        )}

        <div className="block">
          <h2>Todos los perfumes parecidos a {perfume.name}</h2>
          <PerfumeGrid perfumes={alternatives} />
        </div>

        <div className="block">
          <BuyBox perfume={perfume} />
        </div>

        <div className="block">
          <div className="chip-row">
            <Link href={`/perfumes/${perfume.slug}`} className="chip">
              Ver ficha de {perfume.name}
            </Link>
            <Link href={`/marcas/${perfume.brandSlug}`} className="chip">
              Más perfumes de {perfume.brand}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
