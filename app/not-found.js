import Link from "next/link";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
      <span className="eyebrow">Error 404</span>
      <h1 style={{ fontSize: "2.4rem", margin: "10px 0 14px" }}>
        Esta fragancia se ha evaporado
      </h1>
      <p style={{ color: "var(--text-soft)", marginBottom: "26px" }}>
        No hemos encontrado la página que buscabas.
      </p>
      <Link href="/" className="btn">
        Volver al inicio
      </Link>
    </div>
  );
}
