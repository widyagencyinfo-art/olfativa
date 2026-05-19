import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import PerfumeImage from "@/components/PerfumeImage";
import Comments from "@/components/Comments";
import {
  getAllPerfumes,
  getPerfumeBySlug,
  getSimilarPerfumes,
  genderLabel,
  seasonLabel,
  occasionLabel,
  formatPrice,
  googleImagesUrl,
  slugify,
  SITE_URL,
} from "@/lib/data";

export function generateStaticParams() {
  return getAllPerfumes().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const perfume = getPerfumeBySlug(slug);
  if (!perfume) return {};
  const title = `${perfume.name} de ${perfume.brand} — Notas, Precio e Historia`;
  const description = `${perfume.name} (${perfume.concentration}) de ${perfume.brand}: perfil ${perfume.family.toLowerCase()}, perfume de ${genderLabel(
    perfume.gender
  ).toLowerCase()}. Notas, precio (${formatPrice(perfume)}), historia y mejor época del año para usarlo.`;
  return {
    title,
    description,
    alternates: { canonical: `/perfumes/${perfume.slug}` },
    openGraph: {
      title: `${title} | Olfativa`,
      description,
      url: `${SITE_URL}/perfumes/${perfume.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PerfumePage({ params }) {
  const { slug } = await params;
  const perfume = getPerfumeBySlug(slug);
  if (!perfume) notFound();

  const similar = getSimilarPerfumes(perfume);
  const { min, max, currency } = perfume.priceRange;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${perfume.name} ${perfume.concentration}`,
    brand: { "@type": "Brand", name: perfume.brand },
    category: "Perfume",
    description: perfume.history,
    audience: { "@type": "PeopleAudience", suggestedGender: perfume.gender },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: currency,
      lowPrice: min,
      highPrice: max,
      offerCount: 1,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: perfume.rating,
      bestRating: 5,
      ratingCount: 100,
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/perfumes", label: "Perfumes" },
          {
            href: `/marcas/${perfume.brandSlug}`,
            label: perfume.brand,
          },
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
            <h1>{perfume.name}</h1>
            <p className="detail-tagline">
              {perfume.concentration} · {perfume.family}
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

            <a
              href={googleImagesUrl(perfume)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ marginBottom: "18px" }}
            >
              Ver fotos en Google Imágenes →
            </a>

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

        <div className="block">
          <h2>Pirámide olfativa</h2>
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

        <div className="block">
          <h2>Historia de {perfume.name}</h2>
          <div className="prose">
            <p>{perfume.history}</p>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="block">
            <h2>Perfumes similares a {perfume.name}</h2>
            <PerfumeGrid perfumes={similar} />
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
