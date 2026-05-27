"use client";

import { useEffect, useState } from "react";
import { TELEGRAM_CHANNEL_URL } from "@/lib/data";

const DISMISS_KEY = "olfativa_telegram_dismissed";

// Banner sticky discreto que aparece tras 8 segundos en cualquier
// pagina. Convierte trafico organico SEO en suscriptores del canal
// de Telegram. Si el usuario lo cierra, se respeta 30 dias.
export default function TelegramCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    try {
      const dismissed = localStorage.getItem(DISMISS_KEY);
      if (dismissed) {
        const stamp = parseInt(dismissed, 10);
        if (!isNaN(stamp) && Date.now() - stamp < 30 * 24 * 60 * 60 * 1000) {
          return;
        }
      }
    } catch (e) {
      // localStorage no disponible
    }
    timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch (e) {
      //
    }
  }

  if (!visible) return null;

  return (
    <div className="tg-cta" role="complementary" aria-label="Suscríbete a Telegram">
      <div className="tg-cta-inner">
        <span className="tg-cta-emoji" aria-hidden="true">📨</span>
        <div className="tg-cta-text">
          <strong>1 perfume al día gratis</strong>
          <span>en nuestro canal de Telegram</span>
        </div>
        <a
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener"
          className="tg-cta-btn"
          onClick={dismiss}
        >
          Unirme
        </a>
        <button
          type="button"
          className="tg-cta-close"
          onClick={dismiss}
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  );
}
