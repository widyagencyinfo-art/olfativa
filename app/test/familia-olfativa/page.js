import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FamilyTest from "@/components/FamilyTest";
import { getAllPerfumes, SITE_URL, SITE_NAME } from "@/lib/data";

export const metadata = {
  title: "Test: ¿Qué familia olfativa eres? Descúbrelo en 1 minuto",
  description:
    "Test gratis de 6 preguntas para descubrir tu familia olfativa: floral, oriental, amaderado, cítrico, chipre, aromático o gourmand. Con 6 perfumes recomendados según tu resultado.",
  alternates: { canonical: "/test/familia-olfativa" },
  openGraph: {
    title: "Test: ¿Qué familia olfativa eres?",
    description:
      "6 preguntas. 1 minuto. Descubre tu familia olfativa y 6 perfumes que encajan contigo.",
    type: "website",
    url: `${SITE_URL}/test/familia-olfativa`,
  },
};

export default function TestPage() {
  const perfumes = getAllPerfumes();

  const quizLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Test: ¿Qué familia olfativa eres?",
    description:
      "Test interactivo de 6 preguntas para descubrir tu familia olfativa dominante y recibir 6 perfumes recomendados.",
    inLanguage: "es-ES",
    educationalLevel: "Principiante",
    learningResourceType: "Quiz",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizLd) }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/test/familia-olfativa", label: "Test familia olfativa" },
        ]}
      />
      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Tool gratis · 1 minuto</span>
            <h1>Test: ¿Qué familia olfativa eres?</h1>
            <p className="guide-lead">
              <strong>6 preguntas, 1 minuto.</strong> Responde con sinceridad
              y descubre tu familia olfativa dominante. Al final del test te
              recomendamos <strong>6 perfumes que encajan contigo</strong>{" "}
              entre los 280+ del catálogo de Olfativa.
            </p>
          </header>

          <FamilyTest allPerfumes={perfumes} />

          <section className="guide-section" style={{ marginTop: "60px" }}>
            <h2>¿Por qué importan las familias olfativas?</h2>
            <p>
              Las <strong>familias olfativas</strong> son la forma estándar de
              clasificar los perfumes según su carácter dominante. Las siete
              grandes son <strong>floral, oriental, chipre, amaderada,
              aromática (fougère), cítrica y gourmand</strong>. Conocer tu
              familia preferida acelera por mucho tu búsqueda de un perfume
              que te enamore.
            </p>
            <p>
              En lugar de probar fragancias al azar, sabes que debes mirar en
              tu zona. Si te resulta más cómodo el oriental, los chipres
              probablemente no te gustarán. Si eres muy cítrico, los
              orientales pesados te aburrirán. El test te orienta para que no
              tengas que aprender a base de errores caros.
            </p>
            <p>
              Una vez identificada tu familia, complementa con las{" "}
              <Link href="/guias/familias-olfativas">
                7 familias olfativas explicadas
              </Link>{" "}
              y con la guía de{" "}
              <Link href="/guias/como-elegir-perfume">
                cómo elegir el perfume perfecto
              </Link>.
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
