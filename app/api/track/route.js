// Endpoint de tracking de pageviews tipo Shopify.
// Cada visita registra: total, por dia, por pagina, por pais, y
// marca al visitante como "online" (sorted set por timestamp).
import { NextResponse } from "next/server";
import { pipeline, redisAvailable } from "@/lib/redis";

export const runtime = "edge";

function today() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function POST(request) {
  if (!redisAvailable()) {
    return NextResponse.json({ ok: false, reason: "no-redis" });
  }

  let body = {};
  try {
    body = await request.json();
  } catch (e) {}

  let path = (body.path || "/").slice(0, 120);
  // Normaliza: quita query y trailing slash
  path = path.split("?")[0].replace(/\/+$/, "") || "/";

  // Geo desde headers de Vercel
  const country =
    request.headers.get("x-vercel-ip-country") || "??";
  let city = request.headers.get("x-vercel-ip-city") || "";
  try {
    city = decodeURIComponent(city);
  } catch (e) {}

  // Visitor id: hash simple de IP+UA (no PII almacenable). Para "online".
  const ip = request.headers.get("x-forwarded-for") || "anon";
  const ua = request.headers.get("user-agent") || "";
  const vid = `${ip}-${ua}`.slice(0, 60);
  const now = Date.now();
  const day = today();

  // Filtra bots obvios
  if (/bot|crawler|spider|crawl|slurp|bingpreview|facebookexternalhit/i.test(ua)) {
    return NextResponse.json({ ok: true, skipped: "bot" });
  }

  await pipeline([
    ["INCR", "pv:total"],
    ["INCR", `pv:day:${day}`],
    ["EXPIRE", `pv:day:${day}`, "5184000"], // 60 dias
    ["ZINCRBY", "pv:pages", "1", path],
    ["ZINCRBY", "pv:countries", "1", country],
    ["ZADD", "online", String(now), vid],
    // limpia online > 5 min
    ["ZREMRANGEBYSCORE", "online", "-inf", String(now - 5 * 60 * 1000)],
    // ciudad (opcional, top ciudades)
    ...(city ? [["ZINCRBY", "pv:cities", "1", `${city}, ${country}`]] : [])
  ]);

  return NextResponse.json({ ok: true });
}
