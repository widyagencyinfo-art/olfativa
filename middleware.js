import { NextResponse } from "next/server";

// Cuando alguien entra a panel.olfativa.es, reescribimos internamente
// a /admin manteniendo la URL bonita. La pagina /admin sigue siendo
// accesible directamente por compatibilidad (con ?key=).
export function middleware(request) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  if (host === "panel.olfativa.es" || host.startsWith("panel.")) {
    // Si pide la raiz del panel, reescribir a /admin
    if (url.pathname === "/" || url.pathname === "") {
      url.pathname = "/admin";
      return NextResponse.rewrite(url);
    }
    // Mantener acceso a /api/admin/stats desde el panel
    if (url.pathname.startsWith("/api/")) {
      return NextResponse.next();
    }
    // Bloquear acceso a otras rutas (perfumes, etc.) desde panel
    if (!url.pathname.startsWith("/admin") && !url.pathname.startsWith("/_next")) {
      url.pathname = "/admin";
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Excluye assets estaticos
    "/((?!_next/static|_next/image|favicon|photos|icon|apple-icon|manifest|robots|sitemap).*)"
  ]
};
