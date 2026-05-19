"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

export default function SearchBox({ index }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
      .slice(0, 7);
  }, [query, index]);

  const showDropdown = query.trim().length >= 2;

  return (
    <div className="search-box">
      <input
        type="search"
        placeholder="Busca un perfume o una marca…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar perfume"
      />
      {showDropdown && (
        <ul className="search-results">
          {results.length === 0 && (
            <li className="search-empty">Sin resultados para “{query}”.</li>
          )}
          {results.map((p) => (
            <li key={p.slug}>
              <Link href={`/perfumes/${p.slug}`}>
                <span className="res-name">{p.name}</span>
                <span className="res-meta">
                  {p.brand} · {p.gender}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
