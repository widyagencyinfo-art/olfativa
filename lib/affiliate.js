// Configuración de afiliación.
// Cuando te des de alta en un programa (Amazon Afiliados, Awin/Notino, etc.),
// rellena los identificadores aquí: TODOS los enlaces de compra del sitio
// los usarán automáticamente. No hace falta tocar nada más.

export const affiliateConfig = {
  // ID de Amazon Afiliados España, p. ej. "olfativa-21".
  amazonTag: "",
  // Parámetro de afiliado para Notino (vía Awin u otra red), p. ej. "?a=TU_ID".
  notinoSuffix: "",
};

function query(perfume) {
  return encodeURIComponent(
    `${perfume.brand} ${perfume.name} ${perfume.concentration}`
  );
}

// Devuelve las tiendas donde el usuario puede comprar el perfume.
// Los enlaces funcionan ya; al añadir los identificadores arriba se
// convierten en enlaces de afiliado que generan comisión.
export function buyLinks(perfume) {
  const q = query(perfume);
  const tag = affiliateConfig.amazonTag
    ? `&tag=${affiliateConfig.amazonTag}`
    : "";
  return [
    {
      name: "Amazon",
      url: `https://www.amazon.es/s?k=${q}${tag}`,
    },
    {
      name: "Notino",
      url: `https://www.notino.es/buscar/?q=${q}${affiliateConfig.notinoSuffix}`,
    },
    {
      name: "Druni",
      url: `https://www.druni.es/buscar?controller=search&s=${q}`,
    },
  ];
}
