import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import BuyBox from "@/components/BuyBox";
import PerfumeImage from "@/components/PerfumeImage";
import {
  getComparisonPairs,
  getComparison,
  genderLabel,
  seasonLabel,
  formatPrice,
  SITE_URL,
} from "@/lib/data";

export function generateStaticParams() {
  return getComparisonPairs().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cmp = getComparison(slug);
  if (!cmp) return {};
  const { a, b } = cmp;
  const title = `${a.name} vs ${b.name}: comparativa y cuál elegir`;
  const description = `Comparativa de ${a.name} (${a.brand}) y ${b.name} (${b.brand}): notas, perfil olfativo, precio, duración y proyección. Te decimos cuál comprar.`;
  return {
    title,
    description,
    alternates: { canonical: `/comparativas/${slug}` },
    openGraph: { title: `${title} | Olfativa`, description },
  };
}

function priceMidpoint(p) {
  return (p.priceRange.min + p.priceRange.max) / 2;
}

export default async function ComparativaPage({ params }) {
  const { slug } = await params;
  const cmp = getComparison(slug);
  if (!cmp) notFound();
  const { a, b } = cmp;

  const cheaper = priceMidpoint(a) <= priceMidpoint(b) ? a : b;
  const pricier = cheaper === a ? b : a;
  const sharedSeasons = a.seasons.filter((s) => b.seasons.includes(s));
  const sameGender = a.gender === b.gender;
  const sameFamily = a.family === b.family;
  const topRated = a.rating >= b.rating ? a : b;

  const allNotes = (p) => [...p.notes.top, ...p.notes.heart, ...p.notes.base];
  const sharedNotes = allNotes(a).filter((n) => allNotes(b).includes(n));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Qué es mejor, ${a.name} o ${b.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Depende de lo que busques: ${topRated.name} tiene mejor valoración media (${topRated.rating}/5), mientras que ${cheaper.name} es la opción más económica. Ambos son ${sameFamily ? `de la familia ${a.family.toLowerCase()}` : "de familias olfativas distintas"}.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Cuál dura más, ${a.name} o ${b.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${a.name} tiene una duración de ${a.longevity} y ${b.name} de ${b.longevity}.`,
        },
      },
    ],
  };

  const rows = [
    { label: "Marca", a: a.brand, b: b.brand },
    { label: "Género", a: genderLabel(a.gender), b: genderLabel(b.gender) },
    { label: "Familia olfativa", a: a.family, b: b.family },
    { label: "Concentración", a: a.concentration, b: b.concentration },
    { label: "Año", a: a.year, b: b.year },
    { label: "Precio", a: formatPrice(a), b: formatPrice(b) },
    { label: "Proyección", a: a.projection, b: b.projection },
    { label: "Duración", a: a.longevity, b: b.longevity },
    { label: "Valoración", a: `★ ${a.rating}`, b: `★ ${b.rating}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/comparativas", label: "Comparativas" },
          { href: `/comparativas/${slug}`, label: `${a.name} vs ${b.name}` },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>
            {a.name} vs {b.name}
          </h1>
          <p>
            Comparamos {a.name} de {a.brand} y {b.name} de {b.brand} a fondo:
            notas, perfil olfativo, precio, duración y proyección para que
            sepas cuál te conviene.
          </p>
        </div>

        <div className="vs-grid">
          {[a, b].map((p) => (
            <div key={p.slug} className="vs-col">
              <Link href={`/perfumes/${p.slug}`}>
                <PerfumeImage perfume={p} variant="card" />
              </Link>
              <div className="vs-col-head">
                <span className="card-brand">{p.brand}</span>
                <h3>
                  <Link href={`/perfumes/${p.slug}`}>{p.name}</Link>
                </h3>
              </div>
              <dl className="vs-col-body">
                {rows.map((row) => (
                  <div key={row.label} className="vs-row">
                    <dt>{row.label}</dt>
                    <dd>{p === a ? row.a : row.b}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="block">
          <h2>Diferencias clave</h2>
          <div className="prose">
            <p>
              {sameFamily
                ? `Ambos perfumes pertenecen a la familia ${a.family.toLowerCase()}, así que comparten un aire de familia. `
                : `${a.name} es un perfume ${a.family.toLowerCase()} y ${b.name} es ${b.family.toLowerCase()}, por lo que su carácter es bastante distinto. `}
              {sameGender
                ? `Los dos son perfumes de ${genderLabel(a.gender).toLowerCase()}. `
                : `${a.name} se orienta a público ${genderLabel(a.gender).toLowerCase()} y ${b.name} a público ${genderLabel(b.gender).toLowerCase()}. `}
              En cuanto al precio, {cheaper.name} es la opción más asequible
              ({formatPrice(cheaper)}) frente a {pricier.name} (
              {formatPrice(pricier)}).{" "}
              {sharedSeasons.length > 0
                ? `Ambos funcionan bien en ${sharedSeasons
                    .map((s) => seasonLabel(s).toLowerCase())
                    .join(" y ")}.`
                : "Están pensados para temporadas diferentes."}
            </p>
            {sharedNotes.length > 0 && (
              <p>
                Comparten notas como {sharedNotes.slice(0, 5).join(", ")}, lo
                que explica por qué se confunden o se recomiendan como
                alternativas el uno del otro.
              </p>
            )}
          </div>
        </div>

        <div className="block">
          <h2>¿Cuál elegir?</h2>
          <div className="prose">
            <p>
              Si tu prioridad es <strong>gastar menos</strong>, {cheaper.name}{" "}
              es la elección lógica. Si buscas la fragancia{" "}
              <strong>mejor valorada</strong> por los usuarios, decántate por{" "}
              {topRated.name} ({topRated.rating}/5). {a.name} destaca por su
              duración de {a.longevity} y proyección {a.projection.toLowerCase()},
              mientras que {b.name} ofrece {b.longevity} de duración y
              proyección {b.projection.toLowerCase()}. Lo ideal es probar ambos
              en piel antes de decidir.
            </p>
          </div>
        </div>

        <div className="block">
          <BuyBox perfume={a} />
        </div>
        <div className="block">
          <BuyBox perfume={b} />
        </div>

        <div className="block">
          <h2>Fichas completas</h2>
          <div className="chip-row">
            <Link href={`/perfumes/${a.slug}`} className="chip">
              Ver ficha de {a.name}
            </Link>
            <Link href={`/perfumes/${b.slug}`} className="chip">
              Ver ficha de {b.name}
            </Link>
            <Link href={`/alternativas/${a.slug}`} className="chip">
              Alternativas a {a.name}
            </Link>
            <Link href={`/alternativas/${b.slug}`} className="chip">
              Alternativas a {b.name}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
