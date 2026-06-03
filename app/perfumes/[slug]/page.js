import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import PerfumeImage from "@/components/PerfumeImage";
import BuyBox from "@/components/BuyBox";
import Comments from "@/components/Comments";
import { CLONES } from "@/lib/clones";
import {
  getAllPerfumes,
  getPerfumeBySlug,
  getSimilarPerfumes,
  genderLabel,
  seasonLabel,
  occasionLabel,
  formatPrice,
  googleImagesUrl,
  perfumeAnswer,
  perfumeFaq,
  perfumeScentDescription,
  perfumeAudience,
  slugify,
  SITE_URL,
  SITE_NAME,
  perfumes as ALL_PERFUMES,
} from "@/lib/data";

const CURRENT_YEAR = 2026;
const UPDATED_LABEL = "21 de mayo de 2026";

const PROJECTION_SCORE = {
  Suave: 2.6,
  Media: 3.4,
  "Media-alta": 4.1,
  Alta: 4.6,
  "Muy alta": 5,
};

function avgHours(longevity) {
  const m = String(longevity).match(/(\d+)\D+(\d+)/);
  if (m) return (Number(m[1]) + Number(m[2])) / 2;
  const s = String(longevity).match(/\d+/);
  return s ? Number(s[0]) : 0;
}

function clampScore(n) {
  return Math.max(1, Math.min(5, n));
}

function longevityScore(longevity) {
  return clampScore((avgHours(longevity) / 12) * 5);
}

function projectionScore(projection) {
  return PROJECTION_SCORE[projection] || 3.2;
}

function versatilityScore(perfume) {
  const seasons = perfume.seasons?.length || 0;
  const occasions = perfume.occasions?.length || 0;
  return clampScore(((seasons / 4) * 0.5 + (occasions / 5) * 0.5) * 5);
}

