import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import MarkdownText from "@/components/MarkdownText";
import { GUIDES, getGuide } from "@/lib/guides";
import { SITE_URL, SITE_NAME } from "@/lib/data";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guias/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | ${SITE_NAME}`,
      description: guide.description,
      type: "article",
      url: `${SITE_URL}/guias/${guide.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuiaPage({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = (guide.related || [])
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter(Boolean);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    inLanguage: "es-ES",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/guias/${guide.slug}`,
  };

  const faqLd = guide.faq && guide.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faq.map((q) => ({
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
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/guias", label: "Guías" },
          { href: `/guias/${guide.slug}`, label: guide.title },
        ]}
      />

      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Guía Olfativa</span>
            <h1>{guide.h1}</h1>
            <p className="guide-lead">
              <MarkdownText>{guide.intro}</MarkdownText>
            </p>
          </header>

          {guide.sections.length > 0 && (
            <nav className="guide-toc" aria-label="Contenido">
              <h2>En esta guía</h2>
              <ol>
                {guide.sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#s${i + 1}`}>{s.h2}</a>
                  </li>
                ))}
                {guide.faq && guide.faq.length > 0 && (
                  <li>
                    <a href="#faq">Preguntas frecuentes</a>
                  </li>
                )}
              </ol>
            </nav>
          )}

          {guide.sections.map((s, i) => (
            <section
              key={i}
              id={`s${i + 1}`}
              className="guide-section"
            >
              <h2>{s.h2}</h2>
              <MarkdownText>{s.body}</MarkdownText>
            </section>
          ))}

          {guide.faq && guide.faq.length > 0 && (
            <section id="faq" className="guide-section">
              <h2>Preguntas frecuentes</h2>
              <div className="faq-list">
                {guide.faq.map((q, i) => (
                  <details key={i} className="faq-item">
                    <summary>{q.q}</summary>
                    <div className="faq-answer">
                      <MarkdownText>{q.a}</MarkdownText>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="guide-section">
              <h2>Sigue leyendo</h2>
              <div className="tile-grid">
                {related.map((g) => (
                  <Link key={g.slug} href={`/guias/${g.slug}`} className="tile">
                    <h3>{g.title}</h3>
                    <p>{g.description.slice(0, 110)}…</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
