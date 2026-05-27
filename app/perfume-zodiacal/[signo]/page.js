import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import ShareButtons from "@/components/ShareButtons";
import { ZODIAC, getZodiacMatches, getAllZodiacSlugs } from "@/lib/zodiac";
import {
  SITE_URL,
  SITE_NAME,
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_CHANNEL_HANDLE,
} from "@/lib/data";

export function generateStaticParams() {
  return getAllZodiacSlugs().map((signo) => ({ signo }));
}

export async function generateMetadata({ params }) {
  const { signo } = await params;
  const data = getZodiacMatches(signo);
  if (!data) return {};
  const title = `Perfume para ${data.name} ${data.emoji}: 6 fragancias que conectan con tu signo`;
  const description = `Los 6 mejores perfumes para ${data.name} (${data.dates}): perfil olfativo, familias que conectan con tu energía y notas que te representan.`;
  return {
    title,
    description,
    alternates: { canonical: `/perfume-zodiacal/${signo}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/perfume-zodiacal/${signo}`,
      type: "article"
    }
  };
}

export default async function ZodiacSignPage({ params }) {
  const { signo } = await params;
  const data = getZodiacMatches(signo);
  if (!data) notFound();

  const pageUrl = `/perfume-zodiacal/${signo}`;
  const shareText = `${data.emoji} Descubre qué perfume eres como ${data.name} en Olfativa →`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Perfume para ${data.name}: 6 fragancias que conectan con tu signo`,
    description: `Los 6 mejores perfumes para ${data.name}: perfil olfativo, familias y notas que conectan con tu signo zodiacal.`,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    datePublished: "2026-05-26",
    dateModified: "2026-05-26",
    mainEntityOfPage: `${SITE_URL}${pageUrl}`
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Qué tipo de perfume es para ${data.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${data.name} (${data.element}, regido por ${data.planet}) conecta con perfumes ${data.families.join(", ").toLowerCase()}. Las notas que mejor representan su energía son: ${data.keyNotes.join(", ")}. ${data.style}`
        }
      },
      {
        "@type": "Question",
        name: `¿Por qué un perfume para ${data.name} debe llevar ${data.keyNotes[0]}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Las notas de ${data.keyNotes.slice(0, 3).join(", ")} conectan con la personalidad ${data.keywords.join(", ")} de ${data.name}. Los perfumes que las combinan refuerzan los rasgos naturales del signo.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="section">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Perfume zodiacal", href: "/perfume-zodiacal" },
              { label: data.name, href: pageUrl }
            ]}
          />

          <div className="zodiac-hero">
            <span className="emoji-big">{data.emoji}</span>
            <h1>Perfume para {data.name}</h1>
            <p className="dates">
              {data.dates} · {data.element} · regido por {data.planet}
            </p>
            <div className="zodiac-keyword-row">
              {data.keywords.map((k) => (
                <span key={k} className="zodiac-keyword">
                  {k}
                </span>
              ))}
            </div>
          </div>

          <ShareButtons url={pageUrl} text={shareText} />

          <div className="zodiac-quote">"{data.quote}"</div>

          <div className="section-head">
            <h2>Tu perfil olfativo como {data.name}</h2>
          </div>
          <p style={{ maxWidth: 820 }}>{data.personality}</p>
          <p style={{ maxWidth: 820 }}>
            <strong>Estilo olfativo:</strong> {data.style}
          </p>

          <div className="section-head" style={{ marginTop: 32 }}>
            <h2>Familias olfativas que conectan contigo</h2>
          </div>
          <div className="chip-row">
            {data.families.map((f) => (
              <span key={f} className="chip">
                {f}
              </span>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: 32 }}>
            <h2>Notas clave de {data.name}</h2>
          </div>
          <div className="chip-row">
            {data.keyNotes.map((n) => (
              <span key={n} className="chip">
                {n}
              </span>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: 40 }}>
            <h2>Los 6 perfumes ideales para {data.name}</h2>
          </div>
          <p style={{ marginBottom: 18, color: "var(--text-soft)" }}>
            Selección curada del catálogo Olfativa. Mezcla de asequibles,
            diseñador y nicho para que encuentres tu perfume sea cual sea tu
            presupuesto.
          </p>
          <PerfumeGrid perfumes={data.perfumes} />

          <ShareButtons url={pageUrl} text={shareText} />

          <div className="tg-inline">
            <span className="tg-emoji">📨</span>
            <div className="tg-content">
              <h3>1 perfume al día gratis en Telegram</h3>
              <p>
                Recibe cada mañana un perfume rotativo del catálogo + clones
                baratos por la tarde. Sin algoritmo, sin spam. Canal{" "}
                {TELEGRAM_CHANNEL_HANDLE}.
              </p>
            </div>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener"
              className="tg-btn"
            >
              Unirme
            </a>
          </div>

          <div
            className="callout"
            style={{ marginTop: 40, textAlign: "center", padding: "28px 24px" }}
          >
            <h2 style={{ margin: "0 0 10px", fontSize: "1.4rem" }}>
              ¿No es tu signo? Descubre los otros 11
            </h2>
            <p style={{ marginBottom: 18, color: "var(--text-soft)" }}>
              12 signos, 72 perfumes recomendados. Mira el perfume de tu pareja,
              tu mejor amiga o tu jefe.
            </p>
            <Link href="/perfume-zodiacal" className="btn">
              Ver los 12 signos →
            </Link>
          </div>

          <div className="section-head" style={{ marginTop: 40 }}>
            <h2>Otros signos del mismo elemento ({data.element})</h2>
          </div>
          <div className="zodiac-grid">
            {ZODIAC.filter(
              (s) => s.element === data.element && s.slug !== data.slug
            ).map((s) => (
              <Link
                key={s.slug}
                href={`/perfume-zodiacal/${s.slug}`}
                className="zodiac-tile"
              >
                <span className="emoji">{s.emoji}</span>
                <h3>{s.name}</h3>
                <p>{s.dates}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
