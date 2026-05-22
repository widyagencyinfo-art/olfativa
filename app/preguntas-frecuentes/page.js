import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Preguntas frecuentes sobre perfumes",
  description:
    "Las 30 preguntas más frecuentes sobre perfumes respondidas: cuánto dura un perfume, diferencia EDP/EDT, cómo elegir, dónde comprar, qué son los clones, oud, sillage y más.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

const FAQS = [
  {
    cat: "Conceptos básicos",
    items: [
      {
        q: "¿Qué es un perfume?",
        a: "Un perfume es una mezcla de alcohol, agua y esencia aromática (aceites perfumados). El porcentaje de esencia define su concentración (Parfum, EDP, EDT, EDC) y por tanto su intensidad, proyección y duración. Más esencia significa más intenso, más duradero y normalmente más caro.",
      },
      {
        q: "¿Qué diferencia hay entre EDP, EDT, EDC y Parfum?",
        a: "El Parfum (20-40% de esencia) es el más concentrado y dura 10-14 horas. El EDP (15-20%) es el estándar moderno, dura 7-10 horas. El EDT (5-15%) es más ligero, dura 4-7 horas. El EDC (2-5%) es la colonia clásica, dura 2-4 horas. Más detalles en la guía sobre EDP vs EDT.",
      },
      {
        q: "¿Qué es una nota olfativa?",
        a: "Una nota es un ingrediente individual de la composición: bergamota, rosa, sándalo, oud, vainilla… Cada perfume se construye combinando notas que se organizan en tres tiempos: notas de salida (15-30 minutos), notas de corazón (30 min - 4 horas) y notas de fondo (4-12 horas).",
      },
      {
        q: "¿Qué son las familias olfativas?",
        a: "Las familias olfativas son grupos que clasifican los perfumes según su carácter dominante. Las 7 grandes son: floral, oriental, chipre, amaderada, aromática (fougère), cítrica y gourmand. Conocer tu familia preferida acelera tu búsqueda de perfumes.",
      },
      {
        q: "¿Qué es la pirámide olfativa?",
        a: "Es el esquema clásico que representa cómo evoluciona un perfume en el tiempo. Las notas de salida son las primeras que se huelen (cítricos, hierbas). Las de corazón aparecen al rato (florales, especias). Las de fondo son las que duran horas en piel (maderas, ámbar, vainilla, almizcle).",
      },
    ],
  },
  {
    cat: "Uso y aplicación",
    items: [
      {
        q: "¿Cómo aplicar un perfume para que dure todo el día?",
        a: "Aplica en los puntos de pulso (muñecas, cuello, pecho) a 15-20 cm de la piel. Bastan 2-4 pulverizaciones para un EDP, 1-2 para un Parfum. Nunca frotes las muñecas después: rompe las notas de salida. La piel hidratada con crema neutra multiplica la duración.",
      },
      {
        q: "¿Cuánto dura un perfume en la piel?",
        a: "Depende de la concentración: Parfum 10-14 horas, EDP 7-10 horas, EDT 4-7 horas, EDC 2-4 horas. También influyen el tipo de piel (las pieles grasas retienen mejor), la temperatura ambiente (el calor amplifica) y las materias primas (los orientales duran más que los cítricos).",
      },
      {
        q: "¿Puedo mezclar dos perfumes a la vez?",
        a: "Sí, se llama 'layering'. Funciona mejor combinando un perfume potente con uno limpio (almizcle, cítrico). Casas como Jo Malone están diseñadas específicamente para mezclarse entre sí. Prueba primero en muñecas distintas para ver si las dos fórmulas se llevan bien.",
      },
      {
        q: "¿En qué época del año usar cada perfume?",
        a: "En verano funcionan mejor los cítricos, acuáticos y florales ligeros (Acqua di Giò, CK One, Light Blue). En invierno los orientales, gourmand y amaderados intensos (Tobacco Vanille, Baccarat Rouge, La Vie Est Belle). Primavera y otoño son temporadas versátiles para casi todos los perfiles.",
      },
      {
        q: "¿Por qué huelo mi perfume al principio y luego ya no?",
        a: "Se llama fatiga olfativa o anosmia momentánea. Tu nariz se acostumbra a tu propio perfume aunque siga proyectando para los demás. Que tú no lo huelas no significa que los demás no. Pregunta a alguien antes de reaplicar.",
      },
    ],
  },
  {
    cat: "Compra y elección",
    items: [
      {
        q: "¿Cómo elijo el perfume perfecto?",
        a: "Identifica tu familia olfativa preferida, prueba siempre en piel (no en blotter), espera 2 horas para que se desarrolle, aplica máximo 3 perfumes por sesión y no decidas en caliente. Empieza con muestras o decants antes de comprar el frasco grande.",
      },
      {
        q: "¿Dónde comprar perfumes baratos?",
        a: "Para clones árabes: tiendas especializadas en Amazon, perfumerías online como Notino o Druni en oferta y supermercados grandes. Para clásicos a precio bajo: Polo, Cool Water y Joop! están en torno a 20-40€. Mira nuestra lista de mejores perfumes por menos de 30€.",
      },
      {
        q: "¿Vale la pena comprar perfumes de nicho?",
        a: "Depende de tu interés. Si valoras materias primas de alta calidad, originalidad olfativa y composiciones de autor, sí. Si solo quieres oler bien sin profundizar, los grandes diseñadores cubren tu necesidad por menos dinero. Más detalles en la guía nicho vs diseñador.",
      },
      {
        q: "¿Qué es un decant?",
        a: "Un decant es una porción del perfume original (2-10 ml) trasvasada a un atomizador pequeño para probarlo sin pagar el frasco entero. Permite explorar perfumes caros invirtiendo poco. La forma más inteligente de descubrir perfumería de nicho.",
      },
      {
        q: "¿Son seguros los perfumes árabes baratos como Lattafa o Armaf?",
        a: "Sí, son perfumes legítimos fabricados por empresas reguladas (Lattafa y Armaf están en Emiratos Árabes Unidos e India respectivamente). No son falsificaciones, son creaciones originales que a veces se inspiran en perfumes occidentales. Cumplen normativas IFRA.",
      },
    ],
  },
  {
    cat: "Clones y alternativas",
    items: [
      {
        q: "¿Qué son los clones de perfumes?",
        a: "Los clones son perfumes asequibles que imitan el perfil olfativo de fragancias caras (Creed Aventus, Baccarat Rouge 540, Tom Ford Tobacco Vanille) a una fracción del precio. Marcas como Armaf, Lattafa, Nishane o Mancera lideran este mercado. No son falsificaciones, son interpretaciones legítimas.",
      },
      {
        q: "¿Cuál es el mejor clon de Creed Aventus?",
        a: "Armaf Club de Nuit Intense Man es el clon más fiel y popular, a unos 30€ frente a los 300€ del original. Lattafa Asad y Nishane Hacivat son otras dos alternativas muy recomendadas con perfil afrutado-ahumado similar. Ver la página completa de clones de Aventus.",
      },
      {
        q: "¿Vale la pena pagar el original si hay un clon barato?",
        a: "Si solo te importa el aroma puro, no. Los clones cubren el 80-90% del original a una décima parte del precio. Si valoras la firma, el frasco, la composición exacta y la calidad de materias primas, sí. Es una decisión personal sobre qué priorizas.",
      },
    ],
  },
  {
    cat: "Conservación y duración",
    items: [
      {
        q: "¿Cuánto duran los perfumes sin abrir?",
        a: "Bien conservados (en su caja original, a temperatura ambiente estable, lejos de luz y humedad), un perfume sin abrir puede durar 5-10 años fácilmente. Algunos clásicos bien guardados llevan 30 años en perfecto estado.",
      },
      {
        q: "¿Cuánto dura un perfume abierto?",
        a: "Abierto y bien conservado, 3-5 años antes de notar deterioro. Las notas frágiles (cítricos, florales blancos) se degradan antes. Los orientales y amaderados resisten mejor. Si guardas el perfume en el baño se estropea en pocos meses.",
      },
      {
        q: "¿Dónde guardar el perfume?",
        a: "En su caja original, a temperatura ambiente estable (12-22°C), lejos de la luz directa, el calor y la humedad. El armario del dormitorio es perfecto. Nunca lo guardes en el baño: la humedad y el vapor degradan rápidamente la fórmula.",
      },
      {
        q: "¿Es malo guardar el perfume en la nevera?",
        a: "No, al contrario, lo conserva mejor. El frío detiene la degradación de las moléculas aromáticas. Algunos coleccionistas usan neveras de vinos a 12-15°C para perfumes caros. La pega es la mezcla con olores de comida si lo guardas en la nevera doméstica.",
      },
    ],
  },
  {
    cat: "Otros",
    items: [
      {
        q: "¿Qué es el sillage?",
        a: "El sillage (palabra francesa para 'estela') es el rastro que tu perfume deja en el aire por donde pasas. Si alguien entra en la habitación 5 minutos después de irte y huele tu perfume, tienes buen sillage. Las concentraciones altas (Parfum, EDP) suelen tener más sillage.",
      },
      {
        q: "¿Qué es el oud?",
        a: "El oud es una resina aromática producida por los árboles Aquilaria infectados por un hongo, también llamado 'madera de agar'. Su olor es denso, amaderado, animal y resinoso. Es la materia prima más cara de la perfumería: puede costar más de 30.000€ el kilo.",
      },
      {
        q: "¿Por qué algunos perfumes huelen distinto en cada persona?",
        a: "Porque el pH de la piel, la dieta, las hormonas y la temperatura corporal interactúan con las moléculas del perfume. El mismo perfume puede oler más dulce en una piel y más amargo en otra. Por eso siempre, siempre, hay que probar en la propia piel antes de comprar.",
      },
      {
        q: "¿Son obligatorios los aldehídos para un buen perfume?",
        a: "No, son una familia de moléculas que usan algunos perfumes para dar brillo y un toque jabonoso. Chanel N°5 (1921) los hizo célebres. Hoy se usan en proporciones discretas. No están en la mayoría de perfumes comerciales modernos.",
      },
      {
        q: "¿Qué es un perfumista?",
        a: "Es la persona profesional que crea las fórmulas de los perfumes. Se les llama también 'narices' (nez en francés). Los más famosos hoy son Francis Kurkdjian, Jacques y Olivier Polge, Jean-Claude Ellena, Dominique Ropion, Alberto Morillas y Olivier Cresp.",
      },
      {
        q: "¿Los perfumes caducan?",
        a: "Sí, pero muy lentamente. Un perfume bien guardado puede durar décadas sin caducar. Mal guardado, se oxida en meses. Las señales de un perfume estropeado son cambio de color (más oscuro), olor a alcohol agrio o ausencia de las notas de salida. Sigue siendo seguro para la piel.",
      },
      {
        q: "¿Cuál es la diferencia entre eau de cologne y perfume?",
        a: "Eau de Cologne (EDC) es una concentración baja (2-5% de esencia), no un tipo de aroma. Originalmente las colonias eran cítricas y aromáticas, pero hoy puedes encontrar EDCs de cualquier familia. Es la versión más diluida y efímera de un perfume.",
      },
      {
        q: "¿Es mejor un perfume natural o sintético?",
        a: "Ni mejor ni peor: son herramientas distintas. Las moléculas sintéticas permiten reproducir notas imposibles de extraer (lirio del valle, fresa, oud sostenible), aportan estabilidad y son éticas. Los naturales aportan matices y profundidad. Los grandes perfumes combinan ambos.",
      },
      {
        q: "¿Olfativa cobra comisión por las recomendaciones?",
        a: "Algunos enlaces a tiendas (Amazon, Notino, Druni) son de afiliación: si compras a través de ellos, Olfativa recibe una pequeña comisión sin coste extra para ti. Las recomendaciones, listas y veredictos son siempre editoriales: no aceptamos pago de marcas por mejorar posiciones.",
      },
    ],
  },
];

