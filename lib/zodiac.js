// Quiz viral "Tu perfume segun tu signo zodiacal".
// La gente lo comparte espontaneamente en Twitter, IG, WhatsApp.
// 12 paginas SEO + sharing organico = trafico sin grabar nada.
import { getAllPerfumes } from "./data.js";

export const ZODIAC = [
  {
    slug: "aries",
    name: "Aries",
    dates: "21 marzo - 19 abril",
    element: "Fuego",
    planet: "Marte",
    emoji: "♈",
    keywords: ["impulsivo", "valiente", "energético", "líder"],
    personality:
      "Aries es el signo del fuego inicial, del impulso, de la acción sin pensar. Lideras conversaciones, te lanzas a lo nuevo y odias la lentitud. Tu perfume debe ser una declaración: potente desde el primer segundo, especiado, ardiente y con notas que proyecten autoridad nada más entrar a una habitación.",
    style:
      "Especiados intensos, fougère ardientes, ámbar con canela, oud con pimienta. Nada de aguas frescas tibias: necesitas perfumes que entren con fuerza y dejen estela.",
    families: ["Oriental especiado", "Amaderado especiado", "Fougère"],
    keyNotes: ["pimienta negra", "canela", "cuero", "oud", "azafrán", "tabaco"],
    matchSlugs: [
      "tom-ford-tobacco-vanille",
      "creed-aventus",
      "paco-rabanne-invictus",
      "armaf-club-de-nuit-intense-man",
      "ysl-y-edp",
      "carolina-herrera-bad-boy"
    ],
    quote: "El que se atreve a oler distinto, vive distinto."
  },
  {
    slug: "tauro",
    name: "Tauro",
    dates: "20 abril - 20 mayo",
    element: "Tierra",
    planet: "Venus",
    emoji: "♉",
    keywords: ["sensual", "constante", "terrenal", "hedonista"],
    personality:
      "Tauro es Venus en su versión más terrenal. Disfrutas lo bueno, lo lento y lo profundo. Buscas placer en los detalles: una buena comida, una textura, un aroma envolvente. Tu perfume debe ser una caricia larga: cremoso, dulce, sensual, persistente, sin estridencias.",
    style:
      "Gourmand cremosos, ámbar dulce, vainilla cálida, sándalo lechoso. Te enamoras de los perfumes que abrazan, no que gritan.",
    families: ["Gourmand", "Oriental ámbar", "Amaderado cremoso"],
    keyNotes: ["vainilla", "sándalo", "ámbar", "caramelo", "leche de almendra", "praline"],
    matchSlugs: [
      "kayali-vanilla-28",
      "mfk-baccarat-rouge-540",
      "lattafa-yara",
      "lancome-la-vie-est-belle",
      "tom-ford-tobacco-vanille",
      "ariana-grande-cloud"
    ],
    quote: "El placer largo es el verdadero placer."
  },
  {
    slug: "geminis",
    name: "Géminis",
    dates: "21 mayo - 20 junio",
    element: "Aire",
    planet: "Mercurio",
    emoji: "♊",
    keywords: ["dual", "curioso", "social", "veloz"],
    personality:
      "Géminis es la mente que nunca para. Te aburres con un solo perfume porque eres muchos perfumes a la vez. Necesitas fragancias con doble cara: que abran como una cosa y evolucionen en otra, complejas, que mantengan tu atención hora a hora.",
    style:
      "Cítricos verdes que viran a especiados, florales que se vuelven amaderados, perfumes con muchas notas y evolución larga. Aburres a los lineales.",
    families: ["Cítrico aromático", "Floral verde", "Hespérides"],
    keyNotes: ["bergamota", "menta", "petitgrain", "té verde", "iris", "jazmín"],
    matchSlugs: [
      "creed-silver-mountain-water",
      "dior-eau-sauvage",
      "chanel-allure-homme-edition-blanche",
      "hermes-terre-dhermes",
      "glossier-you",
      "atelier-cologne-orange-sanguine"
    ],
    quote: "Un solo perfume nunca te bastará."
  },
  {
    slug: "cancer",
    name: "Cáncer",
    dates: "21 junio - 22 julio",
    element: "Agua",
    planet: "Luna",
    emoji: "♋",
    keywords: ["emocional", "nostálgico", "íntimo", "protector"],
    personality:
      "Cáncer huele a casa. A memoria, a sábanas limpias, a piel de alguien que quieres. Tu perfume tiene que ser íntimo, suave, casi un secreto que solo huelen quienes te abrazan. Los almizcles blancos, los polvos y las pieles limpias son tu territorio natural.",
    style:
      "Almizcles blancos, skin scents, florales polvorosos, iris, lácteos. Nunca olores potentes: lo tuyo es la cercanía emocional.",
    families: ["Almizcle blanco", "Floral suave", "Polvoroso"],
    keyNotes: ["almizcle blanco", "iris", "violeta", "haba tonka", "leche de higo", "vainilla suave"],
    matchSlugs: [
      "glossier-you",
      "phlur-missing-person",
      "narciso-rodriguez-for-her-edt",
      "le-labo-another-13",
      "maison-margiela-replica-jazz-club",
      "byredo-mojave-ghost"
    ],
    quote: "Tu perfume no necesita gritar para ser recordado."
  },
  {
    slug: "leo",
    name: "Leo",
    dates: "23 julio - 22 agosto",
    element: "Fuego",
    planet: "Sol",
    emoji: "♌",
    keywords: ["radiante", "dramático", "magnético", "noble"],
    personality:
      "Leo es el sol en persona. Entras y se enciende la sala. Tu perfume tiene que estar a la altura: dorado, opulento, ámbar luminoso, florales blancos potentes. Nada discreto. Lo tuyo es la corona, la entrada triunfal y la sonrisa de oro.",
    style:
      "Florales blancos opulentos, ámbar dorado, oud refinado, perfumes nicho que cuesten lo que cuestan. La discreción no es tu lenguaje.",
    families: ["Floral blanco", "Oriental ámbar", "Oud refinado"],
    keyNotes: ["jazmín sambac", "tuberosa", "azahar", "ámbar dorado", "miel", "azafrán"],
    matchSlugs: [
      "mfk-baccarat-rouge-540",
      "parfums-de-marly-delina",
      "tom-ford-soleil-blanc",
      "ysl-libre",
      "thierry-mugler-alien",
      "carolina-herrera-good-girl"
    ],
    quote: "Si vas a entrar, que se note."
  },
  {
    slug: "virgo",
    name: "Virgo",
    dates: "23 agosto - 22 septiembre",
    element: "Tierra",
    planet: "Mercurio",
    emoji: "♍",
    keywords: ["preciso", "limpio", "elegante", "analítico"],
    personality:
      "Virgo es la pulcritud hecha persona. Tu perfume tiene que oler a impecable: cítricos crujientes, almizcles aseados, vetiver verde, té blanco. Detestas lo empalagoso, lo recargado, lo que se sale del marco. Tu firma olfativa es la simplicidad de lo bien hecho.",
    style:
      "Cítricos limpios, vetiver verde, aguas blancas, almizcles transparentes. Estilo skincare de farmacia francesa, no perfumería de feria.",
    families: ["Cítrico verde", "Almizcle limpio", "Aromático fresco"],
    keyNotes: ["bergamota", "vetiver", "té blanco", "almizcle limpio", "petitgrain", "menta"],
    matchSlugs: [
      "chanel-allure-homme-edition-blanche",
      "creed-silver-mountain-water",
      "hermes-terre-dhermes",
      "issey-miyake-leau-dissey-pour-homme",
      "le-labo-another-13",
      "dior-eau-sauvage"
    ],
    quote: "La elegancia es saber qué no añadir."
  },
  {
    slug: "libra",
    name: "Libra",
    dates: "23 septiembre - 22 octubre",
    element: "Aire",
    planet: "Venus",
    emoji: "♎",
    keywords: ["armónico", "estético", "diplomático", "encantador"],
    personality:
      "Libra es Venus en su versión más social y estética. Buscas el equilibrio en todo, incluido el perfume. Lo tuyo son los florales rosa con balance perfecto: ni demasiado dulces, ni demasiado verdes, ni demasiado pesados. Sofisticación amable.",
    style:
      "Florales rosados, rosa-pachulí elegantes, peonía, almizcle floral. Perfumes que gusten a todo el mundo (porque tú quieres que gusten a todo el mundo).",
    families: ["Floral rosado", "Floral chipre", "Floral suave"],
    keyNotes: ["rosa", "peonía", "lichi", "lirio", "pachulí elegante", "almizcle floral"],
    matchSlugs: [
      "chloe-eau-de-parfum",
      "viktor-rolf-flowerbomb",
      "ysl-mon-paris",
      "dior-jadore",
      "narciso-rodriguez-for-her-edt",
      "lancome-la-vie-est-belle"
    ],
    quote: "El equilibrio es tu olor natural."
  },
  {
    slug: "escorpio",
    name: "Escorpio",
    dates: "23 octubre - 21 noviembre",
    element: "Agua",
    planet: "Plutón / Marte",
    emoji: "♏",
    keywords: ["intenso", "magnético", "oscuro", "transformador"],
    personality:
      "Escorpio es agua profunda, oscura, sin fondo. Tu perfume es un arma: oud, cuero, incienso, ámbar oscuro, rosa negra. Atraes y das miedo a partes iguales. Lo dulce te aburre, lo evidente te repugna. Buscas perfumes que cuenten un secreto.",
    style:
      "Oud profundo, cuero animal, incienso oscuro, rosa pachulí intenso. Perfumes de noche, de cita peligrosa, de seducción larga.",
    families: ["Oriental oud", "Cuero", "Chipre animal"],
    keyNotes: ["oud", "cuero", "incienso", "rosa oscura", "pachulí", "almizcle animal"],
    matchSlugs: [
      "tom-ford-oud-wood",
      "initio-oud-for-greatness",
      "frederic-malle-portrait-of-a-lady",
      "amouage-interlude-man",
      "ysl-black-opium",
      "lattafa-asad"
    ],
    quote: "Lo que no se nombra, se huele."
  },
  {
    slug: "sagitario",
    name: "Sagitario",
    dates: "22 noviembre - 21 diciembre",
    element: "Fuego",
    planet: "Júpiter",
    emoji: "♐",
    keywords: ["aventurero", "libre", "exótico", "filosófico"],
    personality:
      "Sagitario es el viajero. Tu perfume tiene que oler a algún lugar al que aún no has ido: Marruecos, India, Bali. Especias raras, maderas exóticas, incienso, frutas tropicales. Te aburren los perfumes de Sephora estándar. Quieres algo con historia.",
    style:
      "Orientales especiados, sándalos exóticos, incienso, especias asiáticas, frutas tropicales. Estilo Souk de Marrakech.",
    families: ["Oriental especiado", "Amaderado exótico", "Resinoso"],
    keyNotes: ["especias", "incienso", "sándalo de Mysore", "cardamomo", "frutas tropicales", "mirra"],
    matchSlugs: [
      "lattafa-khamrah",
      "amouage-interlude-man",
      "tom-ford-oud-wood",
      "kilian-angels-share",
      "parfums-de-marly-carlisle",
      "creed-aventus"
    ],
    quote: "Tu perfume es tu próximo vuelo."
  },
  {
    slug: "capricornio",
    name: "Capricornio",
    dates: "22 diciembre - 19 enero",
    element: "Tierra",
    planet: "Saturno",
    emoji: "♑",
    keywords: ["serio", "ambicioso", "clásico", "estructurado"],
    personality:
      "Capricornio es el clásico moderno. Te perfumas como vistes: bien cortado, atemporal, sin modas. Buscas perfumes con prestigio probado, presencia profesional, sobriedad elegante. Nada de virales, nada de gourmand infantil. Lo tuyo es el respeto.",
    style:
      "Amaderados clásicos, fougère masculinos, chipres elegantes, cuero refinado. Estilo traje sastre, no sudadera.",
    families: ["Amaderado clásico", "Chipre", "Fougère"],
    keyNotes: ["vetiver", "cuero", "cedro", "tabaco", "musgo de roble", "bergamota"],
    matchSlugs: [
      "chanel-bleu-de-chanel-edt",
      "tom-ford-grey-vetiver",
      "creed-aventus",
      "dior-homme-intense",
      "hermes-terre-dhermes",
      "guerlain-shalimar"
    ],
    quote: "El éxito huele a vetiver."
  },
  {
    slug: "acuario",
    name: "Acuario",
    dates: "20 enero - 18 febrero",
    element: "Aire",
    planet: "Urano / Saturno",
    emoji: "♒",
    keywords: ["original", "inconformista", "futurista", "raro"],
    personality:
      "Acuario huele a futuro. Lo tuyo son los perfumes nicho conceptuales, las moléculas modernas (Ambroxan, Iso E Super), las notas ozonadas y minerales. Te aburre lo de moda, te repele lo común. Buscas firmas raras, etiquetas que nadie reconoce.",
    style:
      "Nicho conceptual, moléculas modernas, perfumes minerales, ozonados, sintéticos elegantes. Comme des Garçons, Escentric Molecules, Etat Libre d'Orange.",
    families: ["Sintético moderno", "Mineral / ozónico", "Aromático experimental"],
    keyNotes: ["Iso E Super", "Ambroxan", "ozono", "metal", "pimienta blanca", "incienso ahumado"],
    matchSlugs: [
      "byredo-mojave-ghost",
      "le-labo-santal-33",
      "phlur-missing-person",
      "issey-miyake-leau-dissey-pour-homme",
      "maison-margiela-replica-jazz-club",
      "glossier-you"
    ],
    quote: "Si todos lo llevan, no es para ti."
  },
  {
    slug: "piscis",
    name: "Piscis",
    dates: "19 febrero - 20 marzo",
    element: "Agua",
    planet: "Neptuno / Júpiter",
    emoji: "♓",
    keywords: ["soñador", "romántico", "místico", "fluido"],
    personality:
      "Piscis es la disolución. Tu perfume tiene que oler a algo que no puedas tocar: niebla marina, lluvia sobre flores, incienso de iglesia vacía. Eres del agua, del sueño, de lo que no se deja agarrar. Los acuáticos, los florales etéreos y los inciensos te encuentran.",
    style:
      "Acuáticos limpios, florales etéreos, inciensos místicos, salinos marinos. Nada terrenal, nada gourmand pesado.",
    families: ["Acuático", "Floral etéreo", "Místico-incienso"],
    keyNotes: ["sal marina", "incienso suave", "flor de loto", "agua", "ámbar acuoso", "té blanco"],
    matchSlugs: [
      "creed-silver-mountain-water",
      "issey-miyake-leau-dissey-pour-homme",
      "dolce-gabbana-light-blue",
      "byredo-mojave-ghost",
      "maison-margiela-by-the-fireplace",
      "le-labo-another-13"
    ],
    quote: "Tu perfume huele a lo que sueñas, no a lo que tienes."
  }
];

// Devuelve los perfumes recomendados para un signo, resolviendo
// slugs reales del catalogo. Si un slug no existe, lo salta.
export function getZodiacMatches(slug) {
  const sign = ZODIAC.find((s) => s.slug === slug);
  if (!sign) return null;
  const all = getAllPerfumes();
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const matches = sign.matchSlugs
    .map((s) => bySlug.get(s))
    .filter(Boolean)
    .slice(0, 6);
  return { ...sign, perfumes: matches };
}

export function getAllZodiacSlugs() {
  return ZODIAC.map((s) => s.slug);
}
