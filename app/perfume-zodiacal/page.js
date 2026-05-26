import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ZODIAC } from "@/lib/zodiac";
import { SITE_URL, SITE_NAME } from "@/lib/data";

export const metadata = {
  title: "¿Qué perfume eres según tu signo zodiacal? Test 2026",
  description:
    "Descubre tu perfume ideal según tu signo zodiacal: 12 perfiles únicos con 6 perfumes recomendados, familias olfativas y notas que conectan con cada signo.",
  alternates: { canonical: "/perfume-zodiacal" },
  openGraph: {
    title: "¿Qué perfume eres según tu signo zodiacal? | Olfativa",
    description:
      "12 signos, 72 perfumes recomendados. Descubre el perfume que conecta con tu energía astrológica.",
    url: `${SITE_URL}/perfume-zodiacal`,
    type: "article"
  }
};

export default function ZodiacIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Perfumes por signo zodiacal",
    description:
      "12 perfiles olfativos por signo del zodiaco con recomendaciones de perfumes",
    numberOfItems: 12,
    itemListElement: ZODIAC.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Perfume para ${s.name}`,
      url: `${SITE_URL}/perfume-zodiacal/${s.slug}`
    }))
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo se elige un perfume según el signo zodiacal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cada signo astrológico tiene un elemento (fuego, tierra, aire, agua) y unos rasgos de personalidad que conectan con familias olfativas concretas. Aries y Leo, signos de fuego, encajan con orientales especiados; Tauro y Virgo, de tierra, con amaderados y gourmand cremosos; Géminis, Libra y Acuario, de aire, con cítricos verdes y florales ligeros; Cáncer, Escorpio y Piscis, de agua, con almizcles blancos, oud profundo y acuáticos místicos."
        }
      },
      {
        "@type": "Question",
        name: "¿Funciona realmente elegir un perfume por signo zodiacal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Es una guía orientativa basada en arquetipos psicológicos, no en ciencia. Pero funciona porque los rasgos asociados a cada signo coinciden con preferencias olfativas reales: personas extrovertidas tienden a buscar perfumes con proyección, introvertidas prefieren skin scents, etc. Es una forma divertida de descubrir nuevos perfumes desde una perspectiva distinta."
        }
      },
      {
        "@type": "Question",
        name: "¿Qué perfume es para signos de fuego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aries, Leo y Sagitario son signos de fuego. Conectan con perfumes intensos, especiados y proyectivos: orientales con canela y oud, fougère ardientes, ámbar con pimienta, florales blancos opulentos. Buscan presencia y dejar estela. Ejemplos: Tom Ford Tobacco Vanille, Creed Aventus, MFK Baccarat Rouge 540."
        }
      },
      {
        "@type": "Question",
        name: "¿Y los signos de agua?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cáncer, Escorpio y Piscis son de agua. Cáncer ama los almizcles blancos íntimos y los skin scents; Escorpio busca oud, cuero e incienso oscuro; Piscis prefiere acuáticos, florales etéreos e incienso místico. Comparten profundidad emocional pero la expresan de forma muy distinta."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              { label: "Perfume zodiacal", href: "/perfume-zodiacal" }
            ]}
          />

          <div className="zodiac-hero">
            <span className="emoji-big">♈♉♊♋♌♍♎♏♐♑♒♓</span>
            <h1>¿Qué perfume eres según tu signo zodiacal?</h1>
            <p style={{ maxWidth: 640, margin: "12px auto 0" }}>
              12 perfiles olfativos únicos basados en tu signo astrológico, con
              <strong> 6 perfumes recomendados</strong> por signo, familias
              olfativas que conectan con tu energía y notas clave que harán que
              tu fragancia te represente de verdad.
            </p>
          </div>

          <div className="zodiac-grid">
            {ZODIAC.map((s) => (
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

          <div className="section-head" style={{ marginTop: 40 }}>
            <h2>¿Cómo funciona esto?</h2>
          </div>
          <p style={{ maxWidth: 780 }}>
            Cada signo del zodiaco tiene un elemento (<strong>fuego, tierra,
            aire o agua</strong>), un planeta regente y un perfil psicológico
            asociado. Estos rasgos conectan de forma natural con familias
            olfativas concretas: los signos de fuego buscan perfumes especiados
            e intensos; los de tierra prefieren gourmand cremosos y amaderados
            cálidos; los de aire conectan con cítricos verdes y florales
            ligeros; los de agua prefieren almizcles blancos, oud profundo o
            acuáticos místicos.
          </p>
          <p style={{ maxWidth: 780 }}>
            En cada página de signo encontrarás tu <strong>perfil olfativo
            completo</strong>, los aromas que más conectan con tu energía y una
            selección curada de <strong>6 perfumes reales del catálogo</strong>
            que encajan contigo (gama asequible, diseñador y nicho).
          </p>

          <div className="section-head" style={{ marginTop: 40 }}>
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="faq-list" style={{ maxWidth: 820 }}>
            <details className="faq-item" open>
              <summary>¿Funciona realmente elegir perfume por signo zodiacal?</summary>
              <div className="faq-answer">
                <p>
                  Es una guía orientativa basada en arquetipos psicológicos, no
                  en ciencia. Pero funciona sorprendentemente bien porque los
                  rasgos asociados a cada signo coinciden con preferencias
                  olfativas reales: personas extrovertidas buscan perfumes con
                  proyección, introvertidas prefieren skin scents, etc. Es una
                  forma divertida de explorar fragancias desde una perspectiva
                  distinta.
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary>¿Y si tengo varios signos importantes en mi carta?</summary>
              <div className="faq-answer">
                <p>
                  Si conoces tu carta astral completa, tu signo solar marca tu
                  identidad central, pero el ascendente influye en tu primera
                  impresión y el lunar en tu intimidad. Lo ideal: mira tu solar
                  para el perfume diario, tu ascendente para perfumes de
                  oficina/social, y tu lunar para perfumes íntimos de noche.
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary>¿Puedo combinar varios perfumes según signo?</summary>
              <div className="faq-answer">
                <p>
                  Sí. Muchas personas tienen un perfume diario (signo solar)
                  y otro de noche o íntimo (signo lunar). Otra opción es hacer
                  layering: combinar dos perfumes de tu paleta zodiacal para
                  crear tu firma personal única.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
