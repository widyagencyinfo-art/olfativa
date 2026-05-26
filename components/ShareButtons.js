"use client";

import { useState } from "react";

// Botones de compartir nativos (no requieren librerias externas). Pensados
// para maximizar viralidad organica del quiz zodiacal y otras paginas
// virales internas.
export default function ShareButtons({ url, text }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = url.startsWith("http") ? url : `https://olfativa.es${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedText = encodeURIComponent(text);

  const links = [
    {
      label: "WhatsApp",
      bg: "#25D366",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    },
    {
      label: "X / Twitter",
      bg: "#000",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    },
    {
      label: "Facebook",
      bg: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      label: "Telegram",
      bg: "#0088cc",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    }
  ];

  function copyLink() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className="share-row">
      <span className="share-label">Comparte:</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="share-btn"
          style={{ background: l.bg }}
        >
          {l.label}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="share-btn"
        style={{
          background: copied ? "#2c7d4f" : "#444",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontFamily: "inherit"
        }}
      >
        {copied ? "✓ Copiado" : "Copiar link"}
      </button>
    </div>
  );
}
