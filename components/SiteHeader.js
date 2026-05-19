"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV = [
  { href: "/perfumes", label: "Perfumes" },
  { href: "/mejores", label: "Mejores" },
  { href: "/comparativas", label: "Comparativas" },
  { href: "/marcas", label: "Marcas" },
  { href: "/genero/hombre", label: "Hombre" },
  { href: "/genero/mujer", label: "Mujer" },
  { href: "/buscar", label: "Buscar" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme");
    if (stored) setTheme(stored);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("olfativa-theme", next);
    } catch (e) {}
  }

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          Olfa<span>tiva</span>
        </Link>

        <button
          className="menu-btn"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`main-nav ${open ? "open" : ""}`}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <button
            className="theme-toggle"
            aria-label="Cambiar tema claro u oscuro"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </nav>
      </div>
    </header>
  );
}
