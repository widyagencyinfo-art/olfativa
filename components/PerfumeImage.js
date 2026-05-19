import PerfumeBottle from "./PerfumeBottle";
import { familyTheme } from "@/lib/data";

export default function PerfumeImage({ perfume, variant = "card" }) {
  const cls = variant === "detail" ? "detail-visual" : "card-visual";

  if (perfume.image) {
    return (
      <div className={`${cls} has-photo`}>
        <img
          src={perfume.image}
          alt={`Perfume ${perfume.name} de ${perfume.brand}`}
          loading="lazy"
        />
      </div>
    );
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
