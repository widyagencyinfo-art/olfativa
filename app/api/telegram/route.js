// Webhook de Telegram para inline mode.
// Cuando alguien escribe "@olfativa_bot <query>" en cualquier chat,
// Telegram nos manda un POST aqui con inline_query. Devolvemos hasta
// 20 perfumes que matcheen con la query, cada uno con OG image y link
// a la ficha. Cada uso genera un backlink potencial a olfativa.es.
//
// Configuracion: setWebhook a https://olfativa.es/api/telegram con
// allowed_updates ["inline_query"] (se hace una vez via script).

import { NextResponse } from "next/server";
import perfumesData from "@/data/perfumes.json";
import { SITE_URL } from "@/lib/data";

export const runtime = "edge";

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function scorePerfume(p, terms) {
  const haystack = normalize(
    `${p.name} ${p.brand} ${p.family} ${p.notes.top.join(" ")} ${p.notes.heart.join(
      " "
    )} ${p.notes.base.join(" ")}`
  );
  let score = 0;
  for (const t of terms) {
    if (!t) continue;
    if (normalize(p.name).includes(t)) score += 10;
    if (normalize(p.brand).includes(t)) score += 6;
    if (haystack.includes(t)) score += 2;
  }
  return score;
}

function searchPerfumes(query, limit = 20) {
  const q = normalize(query).trim();
  if (!q) {
    // Sin query: top 20 por rating
    return [...perfumesData]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
  const terms = q.split(/\s+/);
  const scored = perfumesData
    .map((p) => ({ p, s: scorePerfume(p, terms) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit);
  return scored.map((x) => x.p);
}

function buildResult(p) {
  const url = `${SITE_URL}/perfumes/${p.slug}`;
  const ogImage = `${SITE_URL}/perfumes/${p.slug}/opengraph-image`;
  const topNotes = p.notes.top.slice(0, 3).join(", ").toLowerCase();
  const baseNotes = p.notes.base.slice(0, 2).join(" y ").toLowerCase();
  const description = `${p.family} · ${p.concentration} · ${p.year} · ${p.longevity}\n${topNotes} sobre ${baseNotes}`;

  return {
    type: "article",
    id: p.slug,
    title: `${p.name} — ${p.brand}`,
    description,
    thumbnail_url: ogImage,
    thumbnail_width: 1200,
    thumbnail_height: 630,
    input_message_content: {
      message_text: `🌸 ${p.name} — ${p.brand} (${p.year})\n\n${p.family} · ${p.concentration}\nSalida: ${topNotes}\nFondo: ${baseNotes}\nDuración: ${p.longevity}\n\n${url}`,
      disable_web_page_preview: false
    },
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Ver ficha completa en Olfativa →",
            url
          }
        ]
      ]
    }
  };
}

async function answerInlineQuery(token, queryId, results) {
  await fetch(`https://api.telegram.org/bot${token}/answerInlineQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inline_query_id: queryId,
      results,
      cache_time: 60,
      switch_pm_text: "📨 Suscribirme al canal Olfativa",
      switch_pm_parameter: "subscribe"
    })
  });
}

export async function POST(request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false, error: "no_token" });
  }

  let update;
  try {
    update = await request.json();
  } catch (e) {
    return NextResponse.json({ ok: false, error: "bad_json" });
  }

  // Inline query
  if (update.inline_query) {
    const { id, query } = update.inline_query;
    const perfumes = searchPerfumes(query, 20);
    const results = perfumes.map(buildResult);
    await answerInlineQuery(token, id, results);
    return NextResponse.json({ ok: true, handled: "inline_query", count: results.length });
  }

  // /start o cualquier mensaje al bot directamente
  if (update.message && update.message.chat) {
    const chatId = update.message.chat.id;
    const text = update.message.text || "";
    let reply;
    if (text.startsWith("/start")) {
      reply = `👋 Bienvenido a Olfativa.\n\n📨 Suscríbete al canal: https://t.me/olfativacomunidad\n\n🔍 Búscame en cualquier chat escribiendo @olfativa_bot <perfume>\n\n🌐 Enciclopedia: ${SITE_URL}`;
    } else {
      reply = `🌐 Cataloga 337+ perfumes. Búscame en cualquier chat con @olfativa_bot <nombre>.\n\nCanal: https://t.me/olfativacomunidad`;
    }
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: reply, disable_web_page_preview: false })
    });
    return NextResponse.json({ ok: true, handled: "message" });
  }

  return NextResponse.json({ ok: true, handled: "ignored" });
}

export async function GET() {
  return NextResponse.json({
    service: "Olfativa Telegram webhook",
    status: "ready"
  });
}
