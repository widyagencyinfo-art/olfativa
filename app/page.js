import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import PerfumeGrid from "@/components/PerfumeGrid";
import {
  getAllPerfumes,
  getBrands,
  getFamilies,
  getGenders,
  getSeasons,
  seasonLabel,
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
} from "@/lib/data";
import { GUIDES } from "@/lib/guides";
import { CLONES } from "@/lib/clones";

export default function HomePage() {
  const perfumes = getAllPerfumes();
  const brands = getBrands();
  const families = getFamilies();
  const genders = getGenders();
  const seasons = getSeasons();

  const index = perfumes.map((p) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    gender: p.gender,
  }));

  const featured = [...perfumes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/buscar?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero">
        <div className="container">
          <span className="eyebrow">La enciclopedia de las fragancias</span>
          <h1>Encuentra cualquier perfume y conócelo a fondo</h1>
          <p>
            Notas, perfil olfativo, precio, marca, historia y la mejor época
            del año para usarlo. Todo sobre {perfumes.length} perfumes
            populares del mercado.
          </p>
          <SearchBox index={index} />
          <div className="stat-row">
            <div className="stat">
              <strong>{perfumes.length}</strong>
              <span>Perfumes</span>
            </div>
            <div className="stat">
              <strong>{brands.length}</strong>
              <span>Marcas</span>
            </div>
            <div className="stat">
              <strong>{families.length}</strong>
              <span>Familias olfativas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Perfumes mejor valorados</h2>
            <Link href="/perfumes">Ver todos →</Link>
          </div>
          <PerfumeGrid perfumes={featured} />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="container">
          <div className="section-head">
            <h2>Explora por género</h2>
          </div>
          <div className="tile-grid">
            {genders.map((g) => (
              <Link key={g.slug} href={`/genero/${g.slug}`} className="tile">
                <h3>Perfumes de {g.name.toLowerCase()}</h3>
                <p>{g.count} fragancias</p>
              </Link>
            ))}
            {seasons.map((s) => (
              <Link
                key={s.slug}
                href={`/temporada/${s.slug}`}
                className="tile"
              >
                <h3>Perfumes de {seasonLabel(s.slug).toLowerCase()}</h3>
                <p>{s.count} fragancias</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Clones y alternativas baratas</h2>
            <Link href="/clones">Ver todos →</Link>
          </div>
          <p style={{ color: "var(--text-soft)", marginBottom: "20px" }}>
            Los mejores clones de los perfumes más caros: por qué pagar 300€
            cuando una alternativa de 30€ huele casi igual.
          </p>
          <div className="chip-row">
            {CLONES.slice(0, 8).map((c) => (
              <Link key={c.slug} href={`/clones/${c.slug}`} className="chip">
                {c.h1.replace(/^Clones de /i, "").replace(/:.*$/, "")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="container">
          <div className="section-head">
            <h2>Guías de perfumería</h2>
            <Link href="/guias">Ver todas →</Link>
          </div>
          <div className="tile-grid">
            {GUIDES.slice(0, 6).map((g) => (
              <Link key={g.slug} href={`/guias/${g.slug}`} className="tile">
                <h3>{g.title}</h3>
                <p>{g.description.slice(0, 110)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Marcas destacadas</h2>
            <Link href="/marcas">Ver todas →</Link>
          </div>
          <div className="chip-row">
            {brands.map((b) => (
              <Link key={b.slug} href={`/marcas/${b.slug}`} className="chip">
                {b.name} ({b.count})
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
