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

  const novedades = [...perfumes]
    .filter((p) => p.year >= 2023)
    .sort((a, b) => b.year - a.year || b.rating - a.rating)
    .slice(0, 8);

  // Guías destacadas en la home: las 3 más recientes (contenido fresco que así
  // recibe enlaces desde la página de mayor autoridad y se indexa antes) + 3
  // guías fundamentales de referencia. Sin duplicados.
  const newestGuides = GUIDES.slice(-3).reverse();
  const newestSlugs = new Set(newestGuides.map((g) => g.slug));
  const evergreenGuides = GUIDES.filter((g) => !newestSlugs.has(g.slug)).slice(0, 3);
  const homeGuides = [...newestGuides, ...evergreenGuides];

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

  const zodiac = [
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
    { slug: "piscis", emoji: "♓", name: "Piscis" },
  ];

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

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <span className="eyebrow">La enciclopedia de las fragancias</span>
          <h1>
            Encuentra cualquier perfume
            <br />y conócelo <span className="hero-accent">a fondo</span>
          </h1>
          <p>
            Notas, perfil olfativo, precio, historia y la mejor época del año
            para llevarlo. Todo sobre {perfumes.length} fragancias del mercado.
          </p>
          <SearchBox index={index} />
          <div className="stat-row">
            <div className="stat">
              <strong>{perfumes.length}</strong>
              <span>Perfumes</span>
            </div>
            <div className="stat-sep" aria-hidden="true" />
            <div className="stat">
              <strong>{brands.length}</strong>
              <span>Marcas</span>
            </div>
            <div className="stat-sep" aria-hidden="true" />
            <div className="stat">
              <strong>{CLONES.length}</strong>
              <span>Clones</span>
            </div>
            <div className="stat-sep" aria-hidden="true" />
            <div className="stat">
              <strong>{families.length}</strong>
              <span>Familias</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEJOR VALORADOS ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Lo más recomendado</span>
              <h2>Perfumes mejor valorados</h2>
            </div>
            <Link href="/perfumes" className="section-link">
              Ver catálogo →
            </Link>
          </div>
          <PerfumeGrid perfumes={featured} />
        </div>
      </section>

      {/* ============ NOVEDADES ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Recién llegados</span>
              <h2>Novedades 2024-2026</h2>
            </div>
            <Link href="/perfumes" className="section-link">
              Ver todos →
            </Link>
          </div>
          <PerfumeGrid perfumes={novedades} />
        </div>
      </section>

      {/* ============ CLONES (alta intención) ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Ahorra sin renunciar al aroma</span>
              <h2>Clones y alternativas baratas</h2>
            </div>
            <Link href="/clones" className="section-link">
              Ver los 30 →
            </Link>
          </div>
          <p className="section-lead">
            ¿Por qué pagar 300€ cuando una alternativa de 30€ huele casi igual?
            Los mejores clones de los perfumes más caros del mercado.
          </p>
          <div className="chip-row">
            {CLONES.slice(0, 10).map((c) => (
              <Link key={c.slug} href={`/clones/${c.slug}`} className="chip chip-lg">
                💰 {c.h1.replace(/^Clones de /i, "").replace(/:.*$/, "")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HERRAMIENTAS INTERACTIVAS ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Descúbrelo en 1 minuto</span>
              <h2>Herramientas para encontrar tu perfume</h2>
            </div>
          </div>
          <div className="tool-grid">
            <Link href="/test/familia-olfativa" className="tool-card tool-test">
              <span className="tool-emoji">🧪</span>
              <h3>Test de familia olfativa</h3>
              <p>
                6 preguntas y descubre tu familia favorita + 6 perfumes
                recomendados para ti.
              </p>
              <span className="tool-cta">Empezar test →</span>
            </Link>
            <Link href="/perfume-zodiacal" className="tool-card tool-zodiac">
              <span className="tool-emoji">♒</span>
              <h3>Tu perfume según tu signo</h3>
              <p>
                12 signos del zodiaco, 72 perfumes. Descubre el tuyo, el de tu
                pareja o tu mejor amiga.
              </p>
              <span className="tool-cta">Ver mi signo →</span>
            </Link>
          </div>
          <div className="zodiac-chip-row">
            {zodiac.map((z) => (
              <Link
                key={z.slug}
                href={`/perfume-zodiacal/${z.slug}`}
                className="chip chip-zodiac"
              >
                {z.emoji} {z.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPLORA POR CATEGORÍA ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Navega el catálogo</span>
              <h2>Explora por género y temporada</h2>
            </div>
          </div>
          <div className="tile-grid">
            {genders.map((g) => (
              <Link key={g.slug} href={`/genero/${g.slug}`} className="tile">
                <h3>Perfumes de {g.name.toLowerCase()}</h3>
                <p>{g.count} fragancias</p>
              </Link>
            ))}
            {seasons.map((s) => (
              <Link key={s.slug} href={`/temporada/${s.slug}`} className="tile">
                <h3>Perfumes de {seasonLabel(s.slug).toLowerCase()}</h3>
                <p>{s.count} fragancias</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ESTUDIO DE DATOS (activo enlazable) ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Datos, no opiniones</span>
              <h2>La perfumería en datos</h2>
            </div>
            <Link href="/estudio/perfumeria-en-datos" className="section-link">
              Ver el estudio →
            </Link>
          </div>
          <p className="section-lead">
            Analizamos las fichas de los {perfumes.length} perfumes del catálogo
            para responder con cifras: las notas que más se repiten, las
            familias que dominan, el reparto por género y concentración, y
            cuánto cuesta de media un buen perfume.
          </p>
          <Link
            href="/estudio/perfumeria-en-datos"
            className="chip chip-lg"
          >
            📊 Ver las notas, familias y precios más comunes →
          </Link>
        </div>
      </section>

      {/* ============ GUÍAS ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Aprende de perfumería</span>
              <h2>Guías de perfumería</h2>
            </div>
            <Link href="/guias" className="section-link">
              Ver las {GUIDES.length} →
            </Link>
          </div>
          <div className="tile-grid">
            {homeGuides.map((g) => (
              <Link key={g.slug} href={`/guias/${g.slug}`} className="tile tile-guide">
                <h3>{g.title}</h3>
                <p>{g.description.slice(0, 110)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TELEGRAM CTA ============ */}
      <section className="section">
        <div className="container">
          <div className="tg-inline" style={{ marginTop: 0 }}>
            <span className="tg-emoji">📨</span>
            <div className="tg-content">
              <h3>1 perfume al día gratis en Telegram</h3>
              <p>
                Cada mañana un perfume del catálogo con foto, notas y precio.
                Por la tarde, clones baratos o curiosidades. Sin algoritmo, sin
                spam.
              </p>
            </div>
            <a
              href="https://t.me/olfativacomunidad"
              target="_blank"
              rel="noopener"
              className="tg-btn"
            >
              Suscribirme →
            </a>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Resolvemos tus dudas</span>
              <h2>Preguntas frecuentes</h2>
            </div>
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

      {/* ============ MARCAS ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">{brands.length} casas</span>
              <h2>Marcas destacadas</h2>
            </div>
            <Link href="/marcas" className="section-link">
              Ver todas →
            </Link>
          </div>
          <div className="chip-row">
            {brands.map((b) => (
              <Link key={b.slug} href={`/marcas/${b.slug}`} className="chip">
                {b.name} <span className="chip-count">{b.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
