"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Anima las secciones al entrar en el viewport (fade + slide up).
// Solo oculta las que estan por debajo del fold para evitar flash en
// el contenido visible al cargar. Respeta prefers-reduced-motion.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const sections = Array.from(document.querySelectorAll("section.section"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );

    const vh = window.innerHeight;
    sections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Solo animar las que están por debajo del fold (evita flash arriba)
      if (rect.top > vh * 0.85) {
        el.classList.add("reveal-section");
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
