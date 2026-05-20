import Breadcrumbs from "@/components/Breadcrumbs";
import { LEGAL } from "@/lib/legal";
import { SITE_NAME } from "@/lib/data";

export const metadata = {
  title: "Divulgación de enlaces de afiliados",
  description:
    "En qué consiste el modelo de afiliación de Olfativa, qué programas usa y cómo afecta a las recomendaciones.",
  alternates: { canonical: "/divulgacion-afiliados" },
};

export default function AfiliadosPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          {
            href: "/divulgacion-afiliados",
            label: "Divulgación de afiliados",
          },
        ]}
      />
      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Información legal</span>
            <h1>Divulgación de enlaces de afiliados</h1>
            <p className="guide-lead">
              {SITE_NAME} mantiene su independencia editorial y ofrece todo
              su contenido de forma gratuita gracias, en parte, a los
              ingresos generados por enlaces de afiliación. Esta página
              explica con total transparencia cómo funciona.
            </p>
          </header>

          <section className="guide-section">
            <h2>Qué son los enlaces de afiliados</h2>
            <p>
              Un enlace de afiliado es un enlace especial a una tienda
              online que incluye un identificador único. Si compras a través
              de él, la tienda paga a {SITE_NAME} una pequeña comisión sobre
              la venta. <strong>Tú no pagas nada extra</strong>: el precio es
              exactamente el mismo que si entrases directamente a la tienda.
            </p>
          </section>

          <section className="guide-section">
            <h2>Programas en los que participamos</h2>
            <p>
              {SITE_NAME} participa o tiene previsto participar en los
              siguientes programas:
            </p>
            <ul style={{ paddingLeft: "22px" }}>
              <li>
                <strong>Programa de Afiliados de Amazon España</strong>{" "}
                (Amazon.es). Como Asociado de Amazon, {SITE_NAME} recibe
                ingresos por compras adscritas que cumplan los requisitos
                aplicables.
              </li>
              <li>
                <strong>Notino</strong> (vía Awin u otra red de afiliación).
              </li>
              <li>
                <strong>Druni</strong> y otras perfumerías online que
                ofrezcan programa de afiliación.
              </li>
            </ul>
          </section>

          <section className="guide-section">
            <h2>Cómo identificamos los enlaces afiliados</h2>
            <p>
              Los enlaces de afiliación se encuentran principalmente en el
              bloque <em>"¿Dónde comprar?"</em> que aparece en las fichas de
              perfume y en las páginas de clones. Incluyen el atributo{" "}
              <code>rel="sponsored"</code> según las directrices de Google
              para enlaces patrocinados.
            </p>
            <p>
              Los enlaces internos entre páginas de {SITE_NAME} y los enlaces
              a fuentes informativas externas (Wikipedia, marcas, sitios
              oficiales) <strong>no son enlaces de afiliación</strong>.
            </p>
          </section>

          <section className="guide-section">
            <h2>Cómo afecta a nuestras recomendaciones</h2>
            <p>
              <strong>No afecta.</strong> Las puntuaciones, las
              recomendaciones de las listas <em>"mejores perfumes"</em>, los
              veredictos en las páginas de clones y las opiniones sobre cada
              perfume se basan exclusivamente en criterios olfativos, de
              calidad y de relación calidad-precio.
            </p>
            <p>
              {SITE_NAME} no acepta pagos de marcas para mejorar la posición
              de un perfume en listas, ni para suprimir críticas. Si una
              marca quisiera colaborar en formato patrocinado, se etiquetaría
              claramente como <em>"Contenido patrocinado"</em> y se separaría
              del contenido editorial.
            </p>
          </section>

          <section className="guide-section">
            <h2>Tu privacidad al usar enlaces afiliados</h2>
            <p>
              Al pulsar un enlace de afiliado eres redirigido a la web de la
              tienda. Allí aplicarán sus propias cookies y políticas. {SITE_NAME}{" "}
              no recibe información personal sobre tu compra: solo los
              registros agregados que la plataforma de afiliación nos
              proporciona (número de clics y comisiones).
            </p>
            <p>
              Ver más en nuestra{" "}
              <a href="/politica-privacidad">política de privacidad</a> y{" "}
              <a href="/politica-cookies">política de cookies</a>.
            </p>
          </section>

          <section className="guide-section">
            <h2>Aviso obligatorio</h2>
            <p style={{ fontStyle: "italic", color: "var(--text-soft)" }}>
              {SITE_NAME} es participante en el Programa de Afiliados de
              Amazon Services LLC, un programa de publicidad para afiliados
              diseñado para proporcionar a los sitios un medio para ganar
              comisiones por publicidad mediante la publicidad y los enlaces
              a Amazon.es. Como Asociado de Amazon, obtenemos ingresos por
              compras adscritas que cumplan los requisitos aplicables.
            </p>
            <p>
              Si tienes cualquier duda sobre esta divulgación, escríbenos a{" "}
              <a href={`mailto:${LEGAL.ownerEmail}`}>{LEGAL.ownerEmail}</a>.
            </p>
            <p style={{ color: "var(--text-soft)", fontSize: "0.88rem" }}>
              Última actualización: {LEGAL.registrationDate}.
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
