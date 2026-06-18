import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import { getDatasetStats } from "@/lib/stats";
import { SITE_URL, SITE_NAME, slugify } from "@/lib/data";

const UPDATED = "2026-06-19";
const UPDATED_LABEL = "19 de junio de 2026";
const PATH = "/estudio/perfumeria-en-datos";

export const metadata = {
  title: "La perfumería en datos: análisis de un catálogo real de perfumes",
  description:
    "Estudio de datos sobre perfumería: las notas más usadas, familias olfativas dominantes, reparto por género, concentración, marcas, décadas y precio medio, analizando un catálogo real de perfumes.",
  alternates: { canonical: PATH },
  openGraph: {
    title: `La perfumería en datos | ${SITE_NAME}`,
    description:
      "Las notas más usadas, las familias dominantes, el reparto por género, la concentración, las marcas y el precio medio del perfume, en datos.",
    type: "article",
    url: `${SITE_URL}${PATH}`,
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "La perfumería en datos",
    description:
      "Las notas más usadas, las familias dominantes, el género, la concentración y el precio medio del perfume, en datos.",
  },
};

// Barra horizontal proporcional, 100% CSS (sin JS de cliente).
function Bar({ label, value, pct, max = 100, href, suffix }) {
  const width = Math.max(2, Math.round((100 * pct) / max));
  const inner = (
    <>
      <span className="dv-bar-label">{label}</span>
      <span className="dv-bar-track" aria-hidden="true">
        <span className="dv-bar-fill" style={{ width: `${width}%` }} />
      </span>
      <span className="dv-bar-value">
        {pct}
        {suffix ?? "%"}
      </span>
    </>
  );
  return (
    <div className="dv-bar">
      {href ? (
        <Link href={href} className="dv-bar-row dv-bar-link">
          {inner}
        </Link>
      ) : (
        <div className="dv-bar-row">{inner}</div>
      )}
    </div>
  );
}

