// Endpoint que devuelve todas las metricas del dashboard /admin.
// Agrega: catalogo, bot Telegram, build info, salud del sitio.
import { NextResponse } from "next/server";
import perfumesData from "@/data/perfumes.json";
import { CLONES } from "@/lib/clones";
import { GUIDES } from "@/lib/guides";
import { LISTS } from "@/lib/lists";
import { GLOSSARY } from "@/lib/glossary";
import { ZODIAC } from "@/lib/zodiac";
import { TELEGRAM_CHANNEL_HANDLE } from "@/lib/data";
import { pipeline, redisAvailable } from "@/lib/redis";

export const runtime = "edge";
export const revalidate = 0;

const COUNTRY_NAMES = {
  ES: "España", US: "EE.UU.", MX: "México", AR: "Argentina",
  CO: "Colombia", CL: "Chile", PE: "Perú", FR: "Francia",
  DE: "Alemania", GB: "Reino Unido", IT: "Italia", PT: "Portugal",
  BR: "Brasil", VE: "Venezuela", EC: "Ecuador", UY: "Uruguay",
  NL: "Países Bajos", BE: "Bélgica", CH: "Suiza", IE: "Irlanda",
  CA: "Canadá", MA: "Marruecos", DO: "R. Dominicana", "??": "Desconocido"
};

function flagEmoji(code) {
  if (!code || code.length !== 2) return "🌍";
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0))
  );
}

async function fetchAnalytics(rangeDays = 14) {
  if (!redisAvailable()) return { available: false };
  const now = Date.now();
  // Para los totales necesitamos hasta 90 dias; para el grafico el rango pedido
  const maxDays = 90;
  const allDays = [];
  for (let i = maxDays - 1; i >= 0; i--) {
    const d = new Date(now - i * 86400000).toISOString().slice(0, 10);
    allDays.push(d);
  }
  const days = allDays.slice(-rangeDays);
  const cmds = [
    ["GET", "pv:total"],
    ["ZCOUNT", "online", String(now - 5 * 60 * 1000), "+inf"],
    ["ZREVRANGE", "pv:pages", "0", "11", "WITHSCORES"],
    ["ZREVRANGE", "pv:countries", "0", "9", "WITHSCORES"],
    ["ZREVRANGE", "pv:cities", "0", "11", "WITHSCORES"],
    ...allDays.map((d) => ["GET", `pv:day:${d}`])
  ];
  const res = await pipeline(cmds);
  const total = parseInt(res[0] || "0", 10);
  const online = parseInt(res[1] || "0", 10);

  // Mapa fecha -> views para los 90 dias
  const allDayValues = res.slice(5).map((v, i) => ({
    date: allDays[i],
    views: parseInt(v || "0", 10)
  }));
  const sumLast = (n) =>
    allDayValues.slice(-n).reduce((s, d) => s + d.views, 0);

  // pages: [path, score, path, score...]
  const pagesRaw = res[2] || [];
  const pages = [];
  for (let i = 0; i < pagesRaw.length; i += 2) {
    pages.push({ path: pagesRaw[i], views: parseInt(pagesRaw[i + 1], 10) });
  }
  const countriesRaw = res[3] || [];
  const countries = [];
  for (let i = 0; i < countriesRaw.length; i += 2) {
    const code = countriesRaw[i];
    countries.push({
      code,
      name: COUNTRY_NAMES[code] || code,
      flag: flagEmoji(code),
      views: parseInt(countriesRaw[i + 1], 10)
    });
  }
  const citiesRaw = res[4] || [];
  const cities = [];
  for (let i = 0; i < citiesRaw.length; i += 2) {
    cities.push({ name: citiesRaw[i], views: parseInt(citiesRaw[i + 1], 10) });
  }
  // Grafico: solo los dias del rango pedido
  const dayValues = allDayValues.slice(-rangeDays);
  const todayViews = allDayValues[allDayValues.length - 1]?.views || 0;
  const yesterdayViews = allDayValues[allDayValues.length - 2]?.views || 0;

  return {
    available: true,
    total,
    online,
    todayViews,
    yesterdayViews,
    last7: sumLast(7),
    last30: sumLast(30),
    last60: sumLast(60),
    last90: sumLast(90),
    rangeDays,
    days: dayValues,
    pages,
    countries,
    cities
  };
}

async function fetchTelegramStats() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return { available: false };
  try {
    const [chat, webhook] = await Promise.all([
      fetch(
        `https://api.telegram.org/bot${token}/getChat?chat_id=${TELEGRAM_CHANNEL_HANDLE}`,
        { cache: "no-store" }
      ).then((r) => r.json()),
      fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`, {
        cache: "no-store"
      }).then((r) => r.json())
    ]);
    const memberRes = await fetch(
      `https://api.telegram.org/bot${token}/getChatMemberCount?chat_id=${TELEGRAM_CHANNEL_HANDLE}`,
      { cache: "no-store" }
    ).then((r) => r.json());
    return {
      available: true,
      title: chat.result?.title,
      username: chat.result?.username,
      memberCount: memberRes.result || 0,
      webhookUrl: webhook.result?.url,
      webhookPending: webhook.result?.pending_update_count || 0,
      botActive: !!webhook.result?.url
    };
  } catch (e) {
    return { available: false, error: String(e) };
  }
}

async function fetchSiteHealth() {
  try {
    const r = await fetch("https://olfativa.es/", {
      cache: "no-store",
      method: "HEAD"
    });
    return {
      online: r.ok,
      status: r.status,
      cache: r.headers.get("x-vercel-cache") || "n/a"
    };
  } catch (e) {
    return { online: false, error: String(e) };
  }
}

export async function POST(request) {
  const adminKey = process.env.OLFATIVA_ADMIN_TOKEN || "OLFATIVA1234";
  const body = await request.json().catch(() => ({}));
  if (body.key !== adminKey) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const validRanges = [7, 14, 30, 60, 90];
  const rangeDays = validRanges.includes(body.range) ? body.range : 14;

  const [telegram, health, analytics] = await Promise.all([
    fetchTelegramStats(),
    fetchSiteHealth(),
    fetchAnalytics(rangeDays)
  ]);

  // Catalogo stats
  const families = new Set(perfumesData.map((p) => p.family));
  const brands = new Set(perfumesData.map((p) => p.brand));
  const withImage = perfumesData.filter(
    (p) => p.image && p.image.startsWith("/photos")
  ).length;
  const totalPrice = perfumesData.reduce(
    (s, p) => s + (p.priceRange?.min || 0) + (p.priceRange?.max || 0),
    0
  );
  const avgPrice = Math.round(totalPrice / (perfumesData.length * 2));

  // Rotacion del bot: que se postearia ahora
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000
  );
  const nextPerfume = perfumesData[dayOfYear % perfumesData.length];

  return NextResponse.json({
    ok: true,
    timestamp: Date.now(),
    analytics,
    catalog: {
      perfumes: perfumesData.length,
      withRealPhoto: withImage,
      clones: CLONES.length,
      guides: GUIDES.length,
      lists: LISTS.length,
      glossary: GLOSSARY.length,
      zodiacSigns: ZODIAC.length,
      brands: brands.size,
      families: families.size,
      avgPrice
    },
    telegram,
    health,
    nextPost: nextPerfume
      ? {
          name: nextPerfume.name,
          brand: nextPerfume.brand,
          slug: nextPerfume.slug
        }
      : null,
    sitemapUrls:
      perfumesData.length * 2 + // perfumes + alternativas
      CLONES.length +
      GUIDES.length +
      LISTS.length +
      brands.size +
      ZODIAC.length +
      24 // estaticas
  });
}
