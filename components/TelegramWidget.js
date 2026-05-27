// Widget que muestra los ultimos posts del canal de Telegram embebidos
// EN VIVO en olfativa.es. Cada visitante SEO ve el contenido del canal
// sin tener que salir, lo que dispara la conversion a suscriptor.
// Usa la pagina publica /s/ de Telegram que se puede iframear.
export default function TelegramWidget({
  channel = "olfativacomunidad",
  height = 600
}) {
  return (
    <div
      className="tg-widget-wrap"
      style={{
        margin: "20px 0",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-soft)"
      }}
    >
      <div
        style={{
          padding: "10px 16px",
          background: "#229ED9",
          color: "#fff",
          fontSize: "0.9rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <span>📨 Últimos posts del canal en vivo</span>
        <a
          href={`https://t.me/${channel}`}
          target="_blank"
          rel="noopener"
          style={{
            color: "#fff",
            fontSize: "0.82rem",
            textDecoration: "underline"
          }}
        >
          Suscribirse →
        </a>
      </div>
      <iframe
        src={`https://t.me/s/${channel}`}
        title={`Canal Telegram @${channel}`}
        style={{
          width: "100%",
          height: `${height}px`,
          border: "none",
          background: "#fff",
          display: "block"
        }}
        loading="lazy"
      />
    </div>
  );
}
