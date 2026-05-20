import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPerfumes, SITE_NAME } from "@/lib/data";
import { GUIDES } from "@/lib/guides";

export const metadata = {
  title: "Sobre Olfativa",
  description:
    "Quiénes somos en Olfativa: una enciclopedia de perfumes en español con fichas, guías, comparativas y alternativas. Editorial independiente.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  const perfumes = getAllPerfumes();

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/sobre", label: "Sobre Olfativa" },
        ]}
      />
      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Sobre nosotros</span>
            <h1>Sobre Olfativa</h1>
            <p className="guide-lead">
              Olfativa es una enciclopedia independiente de perfumes en
              español. Nuestro objetivo: que cualquier persona, desde el que
              entra por primera vez a una perfumería hasta el coleccionista
              veterano, tenga un sitio claro, riguroso y bonito donde
              entenderlo todo sobre los perfumes.
            </p>
          </header>

          <section className="guide-section">
            <h2>Qué encontrarás en {SITE_NAME}</h2>
            <p>
              Más de <strong>{perfumes.length} perfumes</strong> con fichas
              detalladas: notas de salida, corazón y fondo, perfil olfativo,
              precio orientativo, perfumista, año, género, mejor temporada y
              ocasiones para usarlo. Cada ficha incluye también su historia y
              perfumes similares para que descubras cosas nuevas.
            </p>
            <p>
              Además de las fichas individuales tenemos:
            </p>
            <ul style={{ paddingLeft: "22px", marginBottom: "14px" }}>
              <li>
                <Link href="/comparativas">Comparativas</Link> entre perfumes
                parecidos (Sauvage vs Bleu de Chanel, Aventus vs Layton…).
              </li>
              <li>
                <Link href="/alternativas/creed-aventus">
                  Alternativas
                </Link>{" "}
                a cada perfume y{" "}
                <Link href="/clones">páginas de clones baratos</Link> de los
                grandes nicho.
              </li>
              <li>
                <Link href="/mejores">Listas curadas</Link> de los mejores
                perfumes por género, temporada, familia y ocasión.
              </li>
              <li>
                <Link href="/guias">{GUIDES.length} guías</Link> sobre cómo
                aplicar perfume, conservación, familias olfativas, diferencia
                entre EDP y EDT, decants y más.
              </li>
              <li>
                Un foro de comentarios en cada perfume para compartir
                experiencias.
              </li>
            </ul>
          </section>

          <section className="guide-section">
            <h2>Cómo trabajamos</h2>
            <p>
              <strong>Independencia editorial</strong>: las opiniones, los
              veredictos en las páginas de clones y las listas se basan en
              criterios olfativos y de calidad/precio, no en quién paga más.
              Las marcas no influyen en las puntuaciones ni en las
              recomendaciones.
            </p>
            <p>
              <strong>Datos y precios</strong>: notas y composiciones se
              recogen de fuentes públicas (fichas oficiales de las marcas,
              perfumistas, bases de datos como Fragrantica) y los precios son
              orientativos de mercado español. Pueden variar según la tienda
              y el momento.
            </p>
            <p>
              <strong>Afiliación honesta</strong>: en algunas fichas y páginas
              de clones hay enlaces a tiendas como Amazon, Notino o Druni. Si
              compras a través de ellos, Olfativa puede recibir una comisión
              sin coste adicional para ti. Esa pequeña comisión es lo que
              mantiene el sitio en marcha y sin publicidad invasiva. Más
              detalles en{" "}
              <Link href="/divulgacion-afiliados">divulgación de afiliados</Link>.
            </p>
          </section>

          <section className="guide-section">
            <h2>Contacto</h2>
            <p>
              ¿Tienes una sugerencia, una corrección, quieres proponer un
              perfume nuevo para el catálogo o eres una marca? Escríbenos.
              Leemos todos los correos.
            </p>
            <p>
              Email:{" "}
              <a href="mailto:contacto@olfativa.es">contacto@olfativa.es</a>
            </p>
          </section>

          <section className="guide-section">
            <h2>Información legal</h2>
            <p>
              Olfativa es un sitio independiente. Datos del titular,
              tratamiento de datos personales, cookies y política de
              afiliados disponibles en sus páginas correspondientes:
            </p>
            <ul style={{ paddingLeft: "22px", marginBottom: "14px" }}>
              <li>
                <Link href="/aviso-legal">Aviso legal</Link>
              </li>
              <li>
                <Link href="/politica-privacidad">Política de privacidad</Link>
              </li>
              <li>
                <Link href="/politica-cookies">Política de cookies</Link>
              </li>
              <li>
                <Link href="/divulgacion-afiliados">
                  Divulgación de enlaces de afiliados
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </>
  );
}
