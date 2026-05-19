"use client";

import { useState, useMemo } from "react";
import PerfumeGrid from "./PerfumeGrid";

const GENDERS = [
  { slug: "", label: "Todos" },
  { slug: "hombre", label: "Hombre" },
  { slug: "mujer", label: "Mujer" },
  { slug: "unisex", label: "Unisex" },
];

const SEASONS = [
  { slug: "", label: "Todas" },
  { slug: "primavera", label: "Primavera" },
  { slug: "verano", label: "Verano" },
  { slug: "otono", label: "Otoño" },
  { slug: "invierno", label: "Invierno" },
];

const PRICES = [
  { slug: "", label: "Cualquiera" },
  { slug: "low", label: "Hasta 80€" },
  { slug: "mid", label: "80€ - 160€" },
  { slug: "high", label: "Más de 160€" },
];

export default function PerfumeExplorer({ perfumes, families, brands }) {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("");
  const [season, setSeason] = useState("");
  const [family, setFamily] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return perfumes.filter((p) => {
      if (q) {
        const notes = [
          ...p.notes.top,
          ...p.notes.heart,
          ...p.notes.base,
        ]
          .join(" ")
          .toLowerCase();
        const hay =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          notes.includes(q);
        if (!hay) return false;
      }
      if (gender && p.gender !== gender) return false;
      if (season && !p.seasons.includes(season)) return false;
      if (family && p.family !== family) return false;
      if (brand && p.brandSlug !== brand) return false;
      if (price) {
        const min = p.priceRange.min;
        if (price === "low" && min > 80) return false;
        if (price === "mid" && (min < 80 || min > 160)) return false;
        if (price === "high" && min <= 160) return false;
      }
      return true;
    });
  }, [perfumes, query, gender, season, family, brand, price]);

  return (
    <div>
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="q">Buscar por nombre, marca o nota</label>
          <input
            id="q"
            type="search"
            className="search-box-input"
            placeholder="Ej. vainilla, Dior, Sauvage…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--text)",
              fontFamily: "inherit",
              fontSize: "0.95rem",
            }}
          />
        </div>

        <div className="filter-group">
          <label>Género</label>
          <div className="chip-row">
            {GENDERS.map((g) => (
              <button
                key={g.slug}
                className={`chip ${gender === g.slug ? "active" : ""}`}
                onClick={() => setGender(g.slug)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Temporada</label>
          <div className="chip-row">
            {SEASONS.map((s) => (
              <button
                key={s.slug}
                className={`chip ${season === s.slug ? "active" : ""}`}
                onClick={() => setSeason(s.slug)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Precio</label>
          <div className="chip-row">
            {PRICES.map((p) => (
              <button
                key={p.slug}
                className={`chip ${price === p.slug ? "active" : ""}`}
                onClick={() => setPrice(p.slug)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div className="filter-group">
            <label htmlFor="family">Familia olfativa</label>
            <select
              id="family"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              style={selectStyle}
            >
              <option value="">Todas las familias</option>
              {families.map((f) => (
                <option key={f.name} value={f.name}>
                  {f.name} ({f.count})
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="brand">Marca</label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              style={selectStyle}
            >
              <option value="">Todas las marcas</option>
              {brands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name} ({b.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="results-count">
        {filtered.length}{" "}
        {filtered.length === 1 ? "perfume encontrado" : "perfumes encontrados"}
      </p>
      <PerfumeGrid perfumes={filtered} />
    </div>
  );
}

const selectStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--bg)",
  color: "var(--text)",
  fontFamily: "inherit",
  fontSize: "0.92rem",
};
