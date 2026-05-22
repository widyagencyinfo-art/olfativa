import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { GLOSSARY, getGlossaryByLetter } from "@/lib/glossary";
import { slugify, SITE_URL, SITE_NAME } from "@/lib/data";

export const metadata = {
  title: "Glosario de perfumería: 60 términos explicados",
  description:
    "Diccionario de perfumería con 60+ términos: qué es el oud, sillage, sándalo, EDP vs EDT, chipre, fougère, ámbar gris, attar, decant y más. Definiciones cortas y claras.",
  alternates: { canonical: "/glosario" },
};

export default function GlosarioPage() {
  const grouped = getGlossaryByLetter();
  const letters = Object.keys(grouped).sort();

  const definedTermSetLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: `Glosario de perfumería de ${SITE_NAME}`,
    inLanguage: "es-ES",
    hasDefinedTerm: GLOSSARY.map((g) => ({
      "@type": "DefinedTerm",
      name: g.term,
      description: g.definition,
      inDefinedTermSet: `${SITE_URL}/glosario`,
      termCode: slugify(g.term),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/glosario", label: "Glosario" },
        ]}
      />
      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Diccionario de perfumería</span>
            <h1>Glosario de perfumería: {GLOSSARY.length} términos explicados</h1>
            <p className="guide-lead">
              ¿No sabes qué es el <strong>oud</strong>, qué significa{" "}
              <strong>sillage</strong>, en qué se diferencian <strong>EDP</strong>{" "}
              y <strong>EDT</strong> o por qué se habla de{" "}
              <strong>chipre</strong>? Este glosario reúne los {GLOSSARY.length}{" "}
              términos imprescindibles de la perfumería con definiciones cortas
              y claras. Ordenado alfabéticamente.
            </p>
          </header>

          <nav className="guide-toc" aria-label="Letras">
            <h2>Saltar a una letra</h2>
            <div className="chip-row">
              {letters.map((l) => (
                <a key={l} href={`#letra-${l}`} className="chip">
                  {l}
                </a>
              ))}
            </div>
          </nav>

          {letters.map((letter) => (
            <section
              key={letter}
              id={`letra-${letter}`}
              className="guide-section"
            >
              <h2>{letter}</h2>
              <dl className="glossary-list">
                {grouped[letter].map((entry) => (
                  <div
                    key={entry.term}
                    id={`term-${slugify(entry.term)}`}
                    className="glossary-entry"
                  >
                    <dt>{entry.term}</dt>
                    <dd>
                      <p>{entry.definition}</p>
                      {entry.related && entry.related.length > 0 && (
                        <p className="glossary-related">
                          {entry.related.map((slug, i) => {
                            const isPerfume =
                              !slug.startsWith("como-") &&
                              !slug.startsWith("diferencia-") &&
                              !slug.startsWith("familias-") &&
                              !slug.startsWith("notas-") &&
                              !slug.startsWith("decants-") &&
                              !slug.startsWith("sillage-") &&
                              !slug.startsWith("grandes-");
                            const href = isPerfume
                              ? `/perfumes/${slug}`
                              : `/guias/${slug}`;
                            return (
                              <span key={slug}>
                                {i > 0 && " · "}
                                <Link href={href}>
                                  {slug
                                    .replace(/-/g, " ")
                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                                </Link>
                              </span>
                            );
                          })}
                        </p>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <section className="guide-section">
            <h2>¿Quieres profundizar?</h2>
            <p>
              Si te interesa el mundo de la perfumería más allá de las
              definiciones, te recomendamos empezar por estas guías más
              completas:
            </p>
            <div className="chip-row">
              <Link href="/guias/familias-olfativas" className="chip">
                Las 7 familias olfativas
              </Link>
              <Link
                href="/guias/diferencia-edp-edt-edc-parfum"
                className="chip"
              >
                EDP vs EDT vs Parfum
              </Link>
              <Link href="/guias/notas-olfativas-piramide" className="chip">
                La pirámide olfativa
              </Link>
              <Link href="/guias/como-elegir-perfume" className="chip">
                Cómo elegir tu perfume
              </Link>
              <Link href="/guias/grandes-perfumistas" className="chip">
                Los grandes perfumistas
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
