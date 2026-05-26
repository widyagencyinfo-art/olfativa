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

  // Novedades: perfumes lanzados en los ultimos 3 anos. Senal de
  // frescura para Google y razon para que el usuario vuelva.
  const novedades = [...perfumes]
    .filter((p) => p.year >= 2023)
    .sort((a, b) => b.year - a.year || b.rating - a.rating)
    .slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "es-ES",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const HOME_FAQ = [
    {
      q: "¿Cuántos perfumes tiene Olfativa?",
      a: `Olfativa tiene actualmente ${perfumes.length} perfumes catalogados con notas olfativas, perfil, precio orientativo, historia y mejor época del año, distribuidos en ${brands.length} marcas distintas (de gran consumo, nicho y lujo) y ${families.length} familias olfativas.`,
    },
    {
      q: "¿Cómo elijo el perfume adecuado para mí?",
      a: "Identifica primero tu familia olfativa preferida (floral, amaderada, cítrica, oriental, gourmand...), prueba siempre en piel (no en blotter), espera 2 horas para que se desarrolle y no compres en caliente. Empieza por muestras o decants antes del frasco grande. Ver guía completa: /guias/como-elegir-perfume.",
    },
    {
      q: "¿Qué significa EDP, EDT y Parfum?",
      a: "Son las concentraciones de esencia de un perfume. Parfum: 20-40%, dura 10-14 horas. EDP (Eau de Parfum): 15-20%, dura 7-10 horas. EDT (Eau de Toilette): 5-15%, dura 4-7 horas. EDC (Eau de Cologne): 2-5%, dura 2-4 horas. Cuanta más esencia, más intenso y proyectivo.",
    },
    {
      q: "¿Qué son los clones de perfumes?",
      a: "Los clones son perfumes asequibles que imitan el perfil olfativo de fragancias caras (Aventus, Baccarat Rouge 540, Tobacco Vanille, Sauvage…) a una fracción del precio. Marcas como Armaf, Lattafa, Nishane o Mancera lideran este mercado. En Olfativa tenemos páginas dedicadas con los mejores clones de cada perfume estrella.",
    },
    {
      q: "¿Cómo aplicar perfume para que dure todo el día?",
      a: "Aplica 2-4 pulverizaciones en los puntos de pulso (muñecas, cuello, pecho), a 15-20 cm de la piel, sobre piel hidratada y sin frotar. La piel hidratada con crema neutra multiplica la duración. No guardes el perfume en el baño: la humedad y el calor lo degradan rápidamente.",
    },
  ];

  const homeFaqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd) }}
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
          <div
            className="callout"
            style={{ textAlign: "center", padding: "32px 28px" }}
          >
            <h2 style={{ margin: "0 0 6px", fontSize: "1.6rem" }}>
              ¿No sabes qué tipo de perfume buscar?
            </h2>
            <p style={{ marginBottom: "18px", color: "var(--text)" }}>
              Haz nuestro <strong>test gratis de 6 preguntas</strong> y
              descubre tu familia olfativa + 6 perfumes recomendados.
            </p>
            <Link href="/test/familia-olfativa" className="btn">
              Empezar test (1 minuto) →
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="container">
          <div className="section-head">
            <h2>¿Qué perfume eres según tu signo zodiacal? ♈♉♊</h2>
            <Link href="/perfume-zodiacal">Ver los 12 signos →</Link>
          </div>
          <p style={{ color: "var(--text-soft)", marginBottom: 20 }}>
            12 signos del zodiaco, 72 perfumes recomendados. Cada signo conecta
            con una familia olfativa concreta. Descubre el tuyo, el de tu
            pareja, tu mejor amiga o tu jefe.
          </p>
          <div className="chip-row">
            {[
              { slug: "aries", emoji: "♈", name: "Aries" },
              { slug: "tauro", emoji: "♉", name: "Tauro" },
              { slug: "geminis", emoji: "♊", name: "Géminis" },
              { slug: "cancer", emoji: "♋", name: "Cáncer" },
              { slug: "leo", emoji: "♌", name: "Leo" },
              { slug: "virgo", emoji: "♍", name: "Virgo" },
              { slug: "libra", emoji: "♎", name: "Libra" },
              { slug: "escorpio", emoji: "♏", name: "Escorpio" },
              { slug: "sagitario", emoji: "♐", name: "Sagitario" },
              { slug: "capricornio", emoji: "♑", name: "Capricornio" },
              { slug: "acuario", emoji: "♒", name: "Acuario" },
              { slug: "piscis", emoji: "♓", name: "Piscis" }
            ].map((z) => (
              <Link
                key={z.slug}
                href={`/perfume-zodiacal/${z.slug}`}
                className="chip"
              >
                {z.emoji} {z.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Novedades 2024-2026</h2>
            <Link href="/perfumes">Ver todos →</Link>
          </div>
          <p style={{ color: "var(--text-soft)", marginBottom: "20px" }}>
            Lanzamientos recientes de las grandes marcas y casas de nicho.
          </p>
          <PerfumeGrid perfumes={novedades} />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
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
            <h2>Preguntas frecuentes sobre perfumes</h2>
          </div>
          <div className="faq-list" style={{ maxWidth: "820px" }}>
            {HOME_FAQ.map((q, i) => (
              <details key={i} className="faq-item" open={i === 0}>
                <summary>{q.q}</summary>
                <div className="faq-answer">
                  <p>{q.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)" }}>
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