export default function PerfumeriaEnDatosPage() {
  const s = getDatasetStats();

  const maxNote = s.topNotes[0]?.pct || 100;
  const maxFamily = s.families[0]?.pct || 100;
  const maxBrand = s.topBrands[0]?.count || 1;
  const maxSeason = Math.max(...s.seasons.map((x) => x.pct), 1);
  const maxOcc = Math.max(...s.occasions.map((x) => x.pct), 1);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metadata.title,
    description: metadata.description,
    inLanguage: "es-ES",
    datePublished: UPDATED,
    dateModified: UPDATED,
    author: {
      "@type": "Organization",
      name: `Editorial ${SITE_NAME}`,
      url: `${SITE_URL}/sobre`,
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}${PATH}`,
  };

  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "La perfumería en datos — análisis de catálogo",
    description: `Análisis estadístico de ${s.total} perfumes: notas, familias olfativas, género, concentración, marcas, décadas y precio.`,
    inLanguage: "es-ES",
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}${PATH}`,
    keywords: [
      "notas más usadas perfumería",
      "familias olfativas",
      "estadísticas perfumes",
      "precio medio perfume",
    ],
    variableMeasured: [
      "frecuencia de notas",
      "distribución de familias olfativas",
      "reparto por género",
      "concentración",
      "precio medio",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: PATH, label: "La perfumería en datos" },
        ]}
      />

      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Estudio Olfativa</span>
            <h1>La perfumería en datos: qué nos dicen {s.total} perfumes</h1>
            <p className="guide-meta">
              Análisis de <Link href="/sobre">Editorial Olfativa</Link> ·{" "}
              <time dateTime={UPDATED}>Actualizado el {UPDATED_LABEL}</time>
            </p>
            <p className="guide-lead">
              Reunimos las fichas de <strong>{s.total} perfumes</strong> de{" "}
              <strong>{s.brandCount} marcas</strong> —diseñador y nicho,
              de {s.yearMin} a {s.yearMax}— y las cruzamos para responder a
              preguntas que normalmente se contestan «a ojo»: ¿qué notas se
              repiten más?, ¿qué familia domina?, ¿cuánto cuesta de media un
              buen perfume? Todas las cifras de esta página se calculan en
              directo desde nuestro <Link href="/perfumes">catálogo</Link>, así
              que se actualizan a medida que crece.
            </p>
          </header>

          <aside className="dv-keyfacts" aria-label="Datos clave">
            <div className="dv-kf">
              <strong>{s.total}</strong>
              <span>perfumes analizados</span>
            </div>
            <div className="dv-kf">
              <strong>{s.brandCount}</strong>
              <span>marcas distintas</span>
            </div>
            <div className="dv-kf">
              <strong>{s.noteCountDistinct}</strong>
              <span>notas únicas catalogadas</span>
            </div>
            <div className="dv-kf">
              <strong>{s.priceMedianMid} €</strong>
              <span>precio mediano</span>
            </div>
          </aside>

          {/* NOTAS */}
          <section className="guide-section">
            <h2>Las notas más usadas en perfumería</h2>
            <p>
              Una nota aparece en el porcentaje de perfumes que la incluyen en
              su salida, corazón o fondo. Domina la{" "}
              <Link href={`/notas/${slugify(s.topNotes[0].name)}`}>
                {s.topNotes[0].name.toLowerCase()}
              </Link>
              : está en el <strong>{s.topNotes[0].pct}%</strong> de las
              fragancias. No sorprende —es el cítrico comodín de casi cualquier
              salida—, pero sí lo hace ver lo transversales que son el{" "}
              <Link href="/notas/almizcle">almizcle</Link> y el{" "}
              <Link href="/guias/a-que-huele-el-ambar">ámbar</Link>, los
              fijadores que sostienen la estela.
            </p>
            <div className="dv-chart">
              {s.topNotes.map((n) => (
                <Bar
                  key={n.name}
                  label={n.name}
                  pct={n.pct}
                  max={maxNote}
                  href={`/notas/${slugify(n.name)}`}
                />
              ))}
            </div>
            <p className="dv-caption">
              % de los {s.total} perfumes que incluyen cada nota. Explora todas
              en el <Link href="/notas">índice de notas</Link>.
            </p>
          </section>

          {/* FAMILIAS */}
          <section className="guide-section">
            <h2>Qué familias olfativas dominan</h2>
            <p>
              La{" "}
              <Link href="/guias/familias-olfativas">familia olfativa</Link>{" "}
              clasifica el carácter global del perfume. El catálogo se inclina
              claramente hacia lo <strong>amaderado y oriental</strong>: las
              dos categorías que más se repiten beben de maderas y especias,
              el territorio más versátil y comercial de la perfumería actual.
            </p>
            <div className="dv-chart">
              {s.families.map((f) => (
                <Bar key={f.name} label={f.name} pct={f.pct} max={maxFamily} />
              ))}
            </div>
            <p className="dv-caption">
              % sobre {s.total} perfumes. Las familias agrupan matices; muchos
              perfumes viven en la frontera entre dos.
            </p>
          </section>

          {/* GÉNERO + CONCENTRACIÓN */}
          <section className="guide-section">
            <h2>Género y concentración</h2>
            <p>
              El reparto por género está muy equilibrado, con el bloque{" "}
              <Link href="/genero/unisex">unisex</Link> ganando peso —la
              tendencia de la última década—. En concentración manda el{" "}
              <strong>Eau de Parfum</strong>, hoy el estándar de mercado por su
              equilibrio entre duración y proyección, como explicamos en la{" "}
              <Link href="/guias/diferencia-edp-edt-edc-parfum">
                guía de concentraciones
              </Link>
              .
            </p>
            <div className="dv-twocol">
              <div>
                <h3 className="dv-subhead">Por género</h3>
                <div className="dv-chart">
                  {s.genders.map((g) => (
                    <Bar
                      key={g.key}
                      label={g.name}
                      pct={g.pct}
                      max={100}
                      href={`/genero/${g.key}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="dv-subhead">Por concentración</h3>
                <div className="dv-chart">
                  {s.concentrations.map((c) => (
                    <Bar key={c.name} label={c.name} pct={c.pct} max={100} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* MARCAS */}
          <section className="guide-section">
            <h2>Las marcas con más presencia</h2>
            <p>
              Entre <strong>{s.brandCount} marcas</strong>, las casas
              históricas francesas concentran el grueso del catálogo. Lideran{" "}
              {s.topBrands.slice(0, 3).map((b, i) => (
                <span key={b.name}>
                  {i > 0 && (i === 2 ? " y " : ", ")}
                  {b.slug ? (
                    <Link href={`/marcas/${b.slug}`}>{b.name}</Link>
                  ) : (
                    b.name
                  )}
                </span>
              ))}
              , las grandes maisons que marcan tendencia cada temporada.
            </p>
            <div className="dv-chart">
              {s.topBrands.map((b) => (
                <Bar
                  key={b.name}
                  label={b.name}
                  pct={b.count}
                  max={maxBrand}
                  suffix=""
                  href={b.slug ? `/marcas/${b.slug}` : undefined}
                />
              ))}
            </div>
            <p className="dv-caption">
              Número de perfumes por marca en el catálogo. Ver todas en{" "}
              <Link href="/marcas">marcas</Link>.
            </p>
          </section>

          {/* DÉCADAS */}
          <section className="guide-section">
            <h2>En qué décadas nacieron</h2>
            <p>
              La concentración de lanzamientos en los{" "}
              <strong>2010</strong> refleja tanto la explosión de novedades de
              esa década como el sesgo natural de cualquier catálogo vivo: los
              perfumes recientes siguen a la venta y son los más buscados.
            </p>
            <div className="dv-decades" role="img" aria-label="Perfumes por década de lanzamiento">
              {s.decades.map((d) => (
                <div key={d.decade} className="dv-deccol">
                  <span className="dv-deccount">{d.count}</span>
                  <span
                    className="dv-decbar"
                    style={{ height: `${Math.max(4, Math.round((100 * d.count) / s.maxDecade))}%` }}
                  />
                  <span className="dv-declabel">{d.label}</span>
                </div>
              ))}
            </div>
            <p className="dv-caption">
              Reparto por década de lanzamiento ({s.yearMin}–{s.yearMax}).
            </p>
          </section>

          {/* PRECIO */}
          <section className="guide-section">
            <h2>Cuánto cuesta el perfume, en cifras</h2>
            <p>
              Tomando el punto medio del rango de precio de cada frasco, el
              perfume <strong>mediano cuesta {s.priceMedianMid} €</strong> y el
              precio medio sube a {s.priceMeanMid} € (lo empujan algunas piezas
              de nicho muy caras). Medido por mililitro, la mediana se sitúa en{" "}
              <strong>{s.pricePerMlMedian} €/ml</strong>. Es justo el cálculo
              que conviene mirar antes de elegir entre un frasco grande barato
              y uno pequeño de nicho: lo desarrollamos en{" "}
              <Link href="/guias/perfumes-nicho-vs-disenador">
                nicho vs diseñador
              </Link>
              .
            </p>
            <div className="dv-keyfacts">
              <div className="dv-kf">
                <strong>{s.priceMedianMid} €</strong>
                <span>precio mediano por frasco</span>
              </div>
              <div className="dv-kf">
                <strong>{s.priceMeanMid} €</strong>
                <span>precio medio por frasco</span>
              </div>
              <div className="dv-kf">
                <strong>{s.pricePerMlMedian} €</strong>
                <span>mediana por mililitro</span>
              </div>
              <div className="dv-kf">
                <strong>{s.ratingAvg}</strong>
                <span>valoración media (sobre 5)</span>
              </div>
            </div>
          </section>

          {/* TEMPORADA + OCASIÓN */}
          <section className="guide-section">
            <h2>Para qué temporada y ocasión se recomiendan</h2>
            <p>
              Un mismo perfume suele valer para varias estaciones, por eso los
              porcentajes suman más de 100%. El catálogo se inclina al{" "}
              <Link href="/temporada/otono">otoño</Link> e{" "}
              <Link href="/temporada/invierno">invierno</Link> —las maderas y
              orientales lucen mejor con frío— mientras que el{" "}
              <Link href="/temporada/verano">verano</Link>, más exigente, es el
              hueco con menos opciones.
            </p>
            <div className="dv-twocol">
              <div>
                <h3 className="dv-subhead">Por temporada</h3>
                <div className="dv-chart">
                  {s.seasons.map((x) => (
                    <Bar
                      key={x.key}
                      label={x.name}
                      pct={x.pct}
                      max={maxSeason}
                      href={`/temporada/${x.key}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="dv-subhead">Por ocasión</h3>
                <div className="dv-chart">
                  {s.occasions.map((x) => (
                    <Bar key={x.key} label={x.name} pct={x.pct} max={maxOcc} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* METODOLOGÍA */}
          <section className="guide-section">
            <h2>Metodología</h2>
            <p>
              Los datos provienen del catálogo editorial de {SITE_NAME}:{" "}
              <strong>{s.total} perfumes</strong> con ficha completa (notas,
              familia, género, concentración, año, precio de referencia y
              valoración). Las frecuencias de notas se calculan por presencia
              (un perfume cuenta una vez por nota, aparezca en salida, corazón
              o fondo). Los precios usan el punto medio del rango orientativo de
              cada frasco y pueden variar según tienda y formato. No es una
              muestra del mercado global, sino una radiografía de una selección
              curada de los perfumes más relevantes y buscados. Las cifras se
              recalculan automáticamente con cada actualización del catálogo.
            </p>
            <p className="dv-caption">
              ¿Reutilizas estos datos? Genial: enlaza a{" "}
              <Link href={PATH}>olfativa.es{PATH}</Link> como fuente.
            </p>
          </section>

          <ShareButtons
            url={PATH}
            text="La perfumería en datos: las notas más usadas, las familias dominantes y el precio medio del perfume"
          />

          {/* SEGUIR LEYENDO */}
          <section className="guide-section">
            <h2>Sigue explorando</h2>
            <div className="tile-grid">
              <Link href="/guias/familias-olfativas" className="tile">
                <h3>Las familias olfativas explicadas</h3>
                <p>Qué es cada familia y cómo reconocerla en un perfume…</p>
              </Link>
              <Link href="/notas" className="tile">
                <h3>Índice de notas</h3>
                <p>Explora los perfumes por cada nota: cítricos, maderas…</p>
              </Link>
              <Link href="/mejores" className="tile">
                <h3>Mejores perfumes por categoría</h3>
                <p>Listas curadas por género, temporada, ocasión y precio…</p>
              </Link>
              <Link href="/buscar" className="tile">
                <h3>Buscador de perfumes</h3>
                <p>Filtra por nota, familia, marca, género y precio…</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
