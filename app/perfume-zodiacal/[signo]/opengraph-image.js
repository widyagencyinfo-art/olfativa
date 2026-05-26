import { ImageResponse } from "next/og";
import { ZODIAC } from "@/lib/zodiac";

export const runtime = "edge";
export const alt = "Perfume zodiacal Olfativa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mapa de colores por elemento. Hace que cada compartido en
// WhatsApp/Twitter/Instagram salga con paleta coherente con el signo.
const ELEMENT_THEMES = {
  Fuego: { bg1: "#3a1010", bg2: "#7a2020", accent: "#ff6b35", text: "#fff" },
  Tierra: { bg1: "#2d2418", bg2: "#5c4a30", accent: "#d4a574", text: "#fff" },
  Aire: { bg1: "#16344a", bg2: "#3a6ea0", accent: "#a8d8ff", text: "#fff" },
  Agua: { bg1: "#0e2942", bg2: "#1f5070", accent: "#7ec9d0", text: "#fff" }
};

export default async function og({ params }) {
  const { signo } = await params;
  const sign = ZODIAC.find((s) => s.slug === signo);
  if (!sign) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#1a1410",
            color: "#f5ede0",
            fontSize: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          Olfativa.es
        </div>
      ),
      size
    );
  }

  const theme = ELEMENT_THEMES[sign.element] || ELEMENT_THEMES.Fuego;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(135deg, ${theme.bg1} 0%, ${theme.bg2} 100%)`,
          padding: "60px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: theme.text,
          position: "relative"
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "14px",
            background: theme.accent,
            display: "flex"
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 28,
            color: theme.accent,
            letterSpacing: "6px",
            textTransform: "uppercase",
            fontWeight: 700,
            display: "flex"
          }}
        >
          Perfume zodiacal
        </div>

        {/* Big emoji + name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            marginTop: "30px"
          }}
        >
          <div style={{ fontSize: 200, lineHeight: 1, display: "flex" }}>
            {sign.emoji}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 110,
                fontWeight: 900,
                lineHeight: 1,
                color: "#fff",
                display: "flex"
              }}
            >
              {sign.name}
            </div>
            <div
              style={{
                fontSize: 30,
                color: theme.accent,
                marginTop: 14,
                display: "flex"
              }}
            >
              {sign.dates}
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            marginTop: "auto",
            marginBottom: "30px",
            flexWrap: "wrap"
          }}
        >
          {sign.keywords.slice(0, 4).map((k) => (
            <div
              key={k}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: `1px solid ${theme.accent}40`,
                color: "#fff",
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: 26,
                fontWeight: 600,
                display: "flex",
                textTransform: "capitalize"
              }}
            >
              {k}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${theme.accent}40`,
            paddingTop: "22px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px"
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "#9c7a4d",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 38,
                fontWeight: 800
              }}
            >
              O
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#fff",
                display: "flex"
              }}
            >
              Olfativa.es
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: theme.accent,
              display: "flex"
            }}
          >
            6 perfumes para {sign.name} →
          </div>
        </div>
      </div>
    ),
    size
  );
}
