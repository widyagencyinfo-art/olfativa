"use client";

import { useEffect, useRef, useState } from "react";
import { giscusConfig, giscusReady } from "@/lib/giscus";

export default function Comments({ term }) {
  const ref = useRef(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!giscusReady() || !ref.current) return;
    if (ref.current.querySelector("iframe.giscus-frame")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", giscusConfig.repo);
    script.setAttribute("data-repo-id", giscusConfig.repoId);
    script.setAttribute("data-category", giscusConfig.category);
    script.setAttribute("data-category-id", giscusConfig.categoryId);
    script.setAttribute("data-mapping", giscusConfig.mapping);
    script.setAttribute("data-term", term);
    script.setAttribute("data-reactions-enabled", giscusConfig.reactionsEnabled);
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", giscusConfig.lang);
    ref.current.appendChild(script);
  }, [term, theme]);

  if (!giscusReady()) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px dashed var(--border)",
          borderRadius: "var(--radius)",
          padding: "28px",
          color: "var(--text-soft)",
          fontSize: "0.92rem",
        }}
      >
        El foro se activará en cuanto se conecte el repositorio de GitHub.
        Configura los identificadores en <code>lib/giscus.js</code>.
      </div>
    );
  }

  return <div ref={ref} className="giscus" />;
}
