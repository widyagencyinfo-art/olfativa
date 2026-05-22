// Glosario de perfumería. Cada entrada es un termino con definicion corta
// directa, optimizada para featured snippets y AI Overview. Renderizamos
// la pagina entera con DefinedTermSet schema.org markup; cada entrada
// individual se marca como DefinedTerm.
//
// Las definiciones son intencionalmente concisas (40-80 palabras): asi
// Google y los buscadores de IA las pueden citar tal cual.

export const GLOSSARY = [
  // A
  { term: "Acorde", letter: "A", definition: "Combinación armónica de varias notas olfativas que forman un olor reconocible como una sola idea (por ejemplo, el acorde 'frutos rojos' o 'oriental ambarino'). Los perfumistas trabajan con acordes prefabricados como bloques de construcción.", related: ["familias-olfativas"] },
  { term: "Aldehídos", letter: "A", definition: "Familia de moléculas sintéticas que aportan brillo, abstracción y un toque jabonoso o ceroso. Hicieron historia en 1921 con Chanel N°5, el primer gran perfume aldehídico. Hoy se usan en cantidades discretas para iluminar otras notas.", related: ["chanel-no-5"] },
  { term: "Ámbar", letter: "A", definition: "Acorde cálido y resinoso construido con labdanum, benjuí y vainilla. No proviene de la piedra ámbar fósil. Es la base de la familia oriental-ambarina y suele aportar dulzor balsámico y sensualidad nocturna.", related: ["mfk-baccarat-rouge-540", "mfk-grand-soir"] },
  { term: "Ámbar gris", letter: "A", definition: "Sustancia rara producida por los cachalotes que se utiliza fijada en alcohol o en forma sintética (Ambroxan). Aporta una calidez salina y mineral muy distintiva. Hoy se usa casi exclusivamente sintética por motivos éticos.", related: ["dior-sauvage-edp"] },
  { term: "Ambroxan", letter: "A", definition: "Molécula sintética derivada del ámbar gris. Es responsable del olor 'jabón limpio caro' moderno presente en perfumes como Dior Sauvage o Bleu de Chanel. Potente, persistente y muy comercial.", related: ["dior-sauvage-edp", "bleu-de-chanel-edp"] },
  { term: "Aromático", letter: "A", definition: "Familia olfativa basada en hierbas aromáticas: lavanda, romero, salvia, tomillo, albahaca. Es la espina dorsal del clásico fougère masculino (Le Male, Drakkar). Resulta fresco, limpio y ligeramente jabonoso.", related: ["familias-olfativas", "jean-paul-gaultier-le-male"] },
  { term: "Attar", letter: "A", definition: "Perfume tradicional árabe sin alcohol, en base oleosa. Se aplica directamente sobre la piel en pequeñas cantidades. Es la forma original de perfumar y sigue siendo común en países del Golfo y la India.", related: [] },

  // B
  { term: "Benjuí", letter: "B", definition: "Resina aromática extraída de árboles del sudeste asiático. Aporta dulzor balsámico, casi vainillado, y se usa como fijador en perfumes orientales. Es uno de los pilares del acorde ámbar.", related: [] },
  { term: "Bergamota", letter: "B", definition: "Cítrico verde producido en Calabria (Italia) que abre miles de perfumes. Aporta una luminosidad fresca, ligeramente amarga y floral. Es el ingrediente más utilizado como nota de salida en perfumería occidental.", related: ["dior-sauvage-edp", "bleu-de-chanel-edp"] },
  { term: "Blotter", letter: "B", definition: "Tira de papel absorbente que se usa en perfumerías para probar fragancias. Útil para descartar perfumes rápidamente, pero no fiable para decidir compra: la piel cambia el aroma. Siempre se debe probar en piel antes de comprar.", related: ["como-elegir-perfume"] },

  // C
  { term: "Cachemira (Cashmeran)", letter: "C", definition: "Molécula sintética con olor cálido, ligeramente especiado y suave, evocando madera y almizcle. Aporta cremosidad y volumen a la base. Muy popular en perfumería contemporánea como sustituto de maderas naturales.", related: [] },
  { term: "Cardamomo", letter: "C", definition: "Especia verde-picante usada como nota de salida o corazón. Aporta frescura especiada sin pesadez. Aparece en perfumes como YSL L'Homme o La Nuit de L'Homme.", related: ["ysl-la-nuit-de-lhomme"] },
  { term: "Cedro", letter: "C", definition: "Madera presente en miles de perfumes como nota de fondo. Aporta sequedad amaderada, ligeramente lapicera, y excelente fijación. Versátil tanto en perfumes masculinos como femeninos.", related: [] },
  { term: "Chipre", letter: "C", definition: "Familia olfativa construida sobre un acorde clásico de bergamota, musgo de roble, labdanum y pachulí. Su perfume fundacional, Chypre de Coty (1917), ya no se produce, pero el acorde sigue presente en miles de perfumes como Aventus, Coco Mademoiselle o Aramis.", related: ["familias-olfativas", "creed-aventus", "chanel-coco-mademoiselle"] },
  { term: "Cidra", letter: "C", definition: "Cítrico parecido al limón pero con cáscara más gruesa y aroma más complejo. Aparece en perfumes mediterráneos modernos como Mancera Cedrat Boisé.", related: ["mancera-cedrat-boise"] },
  { term: "Cítrico", letter: "C", definition: "Familia olfativa de cítricos frescos: bergamota, limón, mandarina, pomelo, naranja. Es la familia más volátil y efímera, ideal para verano y oficinas. Acqua di Parma Colonia y Eau d'Hadrien son referencias clásicas.", related: ["familias-olfativas", "acqua-di-parma-colonia"] },
  { term: "Cologne", letter: "C", definition: "Concentración de perfume entre 2% y 5% de esencia. Es la más diluida tras la Eau Fraîche y dura entre 2 y 4 horas en piel. Tradicionalmente cítrico-aromática.", related: ["diferencia-edp-edt-edc-parfum"] },
  { term: "Concentración", letter: "C", definition: "Porcentaje de esencia aromática en un perfume. De más a menos: Parfum (20-40%), EDP (15-20%), EDT (5-15%), EDC (2-5%). Más concentración significa más intensidad, proyección y duración, pero también más precio.", related: ["diferencia-edp-edt-edc-parfum"] },

  // D
  { term: "Decant", letter: "D", definition: "Porción del perfume original (2-10 ml) trasvasada a un atomizador pequeño para probar la fragancia sin pagar el frasco entero. Permite descubrir perfumes caros con muy poco gasto. La forma más inteligente de explorar perfumería.", related: ["decants-splits-muestras"] },

  // E
  { term: "Eau de Cologne (EDC)", letter: "E", definition: "Concentración de perfume entre 2% y 5% de esencia, duración 2-4 horas. Las colonias clásicas como Acqua di Parma Colonia son EDC. Ideal para refrescar varias veces al día en verano.", related: ["diferencia-edp-edt-edc-parfum", "acqua-di-parma-colonia"] },
  { term: "Eau de Parfum (EDP)", letter: "E", definition: "Concentración estándar moderna del 15-20% de esencia. Dura 7-10 horas con buena proyección. La mayoría de los grandes lanzamientos actuales son EDP por su equilibrio entre intensidad y comodidad.", related: ["diferencia-edp-edt-edc-parfum"] },
  { term: "Eau de Toilette (EDT)", letter: "E", definition: "Concentración del 5-15% de esencia. Dura 4-7 horas, es más fresca y aireada que un EDP. Ideal para uso diario y climas cálidos. Muchos clásicos masculinos son EDT.", related: ["diferencia-edp-edt-edc-parfum"] },
  { term: "Eau Fraîche", letter: "E", definition: "La concentración más diluida (menos del 3%, principalmente agua aromatizada). Dura 1-2 horas. Pensada para refrescar en verano, no para durar.", related: ["diferencia-edp-edt-edc-parfum"] },
  { term: "Enfleurage", letter: "E", definition: "Técnica tradicional de extracción de aromas florales delicados (jazmín, tuberosa) usando grasa animal. Hoy es casi inexistente por su coste y se sustituye por extracción con disolventes. Era la técnica original de Grasse.", related: [] },
  { term: "Estela", letter: "E", definition: "El conjunto del rastro que tu perfume deja en el entorno: tanto la proyección (lo que se huele cerca) como el sillage (rastro en el aire). Una buena estela hace que te recuerden después de marcharte.", related: ["sillage-proyeccion-estela"] },
  { term: "Extrait de Parfum", letter: "E", definition: "Concentración más alta del perfume, entre 20% y 40% de esencia. Dura 10-14 horas y proyecta de forma íntima en lugar de explosiva. Es la versión más pura y más cara.", related: ["diferencia-edp-edt-edc-parfum"] },

  // F
  { term: "Familia olfativa", letter: "F", definition: "Clasificación que agrupa perfumes según su carácter dominante. Las siete grandes son: floral, oriental, chipre, amaderada, aromática (fougère), cítrica y gourmand. Conocer tu familia preferida acelera tu búsqueda de fragancias.", related: ["familias-olfativas"] },
  { term: "Fijador", letter: "F", definition: "Sustancia que prolonga la duración del perfume en la piel ralentizando la evaporación de las moléculas más volátiles. Almizcle, ámbar, vainilla, resinas y maderas son fijadores comunes.", related: [] },
  { term: "Floral", letter: "F", definition: "Familia olfativa más amplia y tradicional. Dominan rosa, jazmín, tuberosa, peonía, lirio, ylang-ylang, flor de azahar. Va de florales solares y luminosos hasta blancos opulentos y narcóticos.", related: ["familias-olfativas"] },
  { term: "Fougère", letter: "F", definition: "Subfamilia aromática construida sobre lavanda, cumarina y musgo de roble. Es el código clásico del perfume masculino moderno (Le Male, Drakkar, Cool Water). Limpio, jabonoso y refrescante.", related: ["familias-olfativas", "jean-paul-gaultier-le-male"] },

  // G
  { term: "Galbanum", letter: "G", definition: "Resina verde-amarga procedente de Irán. Aporta una nota cortante a hierba aplastada o tallo verde. Característico de los chipres verdes clásicos y de algunos florales aldehídicos.", related: [] },
  { term: "Gardenia", letter: "G", definition: "Flor blanca de aroma cremoso, ligeramente animal y mantecoso. Casi imposible de extraer naturalmente, se reconstruye con materiales sintéticos. Aparece en perfumes femeninos opulentos.", related: [] },
  { term: "Gourmand", letter: "G", definition: "Familia olfativa más joven (1992) que evoca aromas comestibles: vainilla, caramelo, chocolate, café, miel, frutos secos. Mugler Angel fue su pionero. La perfumería 'apetitosa' moderna.", related: ["familias-olfativas", "mugler-angel"] },

  // H
  { term: "Haba tonka", letter: "H", definition: "Semilla brasileña que huele a vainilla, almendra amarga, heno y caramelo. Fundamental en miles de perfumes orientales y gourmand. Cremosa, cálida y muy comercial.", related: [] },
  { term: "Hedione", letter: "H", definition: "Molécula sintética que evoca un jazmín limpio, ventilado y luminoso. Inventada en 1962 y popularizada por Edmond Roudnitska en Eau Sauvage (1966). Hoy aparece en casi todos los perfumes modernos.", related: ["dior-eau-sauvage"] },

  // I
  { term: "IFRA", letter: "I", definition: "International Fragrance Association: organismo que regula qué moléculas y en qué cantidades se pueden usar en perfumería para evitar alergias y problemas de salud. Sus restricciones son cada vez más estrictas y afectan a muchas formulaciones clásicas.", related: [] },
  { term: "Incienso", letter: "I", definition: "Resina del árbol Boswellia, también llamada olíbano. Aporta una espiritualidad ahumada, balsámica y ligeramente cítrica. Pilar de orientales serios y de muchos perfumes meditativos.", related: [] },
  { term: "Iris", letter: "I", definition: "Una de las materias primas más caras del mundo (extraída de la raíz del rizoma tras 3 años de secado). Aporta una nota pulverulenta, fría, ligeramente carnal. Estrella de perfumes como Dior Homme.", related: ["dior-homme-intense"] },

  // J
  { term: "Jazmín", letter: "J", definition: "Flor blanca esencial en perfumería. Aporta sensualidad floral, ligeramente indólica (animal). Existen el jazmín sambac (más solar, oriental) y el jazmín grandiflorum (más limpio y europeo).", related: [] },

  // L
  { term: "Labdanum", letter: "L", definition: "Resina extraída de la jara, con olor amaderado, ambarino y ligeramente cuero. Es uno de los pilares del acorde ámbar y del chipre. Aporta calidez y profundidad oriental.", related: [] },
  { term: "Lavanda", letter: "L", definition: "Hierba aromática mediterránea, base del fougère masculino tradicional. En la perfumería contemporánea ha cruzado al universo femenino (YSL Libre). Aporta limpieza herbácea muy reconocible.", related: ["ysl-libre"] },
  { term: "Layering", letter: "L", definition: "Técnica de combinar dos o más perfumes a la vez para crear un aroma personalizado. Casas como Jo Malone están diseñadas específicamente para mezclar entre sí. Funciona mejor combinando un perfume potente con uno limpio.", related: [] },

  // M
  { term: "Maceración", letter: "M", definition: "Proceso de envejecimiento de un perfume en su frasco. Algunas fragancias se desarrollan y mejoran tras semanas o meses cerradas. Los aficionados notan diferencia entre lotes nuevos y reposados.", related: [] },
  { term: "Almizcle (Musk)", letter: "M", definition: "Originalmente proviene de las glándulas del ciervo almizclero (hoy prohibido), se usa en forma sintética. Aporta calidez sensual, ligeramente animal, y excelente fijación. Hay decenas de almizcles sintéticos con perfiles distintos.", related: [] },
  { term: "Musgo de roble", letter: "M", definition: "Liquen recogido de los robles, con olor verde-cuero-húmedo. Base esencial del acorde chipre clásico, hoy restringido por IFRA en proporciones bajas.", related: [] },

  // N
  { term: "Nariz (Nez)", letter: "N", definition: "Apodo para los perfumistas profesionales. Las grandes 'narices' actuales incluyen a Francis Kurkdjian, Jacques Polge, Jean-Claude Ellena y Dominique Ropion. Tardan 10-15 años en formarse.", related: ["grandes-perfumistas"] },
  { term: "Neroli", letter: "N", definition: "Aceite esencial extraído de las flores del naranjo amargo. Aporta una frescura floral solar muy mediterránea. Usado en colonias clásicas y perfumes elegantes diurnos.", related: [] },
  { term: "Notas de fondo (Base)", letter: "N", definition: "Las moléculas más pesadas de un perfume, que aparecen entre 4 y 12 horas después de aplicar. Maderas, ámbar, resinas, almizcle y vainilla son típicas. Definen el carácter duradero del perfume en piel.", related: ["notas-olfativas-piramide"] },
  { term: "Notas de corazón (Heart)", letter: "N", definition: "Las moléculas que se desarrollan entre 30 minutos y 4 horas tras aplicar. Florales y especias suelen aquí. Son el alma del perfume y lo que más tiempo te acompaña durante el día.", related: ["notas-olfativas-piramide"] },
  { term: "Notas de salida (Top)", letter: "N", definition: "Las moléculas más volátiles, que se huelen los primeros 15-30 minutos: cítricos, hierbas, frutas aireadas. Son la primera impresión del perfume pero se evaporan rápido para dar paso al corazón.", related: ["notas-olfativas-piramide"] },

  // O
  { term: "Oriental", letter: "O", definition: "Familia olfativa cálida y especiada dominada por vainilla, ámbar, resinas y especias dulces. Sensual y nocturna por excelencia. Guerlain Shalimar (1925) inauguró la familia y sigue siendo referencia.", related: ["familias-olfativas", "guerlain-shalimar"] },
  { term: "Oud", letter: "O", definition: "Madera infectada del árbol de agar, considerada la materia prima más cara del mundo. Aroma denso, animal, resinoso y profundo. Pilar de la perfumería árabe y, desde 2007 (Tom Ford Oud Wood), también del nicho occidental.", related: ["tom-ford-oud-wood", "initio-oud-for-greatness"] },

  // P
  { term: "Pachulí", letter: "P", definition: "Planta del sudeste asiático con olor terroso, ligeramente alcanforado y chocolateado. Base del acorde chipre y muy presente en orientales modernos. Le da profundidad y carácter a casi cualquier perfume.", related: [] },
  { term: "Parfum", letter: "P", definition: "Concentración más alta del perfume (20-40% de esencia). Dura 10-14 horas. También llamado Extrait. Se aplica en pocas pulverizaciones y es la versión más íntima y duradera.", related: ["diferencia-edp-edt-edc-parfum"] },
  { term: "Pirámide olfativa", letter: "P", definition: "Esquema clásico que representa cómo evoluciona un perfume en el tiempo: notas de salida (primeros 30 min), de corazón (30 min-4 h) y de fondo (4-12 h). Inventada por Edmond Roudnitska como herramienta pedagógica.", related: ["notas-olfativas-piramide"] },
  { term: "Proyección", letter: "P", definition: "Distancia a la que se percibe tu perfume desde tu cuerpo. Proyección baja = solo te lo huele alguien muy cerca; alta = te lo huelen al entrar en una habitación. Depende de concentración, materias primas y piel.", related: ["sillage-proyeccion-estela"] },

  // R
  { term: "Rosa", letter: "R", definition: "Reina de la perfumería. Hay decenas de variedades, pero las principales en perfumería son la Rosa Damascena (Bulgaria/Turquía, más oriental) y la Rosa Centifolia o de Mayo (Grasse, más fresca y miel).", related: [] },

  // S
  { term: "Sándalo", letter: "S", definition: "Madera cremosa, suave y aterciopelada. El sándalo de Mysore (India) es el más cotizado pero está restringido. Hoy se usa principalmente sándalo de Australia y Nueva Caledonia, o sintéticos como Javanol.", related: [] },
  { term: "Sillage", letter: "S", definition: "Palabra francesa que significa 'estela' en náutica. En perfumería se refiere al rastro que tu perfume deja en el aire por donde pasas. Buen sillage = te identifican por el aroma incluso después de marcharte.", related: ["sillage-proyeccion-estela"] },
  { term: "Split", letter: "S", definition: "Decant colaborativo: un grupo de personas se reparte un frasco original entre todos, pagando cada uno su porción. La forma más barata de probar perfumes muy caros (Roja Dove, Amouage Attars, Tom Ford Private extreme).", related: ["decants-splits-muestras"] },

  // T
  { term: "Tabaco", letter: "T", definition: "Hoja curada del tabaco, presente en perfumes como notas dulces, amieladas o cuero. Tom Ford Tobacco Vanille es el referente moderno. La calidad del tabaco perfume es muy distinta a la del tabaco fumable.", related: ["tom-ford-tobacco-vanille"] },
  { term: "Tuberosa", letter: "T", definition: "Flor blanca opulenta, narcótica, con un punto cremoso y otro carnoso casi animal. Es una de las flores más polarizadoras: o la amas o la odias. Estrella de Carnal Flower o Fracas.", related: ["frederic-malle-carnal-flower"] },

  // V
  { term: "Vainilla", letter: "V", definition: "La nota dulce más popular y comercial. La vainilla de Madagascar es la más cotizada. Aparece en orientales, gourmand y como fijador en miles de fórmulas. Cremosa, golosa y reconfortante.", related: [] },
  { term: "Vetiver", letter: "V", definition: "Hierba aromática del sudeste asiático cuya raíz se destila. Aporta un olor terroso, verde, ahumado y ligeramente ácido. Pilar de perfumes masculinos elegantes como Terre d'Hermès o Tom Ford Grey Vetiver.", related: ["hermes-terre-dhermes", "tom-ford-grey-vetiver"] },

  // Y
  { term: "Ylang-ylang", letter: "Y", definition: "Flor amarilla de Madagascar y Filipinas, con olor exuberante, dulce, ligeramente platanado y solar. Pilar de florales blancos opulentos y de orientales clásicos como Chanel N°5.", related: ["chanel-no-5"] },
];

export function getGlossaryByLetter() {
  const grouped = {};
  for (const entry of GLOSSARY) {
    if (!grouped[entry.letter]) grouped[entry.letter] = [];
    grouped[entry.letter].push(entry);
  }
  return grouped;
}
