import PerfumeBottle from "./PerfumeBottle";
import { familyTheme } from "@/lib/data";

function wikiUrl(perfume) {
  if (!perfume.imageSource || !perfume.imageTitle) return null;
  const m = perfume.imageSource.match(/\(([a-z]+)\)/);
  const lang = m ? m[1] : "en";
  const title = encodeURIComponent(perfume.imageTitle.replace(/ /g, "_"));
  return `https://${lang}.wikipedia.org/wiki/${title}`;
}

export default function PerfumeImage({ perfume, variant = "card" }) {
  const cls = variant === "detail" ? "detail-visual" : "card-visual";

  if (perfume.image) {
    const visual = (
      <div className={`${cls} has-photo`}>
        <img
          src={perfume.image}
          alt={`Foto del perfume ${perfume.name} de ${perfume.brand}`}
          loading="lazy"
        />
      </div>
    );

    if (variant === "detail" && perfume.imageSource) {
      const href = wikiUrl(perfume);
      return (
        <div>
          {visual}
          <p className="image-attribution">
            Foto:{" "}
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
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

  const theme = familyTheme(perfume.family);
  return (
    <div
      className={cls}
      style={{
        background: `linear-gradient(150deg, ${theme.bg1}, ${theme.bg2})`,
      }}
    >
      <PerfumeBottle perfume={perfume} variant={variant} />
    </div>
  );
}
