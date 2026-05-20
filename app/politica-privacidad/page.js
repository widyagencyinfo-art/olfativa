import Breadcrumbs from "@/components/Breadcrumbs";
import { LEGAL } from "@/lib/legal";
import { SITE_NAME, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de Olfativa conforme al Reglamento General de Protección de Datos (RGPD) y la LOPDGDD.",
  alternates: { canonical: "/politica-privacidad" },
};

export default function PrivacidadPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/politica-privacidad", label: "Política de privacidad" },
        ]}
      />
      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Información legal</span>
            <h1>Política de privacidad</h1>
            <p className="guide-lead">
              {SITE_NAME} respeta tu privacidad y cumple con el Reglamento
              General de Protección de Datos (RGPD) y la Ley Orgánica
              3/2018 de Protección de Datos Personales y garantía de los
              derechos digitales (LOPDGDD).
            </p>
          </header>

          <section className="guide-section">
            <h2>1. Responsable del tratamiento</h2>
            <p>
              <strong>Responsable:</strong> {LEGAL.ownerName}
              <br />
              <strong>{LEGAL.ownerIdType}:</strong> {LEGAL.ownerId}
              <br />
              <strong>Domicilio:</strong> {LEGAL.ownerAddress}
              <br />
              <strong>Email:</strong>{" "}
              <a href={`mailto:${LEGAL.ownerEmail}`}>{LEGAL.ownerEmail}</a>
            </p>
          </section>

          <section className="guide-section">
            <h2>2. Qué datos recogemos</h2>
            <p>
              <strong>Navegación general:</strong> {SITE_NAME} no recoge datos
              personales por la simple navegación. No usamos cookies de
              tracking propias.
            </p>
            <p>
              <strong>Comentarios (foro Giscus):</strong> si participas en el
              foro de un perfume, lo haces autenticándote con GitHub a través
              del servicio Giscus. GitHub muestra tu nombre de usuario y
              avatar públicamente en el comentario. Los datos los gestiona
              GitHub Inc., no {SITE_NAME}.
            </p>
            <p>
              <strong>Contacto por email:</strong> si nos escribes a{" "}
              <a href={`mailto:${LEGAL.ownerEmail}`}>{LEGAL.ownerEmail}</a>,
              tratamos tu dirección y el contenido del mensaje únicamente
              para responderte. No los compartimos con terceros.
            </p>
            <p>
              <strong>Datos de servidor:</strong> el alojamiento ({LEGAL.hostingProvider})
              recoge datos técnicos básicos (dirección IP, navegador, fecha)
              para protección contra ataques. Estos datos no se cruzan con
              ninguna información personal por nuestra parte.
            </p>
          </section>

          <section className="guide-section">
            <h2>3. Base legal del tratamiento</h2>
            <p>
              El tratamiento de los datos se basa en:
            </p>
            <ul style={{ paddingLeft: "22px" }}>
              <li>
                <strong>Tu consentimiento</strong> al participar en el foro o
                al escribirnos por email.
              </li>
              <li>
                <strong>Interés legítimo</strong> del responsable en mantener
                el sitio seguro y operativo (datos técnicos de servidor).
              </li>
            </ul>
          </section>

          <section className="guide-section">
            <h2>4. Finalidad y plazo de conservación</h2>
            <p>
              Los datos se utilizan exclusivamente para la finalidad por la
              que se proporcionan (responder mensajes, mostrar comentarios) y
              se conservan el tiempo estrictamente necesario:
            </p>
            <ul style={{ paddingLeft: "22px" }}>
              <li>
                Comentarios del foro: permanecen mientras no se eliminen
                desde GitHub Discussions por el usuario o por moderación.
              </li>
              <li>
                Emails de contacto: hasta 24 meses tras la última
                interacción, salvo obligación legal.
              </li>
              <li>
                Datos técnicos de servidor: 30-90 días según el proveedor.
              </li>
            </ul>
          </section>

          <section className="guide-section">
            <h2>5. Encargados de tratamiento (terceros)</h2>
            <p>
              {SITE_NAME} usa los siguientes servicios externos:
            </p>
            <ul style={{ paddingLeft: "22px" }}>
              <li>
                <strong>Vercel Inc.</strong> (EEUU) — alojamiento web. Datos
                tratados: IPs y datos técnicos. Vercel está adherido al EU-US
                Data Privacy Framework.
              </li>
              <li>
                <strong>GitHub Inc.</strong> (EEUU, subsidiaria de Microsoft)
                {" "}— hospeda el sistema de comentarios Giscus y las
                Discussions. Está adherido al marco UE-EEUU.
              </li>
              <li>
                <strong>Wikipedia / Wikimedia Foundation</strong> (EEUU) —
                cuando una ficha muestra una foto, esta se carga desde sus
                servidores. No envían cookies a tu navegador desde {SITE_NAME}.
              </li>
              <li>
                <strong>Plataformas afiliadas</strong> (Amazon España,
                Notino, Druni) — al pulsar un enlace de afiliado eres
                redirigido a su sitio, donde aplican sus propias políticas.
              </li>
            </ul>
          </section>

          <section className="guide-section">
            <h2>6. Tus derechos</h2>
            <p>
              Como interesado tienes derecho a:
            </p>
            <ul style={{ paddingLeft: "22px" }}>
              <li>
                <strong>Acceso, rectificación y supresión</strong> de tus
                datos.
              </li>
              <li>
                <strong>Limitación y oposición</strong> al tratamiento.
              </li>
              <li>
                <strong>Portabilidad</strong> de tus datos.
              </li>
              <li>
                <strong>Retirar tu consentimiento</strong> en cualquier
                momento.
              </li>
              <li>
                <strong>Reclamar ante la Agencia Española de Protección de
                Datos</strong> (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.aepd.es
                </a>
                ) si consideras que tus derechos no se han respetado.
              </li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos escríbenos a{" "}
              <a href={`mailto:${LEGAL.ownerEmail}`}>{LEGAL.ownerEmail}</a>{" "}
              indicando el derecho que quieres ejercer.
            </p>
          </section>

          <section className="guide-section">
            <h2>7. Modificaciones</h2>
            <p>
              {SITE_NAME} puede actualizar esta política de privacidad para
              adaptarla a cambios legislativos o de funcionalidades del
              sitio. La versión vigente es la publicada en esta página.
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
