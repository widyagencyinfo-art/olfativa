import { perfumes } from "./data";

function longevityMax(p) {
  const m = String(p.longevity).match(/(\d+)\D*(\d+)?/);
  if (!m) return 0;
  return Number(m[2] || m[1]);
}

const byRating = (a, b) => b.rating - a.rating || a.name.localeCompare(b.name);

export const LISTS = [
  {
    slug: "mejores-perfumes-de-hombre",
    h1: "Mejores perfumes de hombre",
    title: "Mejores perfumes de hombre",
    description:
      "Los mejores perfumes de hombre del mercado: frescos para el día, intensos para la noche y clásicos imprescindibles. Notas, precio y dónde comprarlos.",
    intro:
      "Selección de los perfumes masculinos más populares y mejor valorados de Olfativa. Incluye desde clásicos contemporáneos como Dior Sauvage o Bleu de Chanel hasta favoritos de nicho.",
    filter: (p) => p.gender === "hombre",
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-de-mujer",
    h1: "Mejores perfumes de mujer",
    title: "Mejores perfumes de mujer",
    description:
      "Los mejores perfumes de mujer: florales luminosos, gourmands dulces y orientales sensuales. Con notas, precio e historia de cada uno.",
    intro:
      "Selección de los perfumes femeninos más vendidos y aclamados por la crítica. Desde los grandes clásicos como Chanel N°5 hasta los superventas modernos como Good Girl o La Vie Est Belle.",
    filter: (p) => p.gender === "mujer",
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-unisex",
    h1: "Mejores perfumes unisex",
    title: "Mejores perfumes unisex",
    description:
      "Los mejores perfumes unisex sin distinción de género: amaderados, ambarinos y aromáticos para todo el mundo. Notas, precio y consejos.",
    intro:
      "Perfumes unisex pensados para usar todo el año por cualquier persona. Una categoría en auge dominada por casas como Tom Ford, Le Labo, Byredo o Maison Francis Kurkdjian.",
    filter: (p) => p.gender === "unisex",
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-para-verano",
    h1: "Mejores perfumes para verano",
    title: "Mejores perfumes para verano",
    description:
      "Los mejores perfumes para el verano: frescos, acuáticos y cítricos que no empalagan con el calor. Selección de hombre, mujer y unisex.",
    intro:
      "En verano se buscan fragancias ligeras y luminosas que no resulten pesadas con el calor. Cítricos, acuáticos y aromáticos verdes son las apuestas más seguras.",
    filter: (p) => p.seasons.includes("verano"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-para-invierno",
    h1: "Mejores perfumes para invierno",
    title: "Mejores perfumes para invierno",
    description:
      "Los mejores perfumes para el invierno: orientales cálidos, gourmands envolventes y amaderados especiados. Selección con precios y notas.",
    intro:
      "En invierno funcionan especialmente bien los perfumes cálidos y densos. Vainillas, ámbar, tabaco, cuero, especias y maderas brillan con el frío.",
    filter: (p) => p.seasons.includes("invierno"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-baratos",
    h1: "Mejores perfumes baratos por menos de 60€",
    title: "Mejores perfumes baratos",
    description:
      "Los mejores perfumes baratos por menos de 60€ con calidad real: clásicos, clones famosos y descubrimientos asequibles para hombre y mujer.",
    intro:
      "Selección de perfumes asequibles que ofrecen una calidad muy por encima de su precio. Incluye clones famosos como Armaf Club de Nuit Intense Man y joyas árabes como Lattafa Khamrah.",
    filter: (p) => p.priceRange.min < 60,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-de-larga-duracion",
    h1: "Mejores perfumes de larga duración",
    title: "Mejores perfumes de larga duración",
    description:
      "Los perfumes que más duran en la piel: hasta 12-14 horas de proyección. Selección de los más resistentes con precios y notas.",
    intro:
      "La duración de un perfume depende de su concentración, sus materias primas y la piel. Estos son los perfumes con mayor estela y permanencia del catálogo.",
    filter: (p) => longevityMax(p) >= 10,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-amaderados",
    h1: "Mejores perfumes amaderados",
    title: "Mejores perfumes amaderados",
    description:
      "Los mejores perfumes amaderados: cedro, sándalo, vetiver y maderas exóticas. Selección con precios, notas y para qué temporada.",
    intro:
      "La familia amaderada es una de las más populares y versátiles. Va desde frescos amaderados aromáticos hasta amaderados especiados muy intensos.",
    filter: (p) => /amaderado/i.test(p.family),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-orientales",
    h1: "Mejores perfumes orientales",
    title: "Mejores perfumes orientales",
    description:
      "Los mejores perfumes orientales: vainilla, ámbar, especias y resinas. Selección de fragancias cálidas con notas y precio.",
    intro:
      "Los perfumes orientales son cálidos, especiados y envolventes. La familia ideal para las noches frías y para quien busca presencia y carácter.",
    filter: (p) => /oriental/i.test(p.family),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-florales",
    h1: "Mejores perfumes florales",
    title: "Mejores perfumes florales",
    description:
      "Los mejores perfumes florales: rosa, jazmín, peonía, tuberosa y muchos más. Selección con notas, precios e historia.",
    intro:
      "La familia floral es la más amplia y rica de la perfumería. Desde un ramo solar y luminoso hasta florales blancos opulentos y sensuales.",
    filter: (p) => /floral/i.test(p.family),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-para-la-oficina",
    h1: "Mejores perfumes para la oficina",
    title: "Mejores perfumes para la oficina",
    description:
      "Los mejores perfumes para la oficina: discretos, profesionales y de proyección moderada. Selección para hombre y mujer.",
    intro:
      "Para la oficina conviene una fragancia elegante de proyección contenida que no invada el espacio. Frescos cítricos, aromáticos limpios y florales suaves son las mejores apuestas.",
    filter: (p) => p.occasions.includes("oficina"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-para-citas",
    h1: "Mejores perfumes para citas",
    title: "Mejores perfumes para citas",
    description:
      "Los mejores perfumes para una cita: sensuales, magnéticos y memorables. Selección para él y para ella con notas y precios.",
    intro:
      "Para una cita romántica los perfumes ganadores suelen ser orientales, gourmands o amaderados con un toque dulce. Buscan sensualidad y proyección sin saturar.",
    filter: (p) => p.occasions.includes("cita"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-de-nicho",
    h1: "Mejores perfumes de nicho",
    title: "Mejores perfumes de nicho",
    description:
      "Los mejores perfumes de nicho: casas independientes con composiciones de autor y materias primas de calidad. Selección con precios.",
    intro:
      "La perfumería de nicho propone creaciones más artísticas y diferenciadas que las grandes marcas comerciales. Incluye casas como Creed, Parfums de Marly, Xerjoff, MFK, Kilian, Le Labo, Byredo o Initio.",
    filter: (p) => p.priceRange.min >= 150,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "perfumes-mas-vendidos",
    h1: "Los perfumes más vendidos",
    title: "Los perfumes más vendidos",
    description:
      "Los perfumes más vendidos y mejor valorados del catálogo. Hombre, mujer y unisex con notas, precios e historia.",
    intro:
      "Ranking general con los perfumes mejor valorados por los usuarios, sin filtros de género ni de familia. La mejor manera de descubrir grandes referencias en cualquier estilo.",
    filter: () => true,
    sort: byRating,
    limit: 20,
  },

  // ============= ESTACIONALES =============
  {
    slug: "mejores-perfumes-san-valentin",
    h1: "Mejores perfumes para regalar en San Valentín 2026",
    title: "Mejores perfumes para San Valentín 2026",
    description:
      "Los mejores perfumes para regalar en San Valentín 2026: sensuales, románticos y memorables. Selección para ella y para él con precios.",
    intro:
      "San Valentín es la mejor ocasión para regalar un perfume que se convierta en la firma olfativa de alguien especial. Aquí están las opciones más sensuales, magnéticas y románticas del catálogo, mezclando clásicos comerciales y joyas de nicho. Para él, para ella o para unisex.",
    filter: (p) => p.occasions.includes("cita") && p.rating >= 4.0,
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-dia-del-padre",
    h1: "Mejores perfumes para regalar el Día del Padre",
    title: "Mejores perfumes para el Día del Padre",
    description:
      "Los mejores perfumes para regalar a tu padre el Día del Padre: clásicos elegantes, modernos versátiles y opciones de nicho. Para todos los gustos y presupuestos.",
    intro:
      "El Día del Padre es la ocasión perfecta para regalar un perfume que tu padre pueda usar a diario. Esta selección reúne clásicos atemporales y propuestas modernas, todas con buena duración, proyección adecuada y versatilidad entre el día y la noche.",
    filter: (p) =>
      p.gender === "hombre" && p.rating >= 4.0 && p.occasions.includes("diario"),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-dia-de-la-madre",
    h1: "Mejores perfumes para regalar el Día de la Madre",
    title: "Mejores perfumes para el Día de la Madre",
    description:
      "Los mejores perfumes para regalar a tu madre el Día de la Madre: clásicos elegantes, florales sofisticados y orientales suaves. Selección con precios.",
    intro:
      "El Día de la Madre es la mejor excusa para regalar un perfume femenino que combine elegancia y carácter. Esta selección incluye clásicos atemporales como Chanel N°5 y propuestas modernas con muy buena recepción del público adulto.",
    filter: (p) => p.gender === "mujer" && p.rating >= 4.1,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-para-navidad",
    h1: "Mejores perfumes para regalar en Navidad 2026",
    title: "Mejores perfumes para regalar en Navidad 2026",
    description:
      "Los mejores perfumes para regalar en Navidad: cálidos, especiados y reconfortantes. Selección para hombre, mujer y unisex con precios.",
    intro:
      "La Navidad es la temporada de los perfumes cálidos y envolventes: orientales especiados, gourmand con vainilla, ámbar y maderas. Esta selección reúne los regalos más acertados para el invierno, tanto para fans del clásico como para los amantes del nicho.",
    filter: (p) =>
      p.seasons.includes("invierno") &&
      p.rating >= 4.0 &&
      (p.occasions.includes("cita") || p.occasions.includes("eventos")),
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-black-friday",
    h1: "Mejores perfumes para Black Friday 2026",
    title: "Mejores perfumes en oferta Black Friday 2026",
    description:
      "Los mejores perfumes para aprovechar el Black Friday: bestsellers, joyas asequibles y clones por debajo de su precio habitual.",
    intro:
      "El Black Friday es el momento del año donde más bajan los perfumes en Amazon, Notino y Druni. Esta lista recoge los superventas que más merece la pena cazar en oferta: clásicos comerciales, propuestas árabes asequibles y algunas joyas de nicho.",
    filter: (p) => p.rating >= 4.0 && p.priceRange.min < 130,
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-para-bodas",
    h1: "Mejores perfumes para bodas",
    title: "Mejores perfumes para una boda (novio, novia e invitados)",
    description:
      "Los mejores perfumes para una boda: elegantes, sofisticados y memorables. Selección para el novio, la novia, los invitados y para regalar a los testigos.",
    intro:
      "Una boda merece un perfume especial. Para los novios, una fragancia que se asocie para siempre al día más importante. Para los invitados, algo elegante que no compita con la ocasión. Selección curada con clásicos atemporales y propuestas de nicho refinadas.",
    filter: (p) => p.occasions.includes("eventos") && p.rating >= 4.1,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-para-primavera",
    h1: "Mejores perfumes para primavera 2026",
    title: "Mejores perfumes para primavera 2026",
    description:
      "Los mejores perfumes para primavera: florales luminosos, cítricos vibrantes y verdes frescos para días templados. Selección con precios.",
    intro:
      "La primavera invita a perfumes luminosos, florales y vibrantes que reflejen el despertar de la naturaleza. Esta selección reúne los mejores florales, cítricos elegantes y verdes ligeros del catálogo para esta estación.",
    filter: (p) => p.seasons.includes("primavera") && p.rating >= 4.0,
    sort: byRating,
    limit: 20,
  },
  {
    slug: "mejores-perfumes-fiesta-noche",
    h1: "Mejores perfumes para salir de fiesta",
    title: "Mejores perfumes para salir de fiesta y noche",
    description:
      "Los mejores perfumes para salir de fiesta y discoteca: potentes, magnéticos y sensuales. Selección para hombre y mujer.",
    intro:
      "Las salidas nocturnas piden perfumes con presencia, proyección y carácter. Esta selección reúne los más potentes y seductores del catálogo, los que dejan huella en el aire incluso después de irte de la discoteca.",
    filter: (p) =>
      p.timeOfDay.includes("noche") &&
      p.occasions.includes("ocio") &&
      p.rating >= 4.0,
    sort: byRating,
    limit: 18,
  },

  // ============= DEMOGRÁFICAS =============
  {
    slug: "mejores-perfumes-hombre-joven",
    h1: "Mejores perfumes para hombre joven",
    title: "Mejores perfumes para hombre joven (20-30 años)",
    description:
      "Los mejores perfumes para hombre joven entre 20 y 30 años: modernos, magnéticos y a buen precio. Selección con precios y notas.",
    intro:
      "A los 20-30 años se buscan perfumes con personalidad pero asequibles, modernos y que funcionen en ocasiones tanto casuales como nocturnas. Esta lista reúne los mejores best-sellers comerciales y joyas árabes de buena relación calidad-precio.",
    filter: (p) =>
      p.gender === "hombre" && p.rating >= 4.0 && p.priceRange.min < 110,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-hombre-maduro",
    h1: "Mejores perfumes para hombre maduro",
    title: "Mejores perfumes para hombre maduro (40+ años)",
    description:
      "Los mejores perfumes para hombre maduro a partir de los 40 años: clásicos elegantes, sofisticados y atemporales. Selección con precios.",
    intro:
      "A partir de los 40 se valora un perfume que diga 'hombre que sabe lo que quiere'. Esta selección reúne las grandes referencias clásicas y las propuestas de nicho con carácter adulto: cueros, amaderados sobrios, chipres elegantes y orientales no infantiles.",
    filter: (p) =>
      p.gender === "hombre" &&
      p.rating >= 4.2 &&
      (p.occasions.includes("oficina") || p.occasions.includes("eventos")),
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-mujer-joven",
    h1: "Mejores perfumes para mujer joven",
    title: "Mejores perfumes para mujer joven (20-30 años)",
    description:
      "Los mejores perfumes para mujer joven entre 20 y 30 años: vibrantes, modernos y a buen precio. Selección con precios y notas.",
    intro:
      "Para la mujer joven los perfumes ideales son los que combinan presencia y juventud: florales frescos, gourmand vibrantes y algún cítrico chispeante. Esta selección balancea best-sellers comerciales con propuestas más originales.",
    filter: (p) =>
      p.gender === "mujer" && p.rating >= 4.0 && p.priceRange.min < 130,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-mujer-madura",
    h1: "Mejores perfumes para mujer madura",
    title: "Mejores perfumes para mujer madura (40+ años)",
    description:
      "Los mejores perfumes para mujer madura a partir de los 40 años: sofisticados, atemporales y de carácter. Selección de florales clásicos, orientales y chipres elegantes.",
    intro:
      "A partir de los 40 los perfumes femeninos pueden permitirse profundidad y carácter sin renunciar al refinamiento. Esta selección reúne los grandes clásicos atemporales y las propuestas de nicho con personalidad: florales blancos, chipres elegantes y orientales con cuerpo.",
    filter: (p) => p.gender === "mujer" && p.rating >= 4.2,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-adolescentes",
    h1: "Mejores perfumes para adolescentes",
    title: "Mejores perfumes para adolescentes",
    description:
      "Los mejores perfumes para adolescentes: frescos, asequibles y comerciales. Selección para chico y chica entre 15 y 20 años.",
    intro:
      "Los adolescentes buscan perfumes alegres, fáciles de llevar y a precio razonable. Esta selección reúne los grandes éxitos comerciales pensados para el público joven: frescos cítricos, gourmands suaves y aromáticos modernos.",
    filter: (p) => p.rating >= 3.9 && p.priceRange.min < 80,
    sort: byRating,
    limit: 20,
  },

  // ============= OCASIONES =============
  {
    slug: "mejores-perfumes-entrevista-trabajo",
    h1: "Mejores perfumes para una entrevista de trabajo",
    title: "Mejores perfumes para una entrevista de trabajo",
    description:
      "Los mejores perfumes para una entrevista de trabajo: discretos, profesionales y limpios. Selección para hombre y mujer.",
    intro:
      "En una entrevista de trabajo, el perfume debe pasar desapercibido sin estar ausente: discreto, limpio, profesional. Nunca dulce, gourmand ni excesivamente proyectivo. Esta selección reúne las opciones más adecuadas para causar buena impresión sin invadir.",
    filter: (p) => p.occasions.includes("oficina") && p.rating >= 4.0,
    sort: byRating,
    limit: 16,
  },
  {
    slug: "mejores-perfumes-primera-cita",
    h1: "Mejores perfumes para una primera cita",
    title: "Mejores perfumes para una primera cita",
    description:
      "Los mejores perfumes para una primera cita: sensuales pero no agresivos, modernos y memorables. Selección para hombre y mujer.",
    intro:
      "Una primera cita requiere un perfume que diga 'estoy interesado/a' sin pasarse. Discreto pero magnético, moderno, con buena proyección de cerca pero sin ahogar. Esta selección equilibra sensualidad y elegancia.",
    filter: (p) =>
      p.occasions.includes("cita") &&
      p.rating >= 4.1 &&
      !p.occasions.includes("ocio"),
    sort: byRating,
    limit: 16,
  },
  {
    slug: "mejores-perfumes-graduacion",
    h1: "Mejores perfumes para una graduación",
    title: "Mejores perfumes para una graduación",
    description:
      "Los mejores perfumes para regalar o usar en una graduación: elegantes, modernos y memorables. Selección para hombre y mujer.",
    intro:
      "Una graduación marca un comienzo. El perfume que llevas (o regalas) ese día puede convertirse en la firma olfativa del nuevo capítulo. Esta selección reúne propuestas elegantes y modernas que funcionan tanto para regalo como para llevar puestas.",
    filter: (p) =>
      p.occasions.includes("eventos") && p.rating >= 4.1 && p.priceRange.min < 150,
    sort: byRating,
    limit: 16,
  },
  {
    slug: "mejores-perfumes-regalar",
    h1: "Los mejores perfumes para regalar",
    title: "Los mejores perfumes para regalar (cualquier ocasión)",
    description:
      "Los mejores perfumes para regalar en cualquier ocasión: cumpleaños, aniversarios, gracias. Selección para todos los presupuestos y géneros.",
    intro:
      "Regalar un perfume es siempre acertar si conoces los gustos de la persona. Esta selección reúne las opciones más universalmente queridas: clásicos atemporales, comerciales con buena reputación y joyas a buen precio que funcionan para casi cualquiera.",
    filter: (p) => p.rating >= 4.1,
    sort: byRating,
    limit: 20,
  },

  // ============= PRECIO/CALIDAD ESPECÍFICAS =============
  {
    slug: "mejores-perfumes-menos-30-euros",
    h1: "Mejores perfumes por menos de 30€",
    title: "Mejores perfumes por menos de 30 euros (2026)",
    description:
      "Los mejores perfumes asequibles por menos de 30€: clones árabes, clásicos baratos y joyas inesperadas. Selección con notas y opiniones.",
    intro:
      "Que un perfume sea barato no significa que sea malo. Esta lista reúne las mejores opciones por menos de 30€: clones árabes brillantes (Lattafa, Armaf), clásicos imprescindibles a precio ridículo (Cool Water, Polo, Joop!) y descubrimientos de buena calidad-precio.",
    filter: (p) => p.priceRange.min < 30 && p.rating >= 3.8,
    sort: byRating,
    limit: 18,
  },
  {
    slug: "mejores-perfumes-mas-vendidos-amazon",
    h1: "Los perfumes más vendidos en Amazon España",
    title: "Los perfumes más vendidos en Amazon España",
    description:
      "Los perfumes más buscados y vendidos en Amazon España: bestsellers globales, clones árabes y propuestas a precio inmejorable. Selección actualizada.",
    intro:
      "Los perfumes más vendidos en Amazon España son una mezcla de bestsellers globales como Dior Sauvage o Bleu de Chanel, clones árabes virales como Lattafa Khamrah y joyas asequibles tipo Hugo Boss Bottled. Esta lista los reúne todos.",
    filter: (p) => p.rating >= 4.0 && p.priceRange.min < 120,
    sort: (a, b) => b.rating - a.rating || a.priceRange.min - b.priceRange.min,
    limit: 20,
  },
];

export function getAllLists() {
  return LISTS.map(({ filter, sort, ...rest }) => rest);
}

export function getList(slug) {
  const def = LISTS.find((l) => l.slug === slug);
  if (!def) return null;
  let result = perfumes.filter(def.filter);
  if (def.sort) result = result.slice().sort(def.sort);
  if (def.limit) result = result.slice(0, def.limit);
  return { ...def, perfumes: result };
}
