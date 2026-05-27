"use client";

import { useState } from "react";
import PerfumeBottle from "./PerfumeBottle";
import { familyTheme, SITE_URL } from "@/lib/data";

function sourceUrl(perfume) {
  if (!perfume.imageSource) return null;
  if (/Wikipedia/i.test(perfume.imageSource) && perfume.imageTitle) {
    const m = perfume.imageSource.match(/\(([a-z]+)\)/);
    const lang = m ? m[1] : "en";
    const title = encodeURIComponent(perfume.imageTitle.replace(/ /g, "_"));
    return `https://${lang}.wikipedia.org/wiki/${title}`;
  }
  if (/Wikimedia/i.test(perfume.imageSource) && perfume.imageTitle) {
    const title = encodeURIComponent(perfume.imageTitle.replace(/ /g, "_"));
    return `https://commons.wikimedia.org/wiki/${title}`;
  }
  return null;
}

export default function PerfumeImage({ perfume, variant = "card" }) {
  const cls = variant === "detail" ? "detail-visual" : "card-visual";
  const [failed, setFailed] = useState(false);
  const theme = familyTheme(perfume.family);

  // Si tenemos imagen real del frasco y no ha fallado al cargar
  if (perfume.image && !failed) {
    const visual = (
      <div
        className={`${cls} has-photo`}
        style={{
          background: `linear-gradient(150deg, ${theme.bg1}, ${theme.bg2})`
        }}
      >
        <img
          src={perfume.image}
          alt={`Foto del perfume ${perfume.name} de ${perfume.brand}`}
          loading="lazy"
          onError={() => setFailed(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );

    if (variant === "detail" && perfume.imageSource) {
      const href = sourceUrl(perfume);
      return (
        <div>
          {visual}
          <p className="image-attribution">
            Foto:{" "}
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer nofollow">
                {perfume.imageSource}
              </a>
            ) : (
              perfume.imageSource
            )}
          </p>
        </div>
      );
    }
    return visual;
  }

  // Fallback en pagina de detalle: OG image dinamica generada por nosotros
  if (variant === "detail") {
    return (
      <div
        className={`${cls} has-photo`}
        style={{
          background: `linear-gradient(150deg, ${theme.bg1}, ${theme.bg2})`
        }}
      >
        <img
          src={`${SITE_URL}/perfumes/${perfume.slug}/opengraph-image`}
          alt={`${perfume.name} ${perfume.brand}`}
          loading="lazy"
        />
      </div>
    );
  }

  // Cards sin imagen: SVG bottle estilizado con paleta de la familia
  return (
    <div
      className={cls}
      style={{
        background: `linear-gradient(150deg, ${theme.bg1}, ${theme.bg2})`
      }}
    >
      <PerfumeBottle perfume={perfume} variant={variant} />
    </div>
  );
}
