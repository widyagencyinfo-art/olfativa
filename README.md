# Olfativa

Buscador y enciclopedia de perfumes. Cada perfume tiene su propia página
estática optimizada para SEO con notas, perfil olfativo, precio, marca,
historia y la mejor época del año para usarlo.

## Tecnología

- **Next.js 15** (App Router) con generación estática (SSG).
- Fuente de datos: un único archivo JSON (`data/perfumes.json`).
- CSS y JavaScript en archivos externos (sin estilos en línea).

## Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # build de producción
npm start        # sirve el build
```

## Estructura

```
app/
  page.js                  Home con buscador
  perfumes/[slug]/page.js   Ficha individual de cada perfume
  marcas/[slug]/page.js     Perfumes de una marca
  notas/[slug]/page.js      Perfumes que contienen una nota
  genero/[slug]/page.js     Perfumes por género
  temporada/[slug]/page.js  Perfumes por temporada
  buscar/page.js            Buscador avanzado con filtros
  sitemap.js / robots.js    SEO técnico
components/                 Componentes reutilizables
data/perfumes.json          Base de datos de perfumes
lib/data.js                 Acceso y helpers de datos
```

## Añadir un perfume nuevo

Edita `data/perfumes.json` y añade un objeto con esta forma:

```json
{
  "slug": "marca-nombre-concentracion",
  "name": "Nombre",
  "concentration": "Eau de Parfum",
  "brand": "Marca",
  "brandSlug": "marca",
  "gender": "hombre | mujer | unisex",
  "year": 2024,
  "perfumer": "Nombre del perfumista",
  "family": "Familia olfativa",
  "notes": {
    "top": ["..."],
    "heart": ["..."],
    "base": ["..."]
  },
  "priceRange": { "min": 60, "max": 110, "currency": "EUR" },
  "pricePerMl": 1.1,
  "seasons": ["primavera", "verano", "otono", "invierno"],
  "timeOfDay": ["dia", "noche"],
  "occasions": ["diario", "oficina", "cita", "eventos", "ocio"],
  "projection": "Media",
  "longevity": "7-9 horas",
  "history": "Texto de 100-300 palabras, único y bien redactado.",
  "similar": ["slug-1", "slug-2"],
  "rating": 4.2,
  "image": "/perfumes/marca-nombre.jpg"
}
```

El `slug` debe ser único. Las páginas de marca, nota, género y temporada se
generan automáticamente a partir de los datos.

## Imágenes de los perfumes

El campo `image` es opcional. Si está presente, la ficha y la tarjeta
muestran esa imagen; si no, se muestra una ilustración. Para añadir fotos
propias, coloca los archivos en `public/perfumes/` y apunta el campo a la
ruta (p. ej. `/perfumes/dior-sauvage.jpg`).

Cada ficha incluye además un botón **Ver fotos en Google Imágenes** que
abre una búsqueda del perfume, sin alojar material con derechos de autor.

## Foro de comentarios

Cada perfume tiene un foro propio con [Giscus](https://giscus.app), basado
en GitHub Discussions. Para activarlo:

1. Instala la app de Giscus en el repositorio: <https://github.com/apps/giscus>
2. Los identificadores ya están configurados en `lib/giscus.js`.

Mientras la app no esté instalada, el foro muestra un aviso en lugar de
cargar los comentarios.

## Despliegue

El proyecto es 100% estático y puede desplegarse en Vercel, Netlify o
cualquier hosting. Antes de publicar, actualiza `SITE_URL` en `lib/data.js`
con el dominio real.

## Nota sobre los datos

Los precios, notas y datos son orientativos y con fines divulgativos.
Conviene revisarlos con fuentes oficiales antes de un uso comercial.
