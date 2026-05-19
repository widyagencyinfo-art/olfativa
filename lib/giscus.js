// Configuración del foro (Giscus, basado en GitHub Discussions).
// Tras crear el repositorio en GitHub e instalar la app de Giscus
// (https://github.com/apps/giscus), rellena estos valores. Puedes
// generarlos en https://giscus.app introduciendo el repositorio.
//
// Mientras "repoId" esté vacío, el foro muestra un aviso en lugar de cargar.

export const giscusConfig = {
  repo: "widyagencyinfo-art/olfativa",
  repoId: "R_kgDOSiJbEQ",
  category: "General",
  categoryId: "DIC_kwDOSiJbEc4C9Zhs",
  mapping: "specific",
  reactionsEnabled: "1",
  lang: "es",
};

export const giscusReady = () =>
  Boolean(giscusConfig.repoId && giscusConfig.categoryId);