function stars(score) {
  const full = Math.round(score);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

export function generateStaticParams() {
  return getAllPerfumes().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const perfume = getPerfumeBySlug(slug);
  if (!perfume) return {};
  const title = `${perfume.name} de ${perfume.brand} ${CURRENT_YEAR}: notas, precio, opiniones e historia`;
  const description = `${perfume.name} (${perfume.concentration}) de ${perfume.brand}: perfume ${perfume.family.toLowerCase()} de ${genderLabel(
    perfume.gender
  ).toLowerCase()}. Notas, precio (${formatPrice(perfume)}), duración ${perfume.longevity}, mejor época del año y opiniones.`;
  const ogImages =
    perfume.image && perfume.image.startsWith("/")
      ? [
          {
            url: perfume.image,
            alt: `Foto del perfume ${perfume.name} de ${perfume.brand}`,
          },
        ]
      : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/perfumes/${perfume.slug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/perfumes/${perfume.slug}`,
      type: "article",
      locale: "es_ES",
      ...(ogImages && { images: ogImages }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImages && { images: ogImages.map((i) => i.url) }),
    },
  };
}

export default async function PerfumePage({ params }) {
  const { slug } = await params;
  const perfume = getPerfumeBySlug(slug);
  if (!perfume) notFound();

  const similar = getSimilarPerfumes(perfume);
  const clonePage = CLONES.find((c) => c.originalSlug === perfume.slug);
  const inClonesOf = CLONES.find((c) => c.alternatives.includes(perfume.slug));
  const { min, max, currency } = perfume.priceRange;

  // Otros perfumes de la MISMA marca y de la MISMA familia
  // para enlazado interno y mayor permanencia del usuario en el sitio.
  const sameBrand = ALL_PERFUMES.filter(
    (p) => p.brandSlug === perfume.brandSlug && p.slug !== perfume.slug
  ).slice(0, 6);
  const sameFamily = ALL_PERFUMES.filter(
    (p) =>
      p.family === perfume.family &&
      p.slug !== perfume.slug &&
      p.brandSlug !== perfume.brandSlug
  ).slice(0, 6);

  const answer = perfumeAnswer(perfume);
  const faq = perfumeFaq(perfume);
  const scent = perfumeScentDescription(perfume);
  const audience = perfumeAudience(perfume);

  const ratingMetrics = [
    { label: "Duración", score: longevityScore(perfume.longevity) },
    { label: "Proyección", score: projectionScore(perfume.projection) },
    { label: "Versatilidad", score: versatilityScore(perfume) },
  ];

  const compareRows = [perfume, ...similar.slice(0, 3)];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${perfume.brand} ${perfume.name} ${perfume.concentration}`,
    ...(perfume.image && perfume.image.startsWith("/")
      ? { image: `${SITE_URL}${perfume.image}` }
      : {}),
    brand: { "@type": "Brand", name: perfume.brand },
    category: "Perfume / Fragancia",
    description: `${perfume.name} (${perfume.concentration}) de ${perfume.brand}, perfume ${perfume.family.toLowerCase()} de ${genderLabel(perfume.gender).toLowerCase()} lanzado en ${perfume.year}.`,
    audience: { "@type": "PeopleAudience", suggestedGender: perfume.gender },
    releaseDate: `${perfume.year}-01-01`,
    inLanguage: "es-ES",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: currency,
      lowPrice: min,
      highPrice: max,
      offerCount: 3,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: perfume.rating,
      bestRating: 5,
      ratingCount: 100,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Familia olfativa", value: perfume.family },
      { "@type": "PropertyValue", name: "Perfumista", value: perfume.perfumer },
      { "@type": "PropertyValue", name: "Duración", value: perfume.longevity },
      { "@type": "PropertyValue", name: "Proyección", value: perfume.projection },
    ],
  };

  const speakableLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".perfume-answer-box", ".perfume-h1"],
    },
    url: `${SITE_URL}/perfumes/${perfume.slug}`,
  };

  const levels = [
    { key: "top", label: "Notas de salida", notes: perfume.notes.top },
    { key: "heart", label: "Notas de corazón", notes: perfume.notes.heart },
    { key: "base", label: "Notas de fondo", notes: perfume.notes.base },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/perfumes", label: "Perfumes" },
          { href: `/marcas/${perfume.brandSlug}`, label: perfume.brand },
          { href: `/perfumes/${perfume.slug}`, label: perfume.name },
        ]}
      />

      <div className="container">
        <div className="detail-top">
          <PerfumeImage perfume={perfume} variant="detail" />
          <div className="detail-info">
            <Link href={`/marcas/${perfume.brandSlug}`} className="detail-brand">
              {perfume.brand}
            </Link>
            <h1 className="perfume-h1">
              {perfume.name}{" "}
              <span style={{ fontSize: "0.55em", color: "var(--text-soft)", fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {perfume.concentration}
              </span>
            </h1>
            <p className="detail-tagline">
              Perfume {perfume.family.toLowerCase()} de{" "}
              {genderLabel(perfume.gender).toLowerCase()} ·{" "}
              <time>{perfume.year}</time> · Por {perfume.perfumer}
            </p>
            <div className="detail-badges">
              <span className={`badge ${perfume.gender}`}>
                {genderLabel(perfume.gender)}
              </span>
              <span className="badge">{perfume.year}</span>
              <span className="rating">★ {perfume.rating.toFixed(1)} / 5</span>
            </div>
            <p className="detail-price">
              {formatPrice(perfume)}{" "}
              <small>· aprox. {perfume.pricePerMl.toFixed(2)}€/ml</small>
            </p>

            <div className="detail-cta">
              <a href="#comprar" className="btn">
                Ver dónde comprar →
              </a>
              <a
                href={googleImagesUrl(perfume)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Ver fotos en Google Imágenes →
              </a>
            </div>

            <dl className="spec-grid">
              <div>
                <dt>Género</dt>
                <dd>{genderLabel(perfume.gender)}</dd>
              </div>
              <div>
                <dt>Año</dt>
                <dd>{perfume.year}</dd>
              </div>
              <div>
                <dt>Perfumista</dt>
                <dd>{perfume.perfumer}</dd>
              </div>
              <div>
                <dt>Familia olfativa</dt>
                <dd>{perfume.family}</dd>
              </div>
              <div>
                <dt>Proyección</dt>
                <dd>{perfume.projection}</dd>
              </div>
              <div>
                <dt>Duración</dt>
                <dd>{perfume.longevity}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="block" id="comprar" style={{ marginTop: "20px" }}>
          <BuyBox perfume={perfume} />
        </div>

        <p className="guide-meta" style={{ marginTop: "16px" }}>
          Publicado por <Link href="/sobre">Editorial Olfativa</Link> ·{" "}
          <time>Actualizado el {UPDATED_LABEL}</time>
        </p>

        <aside
          className="perfume-answer-box guide-answer-box"
          aria-label="Resumen rápido"
        >
          <strong className="guide-answer-label">En pocas palabras</strong>
          <p>{answer}</p>
        </aside>

        <div className="block">
          <h2>Cómo huele {perfume.name}</h2>
          <p style={{ fontSize: "1.02rem", lineHeight: "1.75" }}>{scent}</p>
        </div>

        <div className="block">
          <h2>Pirámide olfativa de {perfume.name}</h2>
          <div className="pyramid">
            {levels.map((level) => (
              <div key={level.key} className="pyramid-level">
                <h4>{level.label}</h4>
                <div className="note-tags">
                  {level.notes.map((note) => (
                    <Link
                      key={note}
                      href={`/notas/${slugify(note)}`}
                      className="note-tag"
                    >
                      {note}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="block">
          <h2>Valoración de {perfume.name}</h2>
          <div className="ratings">
            <div className="ratings-score">
              <span className="ratings-num">{perfume.rating.toFixed(1)}</span>
              <span className="ratings-stars" aria-hidden="true">
                {stars(perfume.rating)}
              </span>
              <span className="ratings-out">
                sobre 5 · valoración media de la comunidad
              </span>
            </div>
            <div className="rating-bars">
              {ratingMetrics.map((m) => (
                <div key={m.label} className="rating-bar">
                  <span className="rating-bar-label">{m.label}</span>
                  <span className="rating-bar-track">
                    <span
                      className="rating-bar-fill"
                      style={{ width: `${(m.score / 5) * 100}%` }}
                    />
                  </span>
                  <span className="rating-bar-val">{m.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="block">
          <h2>Quién debería usar {perfume.name}</h2>
          <p style={{ fontSize: "1.02rem", lineHeight: "1.75" }}>{audience}</p>
        </div>

        <div className="block">
          <h2>Cuándo usar {perfume.name}</h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "14px" }}>
            Recomendaciones de temporada, momento del día y ocasiones ideales.
          </p>
          <div className="spec-grid">
            <div>
              <dt>Temporadas</dt>
              <dd>
                {perfume.seasons.map((s) => seasonLabel(s)).join(", ")}
              </dd>
            </div>
            <div>
              <dt>Momento del día</dt>
              <dd>
                {perfume.timeOfDay
                  .map((t) => (t === "dia" ? "Día" : "Noche"))
                  .join(" y ")}
              </dd>
            </div>
            <div>
              <dt>Ocasiones</dt>
              <dd>
                {perfume.occasions.map((o) => occasionLabel(o)).join(", ")}
              </dd>
            </div>
          </div>
          <div className="chip-row" style={{ marginTop: "14px" }}>
            {perfume.seasons.map((s) => (
              <Link key={s} href={`/temporada/${s}`} className="chip">
                Más perfumes de {seasonLabel(s).toLowerCase()}
              </Link>
            ))}
          </div>
        </div>

        {similar.length > 0 && (
          <div className="block">
            <h2>{perfume.name} comparado con perfumes similares</h2>
            <p style={{ color: "var(--text-soft)", marginBottom: "16px" }}>
              Precio, familia, duración, proyección y valoración de un vistazo.
            </p>
            <div className="compare-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Perfume</th>
                    <th>Precio</th>
                    <th>Familia</th>
                    <th>Duración</th>
                    <th>Proyección</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((p) => {
                    const current = p.slug === perfume.slug;
                    return (
                      <tr key={p.slug} className={current ? "is-current" : ""}>
                        <td>
                          {current ? (
                            <strong>
                              {p.name}{" "}
                              <span className="compare-brand">{p.brand}</span>
                            </strong>
                          ) : (
                            <Link href={`/perfumes/${p.slug}`}>
                              {p.name}{" "}
                              <span className="compare-brand">{p.brand}</span>
                            </Link>
                          )}
                        </td>
                        <td>{formatPrice(p)}</td>
                        <td>{p.family}</td>
                        <td>{p.longevity}</td>
                        <td>{p.projection}</td>
                        <td className="compare-rating">★ {p.rating.toFixed(1)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {clonePage && (
          <div className="block">
            <div className="callout">
              <h3>¿Lo encuentras caro? Mira las alternativas</h3>
              <p>
                Hay clones y alternativas más asequibles a {perfume.name} que
                conservan buena parte de su carácter por mucho menos dinero.
              </p>
              <Link href={`/clones/${clonePage.slug}`} className="btn">
                Ver clones de {perfume.name} →
              </Link>
            </div>
          </div>
        )}

        {!clonePage && inClonesOf && (
          <div className="block">
            <div className="callout">
              <h3>{perfume.name} es alternativa de un perfume más caro</h3>
              <p>
                Este perfume se considera una de las mejores alternativas
                baratas a otro más exclusivo. Mira la comparativa completa.
              </p>
              <Link href={`/clones/${inClonesOf.slug}`} className="btn">
                Ver comparativa →
              </Link>
            </div>
          </div>
        )}

        <div className="block">
          <h2>Historia de {perfume.name}</h2>
          <div className="prose">
            <p>{perfume.history}</p>
          </div>
        </div>

        <div className="block">
          <h2>Preguntas frecuentes sobre {perfume.name}</h2>
          <div className="faq-list">
            {faq.map((q, i) => (
              <details key={i} className="faq-item" open={i === 0}>
                <summary>{q.q}</summary>
                <div className="faq-answer">
                  <p>{q.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {similar.length > 0 && (
          <div className="block">
            <h2>Perfumes similares a {perfume.name}</h2>
            <PerfumeGrid perfumes={similar} />
            <div className="chip-row" style={{ marginTop: "20px" }}>
              <Link href={`/alternativas/${perfume.slug}`} className="chip">
                Ver todas las alternativas →
              </Link>
              {similar.map((other) => {
                const pair = [perfume.slug, other.slug].sort().join("-vs-");
                return (
                  <Link
                    key={other.slug}
                    href={`/comparativas/${pair}`}
                    className="chip"
                  >
                    {perfume.name} vs {other.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {sameBrand.length > 0 && (
          <div className="block">
            <h2>Otros perfumes de {perfume.brand}</h2>
            <PerfumeGrid perfumes={sameBrand} />
            <div className="chip-row" style={{ marginTop: "16px" }}>
              <Link href={`/marcas/${perfume.brandSlug}`} className="chip">
                Ver toda la perfumería de {perfume.brand} →
              </Link>
            </div>
          </div>
        )}

        {sameFamily.length > 0 && (
          <div className="block">
            <h2>Otros perfumes {perfume.family.toLowerCase()}</h2>
            <PerfumeGrid perfumes={sameFamily} />
          </div>
        )}

        <div className="block" id="foro">
          <h2>Foro: opiniones sobre {perfume.name}</h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "18px" }}>
            ¿Lo has probado? Comparte tu experiencia, duración, proyección y en
            qué ocasiones lo usas. Inicia sesión con GitHub para participar.
          </p>
          <Comments term={`perfume/${perfume.slug}`} />
        </div>
      </div>
    </>
  );
}
