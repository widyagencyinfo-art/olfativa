import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import {
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_CHANNEL_NAME,
  TELEGRAM_CHANNEL_HANDLE,
  SITE_URL,
  SITE_NAME
} from "@/lib/data";

export const metadata = {
  title: "Canal de Telegram de Olfativa: 1 perfume al día gratis",
  description: `Únete al canal de Telegram ${TELEGRAM_CHANNEL_HANDLE}: recibe cada día el perfume del día, clones baratos, curiosidades olfativas y guías. Sin spam, sin algoritmo, gratis para siempre.`,
  alternates: { canonical: "/canal-telegram" },
  openGraph: {
    title: `Canal Telegram ${TELEGRAM_CHANNEL_NAME} | ${SITE_NAME}`,
    description:
      "1 perfume al día + clones baratos + curiosidades olfativas en tu Telegram. Gratis.",
    url: `${SITE_URL}/canal-telegram`,
    type: "website"
  }
};

const FAQ = [
  {
    q: "¿Qué publica el canal de Telegram de Olfativa?",
    a: "El canal publica cada día 2 contenidos rotativos del catálogo: por la mañana el perfume del día con sus notas, perfumista, año, duración, proyección y link a la ficha completa; por la tarde alternamos entre clones baratos de perfumes caros y curiosidades olfativas extraídas de nuestras guías. Sin spam, sin promos pagadas."
  },
  {
    q: "¿Cuánto cuesta suscribirse al canal?",
    a: "Es 100% gratis para siempre. No hay versión premium, no hay paywall, no se piden datos personales. Solo das tu @ de Telegram (o ni eso si te suscribes anónimamente como en cualquier canal público) y empiezas a recibir contenido."
  },
  {
    q: "¿Cómo se diferencia este canal de seguir Olfativa en redes?",
    a: "Telegram es un canal broadcast: no hay algoritmo, ves el 100% de lo que publicamos en orden cronológico. En Instagram, X o TikTok el algoritmo decide qué te muestra y normalmente pierdes la mitad. Telegram garantiza que llegan todos los perfumes del día y todos los clones."
  },
  {
    q: "¿Puedo darme de baja cuando quiera?",
    a: "Sí, igual que en cualquier canal de Telegram. Entras al canal, tocas el nombre arriba, eliges 'Abandonar canal' y desapareces. Sin preguntas, sin formularios, sin emails de recuperación."
  },
  {
    q: "¿Puedo recomendar perfumes para que aparezcan en el canal?",
    a: "Por ahora el canal publica automáticamente del catálogo (337 perfumes + 30 clones + 20 guías). Si quieres sugerir un perfume que no esté, escribe al foro de comentarios de cualquier ficha en olfativa.es y lo añadimos."
  }
];

export default function CanalTelegramPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="section">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Canal Telegram", href: "/canal-telegram" }
            ]}
          />

          <div
            style={{
              textAlign: "center",
              padding: "48px 24px 40px",
              background:
                "linear-gradient(135deg, #229ED9 0%, #1c87b8 100%)",
              borderRadius: 22,
              color: "#fff",
              marginBottom: 32,
              boxShadow: "0 10px 30px rgba(34,158,217,0.28)"
            }}
          >
            <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 10 }}>
              📨
            </div>
            <h1 style={{ color: "#fff", margin: "0 0 10px" }}>
              1 perfume al día gratis en tu Telegram
            </h1>
            <p
              style={{
                margin: "0 auto 26px",
                maxWidth: 600,
                fontSize: "1.06rem",
                opacity: 0.95
              }}
            >
              Únete al canal {TELEGRAM_CHANNEL_HANDLE} y recibe cada mañana
              el perfume del día, y cada tarde un clon barato o una
              curiosidad olfativa. Sin spam, sin algoritmo.
            </p>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener"
              className="btn"
              style={{
                background: "#fff",
                color: "#1c87b8",
                fontWeight: 700,
                fontSize: "1.04rem",
                padding: "14px 32px"
              }}
            >
              Suscribirme al canal →
            </a>
          </div>

          <ShareButtons
            url="/canal-telegram"
            text="📨 1 perfume al día gratis en este canal de Telegram"
          />

          <div className="section-head" style={{ marginTop: 36 }}>
            <h2>Qué publicamos cada día</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              marginBottom: 28
            }}
          >
            <div className="callout" style={{ padding: "20px 18px" }}>
              <h3 style={{ marginTop: 0 }}>🌸 09:00 — Perfume del día</h3>
              <p>
                Una ficha completa rotativa del catálogo: nombre, marca, año,
                perfumista, notas de salida, fondo, duración, proyección y
                link directo a la ficha completa con FAQ.
              </p>
            </div>
            <div className="callout" style={{ padding: "20px 18px" }}>
              <h3 style={{ marginTop: 0 }}>💰 19:00 — Clon del día</h3>
              <p>
                Cada dos días, el clon barato de un perfume caro: paga 1/10
                sin renunciar al aroma. Lattafa, Armaf, Maison Alhambra, Snif
                y demás joyas a 25-50€.
              </p>
            </div>
            <div className="callout" style={{ padding: "20px 18px" }}>
              <h3 style={{ marginTop: 0 }}>💡 19:00 — Curiosidad olfativa</h3>
              <p>
                Los otros días, un dato curioso extraído de nuestras guías:
                historia del perfume, ingredientes más caros, oud, ámbar gris,
                la nariz de los grandes perfumistas.
              </p>
            </div>
          </div>

          <div className="section-head" style={{ marginTop: 36 }}>
            <h2>Por qué Telegram y no Instagram o TikTok</h2>
          </div>
          <div style={{ maxWidth: 780 }}>
            <p>
              Las redes sociales con algoritmo (Instagram, TikTok, X) ocultan
              entre el 40% y el 80% de las publicaciones de las cuentas que
              sigues. Si seguimos a Olfativa en Instagram, probablemente
              perdemos la mitad de los perfumes del día.
            </p>
            <p>
              <strong>Telegram es un canal broadcast cronológico</strong>:
              recibes el 100% de lo que publicamos, en orden, sin algoritmo,
              sin anuncios intercalados, sin pop-ups. Notificación silenciosa
              opcional (la activas o no según prefieras).
            </p>
            <p>
              Además, las notificaciones de Telegram no compiten con WhatsApp
              ni con tu correo: es un espacio limpio para descubrir un
              perfume cada día sin distracciones.
            </p>
          </div>

          <div
            className="callout"
            style={{
              textAlign: "center",
              padding: "28px 24px",
              marginTop: 28
            }}
          >
            <h2 style={{ margin: "0 0 10px", fontSize: "1.3rem" }}>
              ¿Listo? Tarda 5 segundos
            </h2>
            <p style={{ marginBottom: 18, color: "var(--text-soft)" }}>
              Abre el canal, pulsa "JOIN" y listo. Recibes el primer
              perfume mañana a las 09:00.
            </p>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener"
              className="btn"
            >
              Unirme al canal {TELEGRAM_CHANNEL_HANDLE} →
            </a>
          </div>

          <div className="section-head" style={{ marginTop: 40 }}>
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="faq-list" style={{ maxWidth: 820 }}>
            {FAQ.map((q, i) => (
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
    </>
  );
}
