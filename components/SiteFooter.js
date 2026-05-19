import Link from "next/link";
import { getBrands, getGenders, getSeasons, SITE_NAME } from "@/lib/data";

export default function SiteFooter() {
  const brands = getBrands().slice(0, 6);
  const genders = getGenders();
  const seasons = getSeasons();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: "10px" }}>
              Olfa<span>tiva</span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-soft)" }}>
              La enciclopedia de perfumes. Notas, perfil olfativo, precio,
              historia y la mejor época del año para llevar cada fragancia.
            </p>
          </div>
          <div>
            <h4>Explorar</h4>
            <ul>
              <li><Link href="/perfumes">Todos los perfumes</Link></li>
              <li><Link href="/marcas">Marcas</Link></li>
              <li><Link href="/notas">Notas olfativas</Link></li>
              <li><Link href="/buscar">Buscador avanzado</Link></li>
            </ul>
          </div>
          <div>
            <h4>Por género</h4>
            <ul>
              {genders.map((g) => (
                <li key={g.slug}>
                  <Link href={`/genero/${g.slug}`}>Perfumes de {g.name.toLowerCase()}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Por temporada</h4>
            <ul>
              {seasons.map((s) => (
                <li key={s.slug}>
                  <Link href={`/temporada/${s.slug}`}>Perfumes de {s.name.toLowerCase()}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {SITE_NAME}. Información orientativa con
          fines divulgativos. Los precios y notas pueden variar según el
          mercado.
        </div>
      </div>
    </footer>
  );
}
