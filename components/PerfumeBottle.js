import { familyTheme, concentrationShort } from "@/lib/data";

export default function PerfumeBottle({ perfume, variant = "card" }) {
  const theme = familyTheme(perfume.family);
  const id = perfume.slug;

  const name = perfume.name;
  const nameLen = name.length;
  const nameSize = nameLen > 16 ? 13 : nameLen > 10 ? 15 : 18;
  const nameWidth = Math.min(nameLen * nameSize * 0.56, 84);

  const brand = perfume.brand.toUpperCase();
  const brandWidth = Math.min(brand.length * 9 * 0.6, 84);

  const conc = concentrationShort(perfume.concentration).toUpperCase();

  return (
    <svg
      viewBox="0 0 200 300"
      role="img"
      aria-label={`Ilustración del perfume ${perfume.name} de ${perfume.brand}`}
      style={{
        height: "100%",
        width: "auto",
        maxWidth: "100%",
        display: "block",
      }}
    >
      <defs>
        <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.liquid} stopOpacity="0.55" />
          <stop offset="55%" stopColor={theme.liquid} stopOpacity="0.92" />
          <stop offset="100%" stopColor={theme.dark} />
        </linearGradient>
        <clipPath id={`body-${id}`}>
          <rect x="42" y="60" width="116" height="218" rx="18" />
        </clipPath>
      </defs>

      {/* sombra */}
      <ellipse cx="100" cy="284" rx="62" ry="9" fill="rgba(0,0,0,0.13)" />

      {/* tapón y cuello */}
      <rect x="80" y="16" width="40" height="32" rx="6" fill={theme.dark} />
      <rect x="86" y="44" width="28" height="20" fill={theme.dark} opacity="0.85" />

      {/* cuerpo del frasco */}
      <rect
        x="42"
        y="60"
        width="116"
        height="218"
        rx="18"
        fill={`url(#glass-${id})`}
        stroke={theme.dark}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* líquido inferior */}
      <g clipPath={`url(#body-${id})`}>
        <rect x="42" y="196" width="116" height="82" fill={theme.dark} opacity="0.35" />
      </g>

      {/* reflejo */}
      <rect
        x="56"
        y="74"
        width="16"
        height="150"
        rx="8"
        fill="#ffffff"
        opacity="0.3"
      />

      {/* etiqueta */}
      <rect
        x="52"
        y="138"
        width="96"
        height="108"
        rx="9"
        fill="#fbf8f1"
        stroke="rgba(0,0,0,0.08)"
      />

      <text
        x="100"
        y="166"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="9"
        fontWeight="700"
        letterSpacing="1"
        fill={theme.dark}
        textLength={brandWidth}
        lengthAdjust="spacingAndGlyphs"
      >
        {brand}
      </text>

      <line
        x1="78"
        y1="174"
        x2="122"
        y2="174"
        stroke={theme.liquid}
        strokeWidth="1"
        opacity="0.6"
      />

      <text
        x="100"
        y="198"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={nameSize}
        fontWeight="600"
        fill="#2a2620"
        textLength={nameWidth}
        lengthAdjust="spacingAndGlyphs"
      >
        {name}
      </text>

      <text
        x="100"
        y="222"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="7.5"
        letterSpacing="1.5"
        fill="#6b6358"
      >
        {conc}
      </text>
    </svg>
  );
}
