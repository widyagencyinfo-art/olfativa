import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import MarkdownText from "@/components/MarkdownText";
import PerfumeGrid from "@/components/PerfumeGrid";
import BuyBox from "@/components/BuyBox";
import { CLONES, getClone } from "@/lib/clones";
import { getPerfumeBySlug, formatPrice, SITE_URL, SITE_NAME } from "@/lib/data";

export function generateStaticParams() {
  return CLONES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const clone = getClone(slug);
  if (!clone) return {};
  return {
    title: clone.title,
    description: clone.description,
    alternates: { canonical: `/clones/${clone.slug}` },
    openGraph: {
      title: `${clone.title} | ${SITE_NAME}`,
      description: clone.description,
      type: "article",
    },
  };
}

export default async function ClonePage({ params }) {
  const { slug } = await params;
  const clone = getClone(slug);
  if (!clone) notFound();

  const original = getPerfumeBySlug(clone.originalSlug);
  const alternatives = clone.alternatives
    .map((s) => getPerfumeBySlug(s))
    .filter(Boolean);

  const cheapest = [...alternatives].sort(
    (a, b) => a.priceRange.min - b.priceRange.min
  )[0];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: clone.title,
    description: clone.description,
    inLanguage: "es-ES",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/clones/${clone.slug}`,
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Alternativas a ${original?.name || clone.slug}`,
    itemListElement: alternatives.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.brand} ${p.name}`,
      url: `${SITE_URL}/perfumes/${p.slug}`,
    })),
  };

  const faqLd = clone.faq && clone.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: clone.faq.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/clones", label: "Clones" },
          { href: `/clones/${clone.slug}`, label: clone.h1 },
        ]}
      />

      <div className="container">
        <div className="page-head">
          <h1>{clone.h1}</h1>
          <p style={{ fontSize: "1.05rem" }}>
            <MarkdownText>{clone.intro}</MarkdownText>
          </p>
        </div>

        {original && (
          <div className="block">
            <h2>El original: {original.brand} {original.name}</h2>
            <p style={{ color: "var(--text-soft)", marginBottom: "12px" }}>
              Precio: <strong>{formatPrice(original)}</strong> ·{" "}
              {original.family} · {original.year}
            </p>
            <PerfumeGrid perfumes={[original]} />
          </div>
        )}

        <div className="block">
          <h2>Las {alternatives.length} mejores alternativas baratas</h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "20px" }}>
            {cheapest && (
              <>
                Desde solo <strong>{formatPrice(cheapest)}</strong> con{" "}
                {cheapest.brand} {cheapest.name}.
              </>
            )}
          </p>
          <PerfumeGrid perfumes={alternatives} />
        </div>

        {clone.verdict && (
          <div className="block">
            <h2>Veredicto: cuál clon elegir</h2>
            <div className="prose" style={{ fontSize: "1.02rem", lineHeight: "1.75" }}>
              <MarkdownText>{clone.verdict}</MarkdownText>
            </div>
          </div>
        )}

        {original && (
          <div className="block">
            <BuyBox perfume={original} />
          </div>
        )}

        {clone.faq && clone.faq.length > 0 && (
          <div className="block">
            <h2>Preguntas frecuentes</h2>
            <div className="faq-list">
              {clone.faq.map((q, i) => (
                <details key={i} className="faq-item">
                  <summary>{q.q}</summary>
                  <div className="faq-answer">
                    <MarkdownText>{q.a}</MarkdownText>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="block">
          <h2>Más páginas de clones</h2>
          <div className="chip-row">
            {CLONES.filter((c) => c.slug !== clone.slug)
              .slice(0, 10)
              .map((c) => (
                <Link key={c.slug} href={`/clones/${c.slug}`} className="chip">
                  Clones de {c.h1.replace(/^Clones de /i, "").replace(/:.*$/, "")}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
