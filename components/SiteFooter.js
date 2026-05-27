import Link from "next/link";
import {
  getBrands,
  getGenders,
  getSeasons,
  SITE_NAME,
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_CHANNEL_HANDLE,
} from "@/lib/data";

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
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 14,
                padding: "10px 16px",
                background: "#229ED9",
                color: "#fff",
                borderRadius: 999,
                fontSize: "0.88rem",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              📨 Telegram {TELEGRAM_CHANNEL_HANDLE}
            </a>
          </div>
          <div>
            <h4>Explorar</h4>
            <ul>
              <li><Link href="/perfumes">Todos los perfumes</Link></li>
              <li><Link href="/mejores">Mejores perfumes</Link></li>
              <li><Link href="/comparativas">Comparativas</Link></li>
              <li><Link href="/clones">Clones baratos</Link></li>
              <li><Link href="/guias">Guías de perfumería</Link></li>
              <li><Link href="/glosario">Glosario</Link></li>
              <li><Link href="/test/familia-olfativa">Test ¿Qué familia olfativa eres?</Link></li>
              <li><Link href="/perfume-zodiacal">Perfume zodiacal</Link></li>
              <li><Link href="/canal-telegram">Canal Telegram</Link></li>
              <li><Link href="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
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
        <nav className="footer-legal" aria-label="Información legal">
          <Link href="/sobre">Sobre Olfativa</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/politica-privacidad">Privacidad</Link>
          <Link href="/politica-cookies">Cookies</Link>
          <Link href="/divulgacion-afiliados">Afiliados</Link>
        </nav>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {SITE_NAME}. Información orientativa con
          fines divulgativos. Los precios y notas pueden variar según el
          mercado. Algunos enlaces son de afiliado.
        </div>
      </div>
    </footer>
  );
}
