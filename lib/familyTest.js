// Test interactivo "¿Que familia olfativa eres?".
// Cada pregunta ofrece 4 opciones. Cada opcion da un punto a una familia.
// Al final el usuario obtiene su familia dominante con una descripcion
// y 5 perfumes recomendados del catalogo.

export const FAMILIES = {
  floral: {
    key: "floral",
    name: "Floral",
    description:
      "Eres un alma romántica y luminosa. Te atrae todo lo que es elegante, suave y femenino sin renunciar al carácter. Te van los perfumes dominados por rosa, jazmín, peonía o tuberosa.",
    color: "#d2799a",
    filterFn: (p) => /floral/i.test(p.family),
  },
  oriental: {
    key: "oriental",
    name: "Oriental",
    description:
      "Eres sensual, magnético y con presencia. Te gusta lo cálido, lo especiado y lo que deja huella. Te van los perfumes con vainilla, ámbar, especias, oud y resinas.",
    color: "#b5582e",
    filterFn: (p) => /oriental|ambar/i.test(p.family),
  },
  amaderado: {
    key: "amaderado",
    name: "Amaderado",
    description:
      "Eres elegante, sobrio y atemporal. Te van las maderas nobles, los aromas terrosos y sofisticados sin estridencias. Cedro, sándalo, vetiver y oud son tus aliados.",
    color: "#9a6b3f",
    filterFn: (p) => /amaderado/i.test(p.family),
  },
  citrico: {
    key: "citrico",
    name: "Cítrico",
    description:
      "Eres dinámico, fresco y luminoso. Te gusta lo limpio, lo solar y lo que transmite energía. Tu zona son los cítricos italianos, las hierbas frescas y las colonias mediterráneas.",
    color: "#dab63c",
    filterFn: (p) => /c[ií]trico/i.test(p.family),
  },
  chipre: {
    key: "chipre",
    name: "Chipre",
    description:
      "Eres sofisticado y un poco rebelde. Te van los perfumes elegantes con carácter, los que combinan frescura y profundidad. Te encanta el contraste bergamota-musgo-pachulí.",
    color: "#9c8a3e",
    filterFn: (p) => /chipre/i.test(p.family),
  },
  aromatico: {
    key: "aromatico",
    name: "Aromático",
    description:
      "Eres atlético, fresco y muy llevable. Te van las hierbas aromáticas (lavanda, romero, salvia), los fougère clásicos y los perfumes limpios con personalidad jabonosa.",
    color: "#5b9e8e",
    filterFn: (p) => /arom[aá]tico|foug[èe]re/i.test(p.family),
  },
  gourmand: {
    key: "gourmand",
    name: "Gourmand",
    description:
      "Eres adictivo y goloso por naturaleza. Te encantan los perfumes que huelen a comida deliciosa: vainilla, café, caramelo, chocolate, frutos secos. Mugler Angel fue tu pionero.",
    color: "#a85f3a",
    filterFn: (p) => /gourmand/i.test(p.family),
  },
};

export const QUESTIONS = [
  {
    q: "¿Qué te apetece más para desayunar el domingo?",
    options: [
      { label: "Café solo y tostada de aceite", family: "amaderado" },
      { label: "Tortitas con sirope o chocolate", family: "gourmand" },
      { label: "Zumo de naranja recién exprimido y fruta", family: "citrico" },
      { label: "Té con miel y bollo de canela", family: "oriental" },
    ],
  },
  {
    q: "¿En qué época del año te sientes mejor?",
    options: [
      { label: "Primavera, con todo en flor", family: "floral" },
      { label: "Verano, sol y vacaciones", family: "citrico" },
      { label: "Otoño, hojas y noches frescas", family: "chipre" },
      { label: "Invierno, abrigos y casa caldeada", family: "oriental" },
    ],
  },
  {
    q: "¿Cómo te describiría alguien que te conoce?",
    options: [
      { label: "Magnético, seductor, con presencia", family: "oriental" },
      { label: "Limpio, elegante, atemporal", family: "amaderado" },
      { label: "Romántico, sensible, soñador", family: "floral" },
      { label: "Energético, deportivo, activo", family: "aromatico" },
    ],
  },
  {
    q: "¿Qué olor te recuerda más a “casa”?",
    options: [
      { label: "Sábanas recién lavadas", family: "aromatico" },
      { label: "Madera de chimenea encendida", family: "amaderado" },
      { label: "Galletas en el horno o repostería", family: "gourmand" },
      { label: "Un jardín con flores frescas", family: "floral" },
    ],
  },
  {
    q: "¿Qué bebida pides para celebrar algo?",
    options: [
      { label: "Whisky con hielo o ron añejo", family: "amaderado" },
      { label: "Vino tinto reserva", family: "chipre" },
      { label: "Cóctel dulce o licor", family: "gourmand" },
      { label: "Gin tonic premium o cava", family: "citrico" },
    ],
  },
  {
    q: "¿Para qué momento sueles ponerte tu perfume favorito?",
    options: [
      { label: "Citas y noches especiales", family: "oriental" },
      { label: "Cada día, para ir a trabajar", family: "aromatico" },
      { label: "Eventos elegantes y bodas", family: "chipre" },
      { label: "Quedadas con amigos y vacaciones", family: "citrico" },
    ],
  },
];

export function scoreAnswers(answers) {
  // answers: array de indices (0-3) por pregunta
  const scores = Object.fromEntries(
    Object.keys(FAMILIES).map((k) => [k, 0])
  );
  answers.forEach((ans, i) => {
    if (ans === null || ans === undefined) return;
    const option = QUESTIONS[i].options[ans];
    if (option) scores[option.family] += 1;
  });
  // Devolver familia con mas puntos (en caso de empate, prioridad arbitraria)
  let best = null;
  let bestScore = -1;
  for (const k of Object.keys(scores)) {
    if (scores[k] > bestScore) {
      best = k;
      bestScore = scores[k];
    }
  }
  return { family: best, scores };
}
