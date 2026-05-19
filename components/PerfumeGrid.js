import PerfumeCard from "./PerfumeCard";

export default function PerfumeGrid({ perfumes }) {
  if (!perfumes || perfumes.length === 0) {
    return (
      <div className="empty-state">
        <p>No se han encontrado perfumes con esos criterios.</p>
      </div>
    );
  }
  return (
    <div className="perfume-grid">
      {perfumes.map((p) => (
        <PerfumeCard key={p.slug} perfume={p} />
      ))}
    </div>
  );
}
