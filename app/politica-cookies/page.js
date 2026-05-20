import Breadcrumbs from "@/components/Breadcrumbs";
import { LEGAL } from "@/lib/legal";
import { SITE_NAME } from "@/lib/data";

export const metadata = {
  title: "Política de cookies",
  description:
    "Política de cookies de Olfativa: qué cookies usa el sitio, cuáles son de terceros y cómo gestionarlas.",
  alternates: { canonical: "/politica-cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/politica-cookies", label: "Política de cookies" },
        ]}
      />
      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Información legal</span>
            <h1>Política de cookies</h1>
            <p className="guide-lead">
              Esta política explica qué son las cookies, cuáles usa {SITE_NAME}{" "}
              y cómo puedes gestionarlas.
            </p>
          </header>

          <section className="guide-section">
            <h2>¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web
              instala en tu navegador cuando lo visitas. Sirven para guardar
              preferencias, mantener sesiones iniciadas o medir el uso del
              sitio.
            </p>
          </section>

          <section className="guide-section">
            <h2>Cookies que utiliza {SITE_NAME}</h2>
            <p>
              <strong>Cookies propias técnicas (sin consentimiento previo)</strong>:
              {" "}{SITE_NAME} guarda una preferencia local en tu navegador
              (mediante <code>localStorage</code>, no es estrictamente una
              cookie) para recordar si has elegido modo claro u oscuro. No
              identifica al usuario y no se comparte con terceros.
            </p>
            <p>
              <strong>{SITE_NAME} NO instala cookies propias</strong> de
              análisis, publicidad ni perfilado.
            </p>
          </section>

          <section className="guide-section">
            <h2>Cookies de terceros</h2>
            <p>
              Cuando interactúas con ciertos elementos del sitio, los
              servicios de terceros pueden instalar sus propias cookies:
            </p>
            <ul style={{ paddingLeft: "22px" }}>
              <li>
                <strong>Giscus / GitHub</strong>: el sistema de comentarios
                carga un iframe de Giscus cuando entras en la sección de foro
                de una ficha de perfume. Si inicias sesión con GitHub, GitHub
                instalará sus propias cookies de sesión. Política:{" "}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Privacy Statement
                </a>.
              </li>
              <li>
                <strong>Vercel</strong>: el alojamiento del sitio puede
                instalar cookies técnicas estrictamente necesarias para la
                entrega de contenido (no de análisis ni marketing).{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Vercel
                </a>.
              </li>
              <li>
                <strong>Tiendas afiliadas</strong> (Amazon, Notino, Druni): al
                pulsar un enlace de afiliado eres redirigido a su sitio donde
                cargarán sus propias cookies, ajenas a {SITE_NAME}.
              </li>
            </ul>
          </section>

          <section className="guide-section">
            <h2>Cómo gestionar las cookies</h2>
            <p>
              Puedes aceptar, rechazar o eliminar las cookies desde la
              configuración de tu navegador:
            </p>
            <ul style={{ paddingLeft: "22px" }}>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/es-es/HT201265"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edge
                </a>
              </li>
            </ul>
            <p>
              Rechazar las cookies de Giscus puede limitar tu capacidad de
              participar en el foro. El resto de la web funciona con
              normalidad sin cookies.
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
