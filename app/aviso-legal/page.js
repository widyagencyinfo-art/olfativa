import Breadcrumbs from "@/components/Breadcrumbs";
import { LEGAL } from "@/lib/legal";
import { SITE_NAME, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Aviso legal",
  description:
    "Aviso legal de Olfativa según la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE).",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/aviso-legal", label: "Aviso legal" },
        ]}
      />
      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Información legal</span>
            <h1>Aviso legal</h1>
            <p className="guide-lead">
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios
              de la Sociedad de la Información y de Comercio Electrónico
              (LSSI-CE) se facilita la siguiente información sobre el titular
              del sitio web {SITE_NAME}.
            </p>
          </header>

          <section className="guide-section">
            <h2>1. Datos del titular</h2>
            <p>
              <strong>Titular:</strong> {LEGAL.ownerName}
              <br />
              <strong>{LEGAL.ownerIdType}:</strong> {LEGAL.ownerId}
              <br />
              <strong>Domicilio:</strong> {LEGAL.ownerAddress}
              <br />
              <strong>Correo electrónico:</strong>{" "}
              <a href={`mailto:${LEGAL.ownerEmail}`}>{LEGAL.ownerEmail}</a>
              <br />
              <strong>Sitio web:</strong>{" "}
              <a href={SITE_URL}>{SITE_URL}</a>
            </p>
          </section>

          <section className="guide-section">
            <h2>2. Objeto del sitio</h2>
            <p>
              {SITE_NAME} es una enciclopedia informativa sobre perfumes:
              ofrece fichas con notas olfativas, perfil, precio orientativo,
              historia y recomendaciones de uso; guías informativas;
              comparativas; alternativas; listas curadas; y un foro de
              comentarios. El contenido tiene fines divulgativos y orientativos.
            </p>
          </section>

          <section className="guide-section">
            <h2>3. Condiciones de uso</h2>
            <p>
              El acceso al sitio implica la aceptación de las presentes
              condiciones. El usuario se compromete a hacer un uso correcto
              del sitio, conforme a la ley, las buenas costumbres y el orden
              público, y no a utilizarlo con fines ilícitos o lesivos contra
              {" "}{SITE_NAME} o terceros.
            </p>
            <p>
              Los precios mostrados son orientativos y pueden variar según el
              vendedor y el momento de la consulta. Las notas, composiciones
              e información de cada perfume se basan en fuentes públicas y
              pueden contener errores; el usuario debe verificar la
              información oficial del fabricante antes de cualquier compra.
            </p>
          </section>

          <section className="guide-section">
            <h2>4. Propiedad intelectual e industrial</h2>
            <p>
              Los textos, redacciones, organización y selección de contenidos
              de {SITE_NAME} son obra del titular y están protegidos por las
              leyes de propiedad intelectual. Las marcas, nombres comerciales
              y logotipos de los perfumes y casas perfumeras citados son
              propiedad de sus respectivos titulares y se mencionan
              únicamente con fines descriptivos y de información al usuario,
              sin que ello implique vinculación, patrocinio o aprobación.
            </p>
            <p>
              Las imágenes provenientes de Wikipedia/Wikimedia Commons se
              utilizan bajo sus respectivas licencias y se acreditan en cada
              ficha. Las ilustraciones genéricas de frasco son obra del
              titular del sitio.
            </p>
          </section>

          <section className="guide-section">
            <h2>5. Enlaces</h2>
            <p>
              El sitio contiene enlaces a webs externas, algunos de los
              cuales son enlaces de afiliación (Amazon España, Notino, Druni
              y otros). Estos enlaces pueden generar comisiones para {SITE_NAME}
              {" "}sin coste adicional para el usuario. Más información en la{" "}
              <a href="/divulgacion-afiliados">divulgación de afiliados</a>.
            </p>
            <p>
              {SITE_NAME} no se responsabiliza del contenido, políticas o
              prácticas de las webs enlazadas, ni de las transacciones
              efectuadas en ellas.
            </p>
          </section>

          <section className="guide-section">
            <h2>6. Limitación de responsabilidad</h2>
            <p>
              {SITE_NAME} trabaja para mantener la información actualizada y
              veraz, pero no garantiza la ausencia de errores ni la
              actualización permanente de precios y disponibilidades. El
              titular no responde por daños derivados del uso de la
              información del sitio.
            </p>
            <p>
              El sitio puede sufrir interrupciones por mantenimiento, fallos
              técnicos o causas ajenas. Se hospeda en servidores de{" "}
              {LEGAL.hostingProvider} ({LEGAL.hostingAddress}).
            </p>
          </section>

          <section className="guide-section">
            <h2>7. Foro de comentarios</h2>
            <p>
              El sistema de comentarios está gestionado por{" "}
              <a
                href="https://giscus.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Giscus
              </a>{" "}
              y requiere iniciar sesión con una cuenta de GitHub. {SITE_NAME}{" "}
              se reserva el derecho a moderar o eliminar comentarios
              ofensivos, ilegales, spam o ajenos al objeto del sitio.
            </p>
          </section>

          <section className="guide-section">
            <h2>8. Legislación aplicable y jurisdicción</h2>
            <p>
              El presente aviso legal se rige por la legislación española.
              Para cualquier controversia, las partes se someten a los
              tribunales del domicilio del titular, salvo que la ley
              imperativa establezca otro fuero.
            </p>
          </section>

          <section className="guide-section">
            <h2>9. Modificaciones</h2>
            <p>
              {SITE_NAME} se reserva el derecho a modificar este aviso legal
              en cualquier momento. La versión vigente es la publicada en
              esta página.
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
