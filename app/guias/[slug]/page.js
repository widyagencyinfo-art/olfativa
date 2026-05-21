import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import MarkdownText from "@/components/MarkdownText";
import { GUIDES, getGuide, getAnswer } from "@/lib/guides";
import { SITE_URL, SITE_NAME } from "@/lib/data";

const UPDATED = "2026-05-21";
const UPDATED_LABEL = "21 de mayo de 2026";

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
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

// Detecta si la guía es una guía "cómo se hace" (HowTo) elegible para
// schema HowTo de Google. Solo aplica al subset de guías procedimentales.
function buildHowToLd(guide) {
  const howToSlugs = ["como-aplicar-perfume-correctamente", "como-conservar-perfumes"];
  if (!howToSlugs.includes(guide.slug)) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.h1,
    description: guide.description,
    totalTime: "PT5M",
    step: guide.sections.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.h2,
      text: s.body
        .replace(/\*\*/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .slice(0, 280),
    })),
  };
}

export default async function GuiaPage({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = (guide.related || [])
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter(Boolean);

  const answer = getAnswer(slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    inLanguage: "es-ES",
    datePublished: UPDATED,
    dateModified: UPDATED,
    author: {
      "@type": "Organization",
      name: `Editorial ${SITE_NAME}`,
      url: `${SITE_URL}/sobre`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/guias/${guide.slug}`,
    ...(answer && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".guide-answer-box"],
      },
    }),
  };

  const faqLd =
    guide.faq && guide.faq.length
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

  const howToLd = buildHowToLd(guide);

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
      {howToLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
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
            <p className="guide-meta">
              Publicado por <Link href="/sobre">Editorial Olfativa</Link> ·{" "}
              <time dateTime={UPDATED}>Actualizado el {UPDATED_LABEL}</time>
            </p>
            <p className="guide-lead">
              <MarkdownText>{guide.intro}</MarkdownText>
            </p>
          </header>

          {answer && (
            <aside className="guide-answer-box" aria-label="Respuesta rápida">
              <strong className="guide-answer-label">Respuesta rápida</strong>
              <p>{answer}</p>
            </aside>
          )}

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
