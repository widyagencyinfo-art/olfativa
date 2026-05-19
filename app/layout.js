import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/data";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Enciclopedia y buscador de perfumes`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "perfumes",
    "fragancias",
    "notas olfativas",
    "perfil olfativo",
    "buscador de perfumes",
    "perfumes hombre",
    "perfumes mujer",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Enciclopedia y buscador de perfumes`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Enciclopedia y buscador de perfumes`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
};

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('olfativa-theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
  } catch(e){}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
