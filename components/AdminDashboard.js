"use client";

import { useState, useEffect, useRef } from "react";

function useCounter(target, duration = 1200) {
  const [val, setVal] = useState(0);
  const rafRef = useRef();
  useEffect(() => {
    if (target == null) return;
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return val;
}

function StatCard({ label, value, sub, color = "#9c7a4d", pulse = false }) {
  const animated = useCounter(typeof value === "number" ? value : 0);
  const shown = typeof value === "number" ? animated : value;
  return (
    <div className={`adm-card ${pulse ? "adm-pulse" : ""}`}>
      <div className="adm-card-label">{label}</div>
      <div className="adm-card-value" style={{ color }}>
        {typeof value === "number" ? shown.toLocaleString("es-ES") : shown}
      </div>
      {sub && <div className="adm-card-sub">{sub}</div>}
    </div>
  );
}

function BarChart({ days }) {
  if (!days || days.length === 0) return null;
  const max = Math.max(1, ...days.map((d) => d.views));
  const n = days.length;
  const dense = n > 20; // muchos dias: ocultar numeros, etiquetas espaciadas
  const labelEvery = n > 60 ? 10 : n > 30 ? 5 : n > 14 ? 3 : 1;
  return (
    <div className="adm-bars">
      {days.map((d, i) => {
        const pct = (d.views / max) * 100;
        const label = d.date.slice(5); // MM-DD
        const isToday = i === days.length - 1;
        const showLabel = (n - 1 - i) % labelEvery === 0;
        return (
          <div key={i} className="adm-bar-col" title={`${d.date}: ${d.views} visitas`}>
            <div className="adm-bar-wrap">
              <div
                className="adm-bar"
                style={{
                  height: `${Math.max(2, pct)}%`,
                  background: isToday ? "#229ED9" : "#9c7a4d"
                }}
              >
                {!dense && d.views > 0 && (
                  <span className="adm-bar-num">{d.views}</span>
                )}
              </div>
            </div>
            <span className="adm-bar-label">{showLabel ? label : ""}</span>
          </div>
        );
      })}
    </div>
  );
}

function StatusDot({ status }) {
  const color =
    status === "ok"
      ? "#2c7d4f"
      : status === "warn"
      ? "#d4a64d"
      : "#c44";
  return (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 10px ${color}`,
        animation: status === "ok" ? "adm-pulse-dot 2s infinite" : "none"
      }}
    />
  );
}

function formatTimeUntil(date) {
  const diff = date.getTime() - Date.now();
  if (diff < 0) return "ahora";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m`;
}

function getNextCronTime() {
  // 09:00, 13:00, 18:00, 21:00 Madrid
  const slots = [9, 13, 18, 21];
  const now = new Date();
  const madridHour = (now.getUTCHours() + 2) % 24; // verano CEST aprox
  for (const s of slots) {
    if (s > madridHour) {
      const d = new Date(now);
      d.setUTCHours((s - 2 + 24) % 24, 0, 0, 0);
      return d;
    }
  }
  // proximo dia 09:00
  const d = new Date(now);
  d.setUTCDate(d.getUTCDate() + 1);
  d.setUTCHours(7, 0, 0, 0);
  return d;
}

export default function AdminDashboard({ initialKey }) {
  const [key, setKey] = useState(initialKey || "");
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [range, setRange] = useState(14);

  async function fetchStats(k, rangeDays = range) {
    try {
      const resp = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: k, range: rangeDays }),
        cache: "no-store"
      });
      if (resp.status === 401) {
        setErr("Clave incorrecta");
        setAuthed(false);
        return;
      }
      const data = await resp.json();
      setStats(data);
      setAuthed(true);
      setErr(null);
    } catch (e) {
      setErr("Error de red");
    }
  }

  function changeRange(r) {
    setRange(r);
    fetchStats(key, r);
  }

  useEffect(() => {
    if (initialKey) fetchStats(initialKey);
  }, [initialKey]);

  useEffect(() => {
    if (!authed) return;
    const intervalStats = setInterval(() => fetchStats(key), 30000);
    const intervalNow = setInterval(() => setNow(Date.now()), 60000);
    return () => {
      clearInterval(intervalStats);
      clearInterval(intervalNow);
    };
  }, [authed, key]);

  if (!authed) {
    return (
      <div className="adm-login">
        <h1>🔐 Admin Olfativa</h1>
        <p>Introduce la clave de acceso</p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="clave..."
          onKeyDown={(e) => e.key === "Enter" && fetchStats(key)}
          autoFocus
        />
        <button onClick={() => fetchStats(key)} className="btn">
          Entrar →
        </button>
        {err && <div className="adm-err">{err}</div>}
      </div>
    );
  }

  if (!stats) return <div style={{ padding: 40 }}>Cargando…</div>;

  const nextCron = getNextCronTime();
  const a = stats.analytics || {};

  return (
    <div className="adm-wrap">
      <header className="adm-header">
        <div>
          <h1>📊 Dashboard Olfativa</h1>
          <div className="adm-meta">
            Actualizado{" "}
            {new Date(stats.timestamp).toLocaleTimeString("es-ES")} · auto-refresh 30s
          </div>
        </div>
        <div className="adm-status">
          <StatusDot status={stats.health.online ? "ok" : "err"} />
          <span>{stats.health.online ? "Online" : "Offline"}</span>
          <span className="adm-meta">cache: {stats.health.cache}</span>
        </div>
      </header>

      {a.available ? (
        <>
          <section>
            <h2>👁️ Visitas</h2>
            <div className="adm-grid">
              <StatCard
                label="🟢 Online ahora"
                value={a.online || 0}
                sub="últimos 5 min"
                color="#2c7d4f"
                pulse
              />
              <StatCard
                label="Visitas hoy"
                value={a.todayViews || 0}
                color="#229ED9"
              />
              <StatCard
                label="Ayer"
                value={a.yesterdayViews || 0}
                color="#8a8278"
              />
              <StatCard
                label="Últimos 7 días"
                value={a.last7 || 0}
                color="#7d6b9c"
              />
              <StatCard
                label="Últimos 30 días"
                value={a.last30 || 0}
                color="#5b9e8e"
              />
              <StatCard
                label="Últimos 90 días"
                value={a.last90 || 0}
                color="#c47a32"
              />
              <StatCard
                label="Total histórico"
                value={a.total || 0}
                color="#9c7a4d"
              />
            </div>

            <div className="adm-chart">
              <div className="adm-chart-head">
                <div className="adm-chart-title">
                  Visitas por día · últimos {range} días
                </div>
                <div className="adm-range-tabs">
                  {[7, 14, 30, 60, 90].map((r) => (
                    <button
                      key={r}
                      className={`adm-range-tab ${range === r ? "active" : ""}`}
                      onClick={() => changeRange(r)}
                    >
                      {r}d
                    </button>
                  ))}
                </div>
              </div>
              <BarChart days={a.days || []} />
            </div>
          </section>

          <section>
            <div className="adm-three-col">
              <div>
                <h2>🔝 Páginas más visitadas</h2>
                <div className="adm-list">
                  {(a.pages || []).length === 0 && (
                    <div className="adm-empty">Aún sin datos</div>
                  )}
                  {(a.pages || []).map((p, i) => (
                    <div key={i} className="adm-list-row">
                      <span className="adm-list-rank">{i + 1}</span>
                      <span className="adm-list-name">{p.path}</span>
                      <span className="adm-list-val">{p.views}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2>🏙️ Ciudades y pueblos</h2>
                <div className="adm-list">
                  {(a.cities || []).length === 0 && (
                    <div className="adm-empty">Aún sin datos</div>
                  )}
                  {(a.cities || []).map((c, i) => (
                    <div key={i} className="adm-list-row">
                      <span className="adm-list-rank">{i + 1}</span>
                      <span className="adm-list-name">📍 {c.name}</span>
                      <span className="adm-list-val">{c.views}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2>🌍 Países</h2>
                <div className="adm-list">
                  {(a.countries || []).length === 0 && (
                    <div className="adm-empty">Aún sin datos</div>
                  )}
                  {(a.countries || []).map((c, i) => (
                    <div key={i} className="adm-list-row">
                      <span className="adm-list-flag">{c.flag}</span>
                      <span className="adm-list-name">{c.name}</span>
                      <span className="adm-list-val">{c.views}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section>
          <div className="adm-empty" style={{ padding: 24 }}>
            📊 Analytics inicializándose. Las visitas aparecerán aquí en
            cuanto la gente navegue por olfativa.es.
          </div>
        </section>
      )}

      <section>
        <h2>🏷️ Catálogo</h2>
        <div className="adm-grid">
          <StatCard
            label="Perfumes"
            value={stats.catalog.perfumes}
            sub={`${stats.catalog.withRealPhoto} con foto real`}
          />
          <StatCard label="Clones" value={stats.catalog.clones} color="#c47a32" />
          <StatCard label="Guías" value={stats.catalog.guides} color="#5b9e8e" />
          <StatCard label="Listas mejores" value={stats.catalog.lists} color="#7d6b9c" />
          <StatCard label="Glosario" value={stats.catalog.glossary} color="#a45f8e" />
          <StatCard label="Marcas" value={stats.catalog.brands} color="#3d7567" />
          <StatCard label="Familias" value={stats.catalog.families} color="#dab63c" />
          <StatCard
            label="Precio medio"
            value={`${stats.catalog.avgPrice}€`}
            color="#5897c4"
          />
        </div>
      </section>

      <section>
        <h2>📨 Telegram</h2>
        <div className="adm-grid">
          <StatCard
            label="Suscriptores"
            value={stats.telegram.memberCount || 0}
            sub={stats.telegram.username ? `@${stats.telegram.username}` : ""}
            color="#229ED9"
            pulse
          />
          <StatCard
            label="Bot inline mode"
            value={
              stats.telegram.botActive ? "✓ Activo" : "✗ Sin webhook"
            }
            sub={stats.telegram.botActive ? "@olfativa_bot" : ""}
            color={stats.telegram.botActive ? "#2c7d4f" : "#c44"}
          />
          <StatCard
            label="Pendientes"
            value={stats.telegram.webhookPending || 0}
            sub="updates en cola"
            color="#d4a64d"
          />
          <StatCard
            label="Próximo post"
            value={formatTimeUntil(nextCron)}
            sub={`a las ${nextCron.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit"
            })}`}
            color="#9c7a4d"
          />
        </div>
        {stats.nextPost && (
          <div className="adm-next-post">
            <span className="adm-meta">Siguiente perfume del día:</span>{" "}
            <strong>
              {stats.nextPost.name} — {stats.nextPost.brand}
            </strong>
          </div>
        )}
      </section>

      <section>
        <h2>🌐 SEO</h2>
        <div className="adm-grid">
          <StatCard
            label="URLs en sitemap"
            value={stats.sitemapUrls}
            color="#5b9e8e"
          />
          <StatCard
            label="Páginas zodiacal"
            value={stats.catalog.zodiacSigns}
            color="#a45f8e"
          />
          <StatCard
            label="Páginas detalle"
            value={stats.catalog.perfumes}
            sub="+ alternativas"
            color="#9c7a4d"
          />
        </div>
        <div className="adm-links">
          <a
            href="https://search.google.com/search-console?resource_id=sc-domain%3Aolfativa.es"
            target="_blank"
            rel="noopener"
            className="adm-link"
          >
            🔍 Google Search Console →
          </a>
          <a
            href="https://vercel.com/dariopmemprendimientos-projects/olfativa/analytics"
            target="_blank"
            rel="noopener"
            className="adm-link"
          >
            📈 Vercel Analytics (visitas en vivo) →
          </a>
          <a
            href="https://www.bing.com/webmasters/home/mysites?siteUrl=https://olfativa.es/"
            target="_blank"
            rel="noopener"
            className="adm-link"
          >
            🌐 Bing Webmaster →
          </a>
          <a
            href="https://t.me/olfativacomunidad"
            target="_blank"
            rel="noopener"
            className="adm-link"
          >
            📨 Canal Telegram →
          </a>
          <a
            href="https://github.com/widyagencyinfo-art/olfativa/actions/workflows/social-bot.yml"
            target="_blank"
            rel="noopener"
            className="adm-link"
          >
            🤖 Workflow bot (GitHub) →
          </a>
        </div>
      </section>

      <section>
        <h2>🔋 Salud del sistema</h2>
        <div className="adm-health">
          <div className="adm-health-row">
            <StatusDot status={stats.health.online ? "ok" : "err"} />
            <span>Sitio principal</span>
            <span className="adm-meta">HTTP {stats.health.status}</span>
          </div>
          <div className="adm-health-row">
            <StatusDot
              status={stats.telegram.available ? "ok" : "err"}
            />
            <span>API Telegram</span>
            <span className="adm-meta">
              {stats.telegram.available ? "conectado" : "sin token"}
            </span>
          </div>
          <div className="adm-health-row">
            <StatusDot
              status={stats.telegram.botActive ? "ok" : "warn"}
            />
            <span>Webhook bot inline</span>
            <span className="adm-meta">
              {stats.telegram.webhookUrl
                ? new URL(stats.telegram.webhookUrl).pathname
                : "no configurado"}
            </span>
          </div>
          <div className="adm-health-row">
            <StatusDot
              status={stats.catalog.withRealPhoto > 300 ? "ok" : "warn"}
            />
            <span>Fotos reales</span>
            <span className="adm-meta">
              {stats.catalog.withRealPhoto}/{stats.catalog.perfumes} (
              {Math.round(
                (stats.catalog.withRealPhoto * 100) / stats.catalog.perfumes
              )}
              %)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
