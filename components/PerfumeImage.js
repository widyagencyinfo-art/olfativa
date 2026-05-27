import PerfumeBottle from "./PerfumeBottle";
import { familyTheme } from "@/lib/data";

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
  const theme = familyTheme(perfume.family);

  if (perfume.image) {
    const isLocal = perfume.image.startsWith("/");
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
          loading={variant === "detail" ? "eager" : "lazy"}
          decoding="async"
          {...(!isLocal && { referrerPolicy: "no-referrer" })}
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

  // Sin imagen: fondo gradient + SVG bottle estilizado
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
