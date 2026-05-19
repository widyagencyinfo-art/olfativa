export default function PerfumeImage({ perfume, variant = "card" }) {
  const cls = variant === "detail" ? "detail-visual" : "card-visual";
  const bottle = variant === "detail" ? "detail-bottle" : "card-bottle";

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

  return (
    <div className={cls}>
      <div className={bottle} />
    </div>
  );
}
