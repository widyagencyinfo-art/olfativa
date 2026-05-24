import { ImageResponse } from "next/og";
import {
  getPerfumeBySlug,
  familyTheme,
  concentrationShort,
  formatPrice,
  genderLabel,
} from "@/lib/data";

export const runtime = "edge";
export const alt = "Olfativa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function og({ params }) {
  const { slug } = await params;
  const perfume = getPerfumeBySlug(slug);
  if (!perfume) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1a1410",
            color: "#f5ede0",
            fontSize: 60,
          }}
        >
          Olfativa.es
        </div>
      ),
      size
    );
  }

  const theme = familyTheme(perfume.family);
  const conc = concentrationShort(perfume.concentration);
  const price = formatPrice(perfume);
  const gender = genderLabel(perfume.gender);
  const topNotes = perfume.notes.top.slice(0, 4).join(" · ");

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
          position: "relative",
        }}
      >
        {/* Liquid accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "14px",
            background: theme.liquid,
            display: "flex",
          }}
        />

        {/* Brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: theme.dark,
              textTransform: "uppercase",
              letterSpacing: "4px",
            }}
          >
            {perfume.brand}
          </div>
          <div
            style={{
              fontSize: 24,
              color: theme.dark,
              fontWeight: 600,
              background: "rgba(255,255,255,0.55)",
              padding: "8px 20px",
              borderRadius: "999px",
              display: "flex",
            }}
          >
            {conc} · {perfume.year}
          </div>
        </div>

        {/* Perfume name */}
        <div
          style={{
            fontSize: perfume.name.length > 30 ? 72 : 96,
            fontWeight: 800,
            color: "#1a1410",
            lineHeight: 1.05,
            marginBottom: "30px",
            display: "flex",
            maxWidth: "1080px",
          }}
        >
          {perfume.name}
        </div>

        {/* Family + gender */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#fff",
              background: theme.liquid,
              padding: "10px 24px",
              borderRadius: "999px",
              fontWeight: 600,
              display: "flex",
            }}
          >
            {perfume.family}
          </div>
          <div
            style={{
              fontSize: 28,
              color: theme.dark,
              background: "rgba(255,255,255,0.7)",
              padding: "10px 24px",
              borderRadius: "999px",
              fontWeight: 600,
              display: "flex",
            }}
          >
            {gender}
          </div>
        </div>

        {/* Top notes */}
        <div
          style={{
            fontSize: 26,
            color: theme.dark,
            opacity: 0.9,
            marginBottom: "auto",
            display: "flex",
          }}
        >
          Salida: {topNotes}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${theme.dark}40`,
            paddingTop: "24px",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "#9c7a4d",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 36,
                fontWeight: 800,
              }}
            >
              O
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "#1a1410",
                display: "flex",
              }}
            >
              Olfativa.es
            </div>
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: theme.dark,
              display: "flex",
            }}
          >
            {price}
          </div>
        </div>
      </div>
    ),
    size
  );
}
