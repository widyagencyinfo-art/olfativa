"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Envia un pageview a /api/track en cada cambio de ruta. No bloquea
// el render ni recoge datos personales (solo path + geo de Vercel).
export default function TrackBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    // No trackear el panel de admin
    if (pathname && pathname.startsWith("/admin")) return;
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname }),
        signal: ctrl.signal,
        keepalive: true
      }).catch(() => {});
    }, 300);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [pathname]);

  return null;
}
