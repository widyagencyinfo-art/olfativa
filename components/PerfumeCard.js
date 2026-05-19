import Link from "next/link";
import PerfumeImage from "./PerfumeImage";
import { genderLabel, formatPrice } from "@/lib/data";

export default function PerfumeCard({ perfume }) {
  return (
    <article className="perfume-card">
      <Link href={`/perfumes/${perfume.slug}`} aria-label={perfume.name}>
        <PerfumeImage perfume={perfume} variant="card" />
      </Link>
      <div className="card-body">
        <span className="card-brand">{perfume.brand}</span>
        <h3 className="card-name">
          <Link href={`/perfumes/${perfume.slug}`}>{perfume.name}</Link>
        </h3>
        <p className="card-meta">
          {perfume.family} · {genderLabel(perfume.gender)}
        </p>
        <div className="card-foot">
          <span className="card-price">{formatPrice(perfume)}</span>
          <span className="rating">★ {perfume.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
