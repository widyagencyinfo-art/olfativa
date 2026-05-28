import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TelegramCta from "@/components/TelegramCta";
import TrackBeacon from "@/components/TrackBeacon";
import ScrollReveal from "@/components/ScrollReveal";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  TELEGRAM_CHANNEL_URL,
} from "@/lib/data";

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
    languages: {
      "es-ES": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  authors: [{ name: `Editorial ${SITE_NAME}`, url: `${SITE_URL}/sobre` }],
  creator: `Editorial ${SITE_NAME}`,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Perfumería",
  manifest: "/manifest.webmanifest",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "Olfativa.es",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "es-ES",
  knowsAbout: [
    "Perfumes",
    "Fragancias",
    "Perfumería de nicho",
    "Familias olfativas",
    "Notas olfativas",
  ],
  sameAs: [TELEGRAM_CHANNEL_URL],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/buscar?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
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
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://upload.wikimedia.org" />
        <link rel="dns-prefetch" href="https://www.amazon.es" />
        <link rel="dns-prefetch" href="https://www.notino.es" />
        <link rel="dns-prefetch" href="https://www.druni.es" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <meta name="theme-color" content="#9c7a4d" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <TelegramCta />
        <TrackBeacon />
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}