export default function PreguntasFrecuentesPage() {
  const allQs = FAQS.flatMap((c) => c.items);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQs.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
        ]}
      />
      <div className="container">
        <article className="guide-article">
          <header className="guide-head">
            <span className="eyebrow">Dudas resueltas</span>
            <h1>Preguntas frecuentes sobre perfumes</h1>
            <p className="guide-lead">
              Las <strong>{allQs.length} preguntas más buscadas en Google</strong>{" "}
              sobre perfumes, respondidas de forma clara y concisa. Si tienes
              una duda que no aparece aquí, escríbenos a{" "}
              <a href="mailto:contacto@olfativa.es">contacto@olfativa.es</a> y
              la añadimos.
            </p>
          </header>

          <nav className="guide-toc" aria-label="Categorías">
            <h2>Categorías</h2>
            <ol>
              {FAQS.map((c) => (
                <li key={c.cat}>
                  <a href={`#${c.cat.replace(/\s+/g, "-").toLowerCase()}`}>
                    {c.cat} ({c.items.length})
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {FAQS.map((category) => (
            <section
              key={category.cat}
              id={category.cat.replace(/\s+/g, "-").toLowerCase()}
              className="guide-section"
            >
              <h2>{category.cat}</h2>
              <div className="faq-list">
                {category.items.map((q, i) => (
                  <details key={i} className="faq-item" open={i === 0}>
                    <summary>{q.q}</summary>
                    <div className="faq-answer">
                      <p>{q.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="guide-section">
            <h2>¿Te queda alguna duda?</h2>
            <p>
              Si tu pregunta no está resuelta aquí, escríbenos a{" "}
              <a href="mailto:contacto@olfativa.es">contacto@olfativa.es</a>{" "}
              o consulta nuestras{" "}
              <Link href="/guias">10 guías de perfumería más completas</Link>{" "}
              o el{" "}
              <Link href="/glosario">glosario con 60 términos explicados</Link>.
            </p>
          </section>
        </article>
      </div>
    </>
  );
}
