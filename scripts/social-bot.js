// Bot de difusion social autonomo para Olfativa.
// Postea cada dia perfume del dia + clon + curiosidad olfativa
// a Telegram (canal broadcast), Bluesky, Mastodon y X / Twitter. Sin servidor.
//
// Disparado por GitHub Actions (2 veces/dia, mañana y tarde).
// Tokens en GitHub Secrets:
//   TELEGRAM_BOT_TOKEN     (token de @BotFather)
//   TELEGRAM_CHAT_ID       (id del canal, ej. @olfativa o -100123456)
//   BLUESKY_HANDLE         (ej. olfativa.bsky.social)
//   BLUESKY_PASSWORD       (app password, NO la contraseña principal)
//   MASTODON_INSTANCE      (ej. mastodon.social)
//   MASTODON_TOKEN         (access token desarrollador)
//   TWITTER_API_KEY        (X dev portal: API Key / Consumer Key)
//   TWITTER_API_SECRET     (X dev portal: API Secret / Consumer Secret)
//   TWITTER_ACCESS_TOKEN   (X dev portal: Access Token, permiso Read+Write)
//   TWITTER_ACCESS_SECRET  (X dev portal: Access Token Secret)
//
// Si una variable no esta configurada, esa red simplemente se salta.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SITE = "https://olfativa.es";

// =================== Carga de contenido ===================

const perfumes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "perfumes.json"), "utf-8")
);

// Cargar clones y guias parseando los modulos (son ES modules con export const).
function loadConst(file, name) {
  const txt = fs.readFileSync(path.join(__dirname, "..", "lib", file), "utf-8");
  const re = new RegExp(`export const ${name} = (\\[[\\s\\S]*?\\n\\]);`);
  const m = txt.match(re);
  if (!m) return [];
  // eval seguro porque el contenido lo controlamos nosotros
  return Function(`"use strict"; return (${m[1]})`)();
}

const clones = loadConst("clones.js", "CLONES");
const guides = loadConst("guides.js", "GUIDES");

// =================== Seleccion rotativa ===================

// Determinista: cada dia X del año coge el item X % length.
// Asi nunca repetimos el mismo dia, y rotamos sin estado.
function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / 86400000);
}

function pick(arr, offset = 0) {
  return arr[(dayOfYear() + offset) % arr.length];
}

// Offset adicional segun hora UTC para que slots distintos del mismo
// dia no posteen el mismo item (4 slots/dia con catalogos rotando).
function hourSalt() {
  const h = new Date().getUTCHours();
  return Math.floor(h * 7); // 0, 49, 56, 77, 112, 133 -> dispersos
}

// =================== Construccion de posts ===================

// Devuelve la mejor imagen: foto real del frasco si existe, sino OG card.
function bestPhoto(p) {
  if (p.image && p.image.startsWith("/photos")) return `${SITE}${p.image}`;
  return `${SITE}/perfumes/${p.slug}/opengraph-image`;
}

function priceTier(p) {
  const min = p.priceRange?.min || 0;
  if (min < 35) return "💸 Chollo (menos de 35€)";
  if (min < 80) return "💰 Precio medio";
  if (min < 180) return "💎 Gama alta diseñador";
  return "👑 Lujo / nicho";
}

function postMorning() {
  // Mañana: perfume del dia (offset por hora -> no repite entre slots)
  const p = pick(perfumes, hourSalt());
  const url = `${SITE}/perfumes/${p.slug}`;
  const top = p.notes.top.slice(0, 3).join(" · ").toLowerCase();
  const heart = p.notes.heart.slice(0, 2).join(" · ").toLowerCase();
  const base = p.notes.base.slice(0, 2).join(" · ").toLowerCase();
  const genderEmoji =
    p.gender === "hombre" ? "👨" : p.gender === "mujer" ? "👩" : "🧑‍🤝‍🧑";

  const caption =
    `🌸 𝗣𝗘𝗥𝗙𝗨𝗠𝗘 𝗗𝗘𝗟 𝗗𝗜́𝗔\n\n` +
    `✨ ${p.name} — ${p.brand}\n` +
    `${genderEmoji} ${p.family} · ${p.concentration} · ${p.year}\n\n` +
    `🌿 Salida: ${top}\n` +
    `💗 Corazón: ${heart}\n` +
    `🪵 Fondo: ${base}\n\n` +
    `⏱ Dura ${p.longevity} · proyección ${p.projection.toLowerCase()}\n` +
    `${priceTier(p)} · ${p.priceRange.min}-${p.priceRange.max}€\n\n` +
    `👉 Notas completas, opiniones y dónde comprarlo 👇`;

  // Version corta para X / Twitter (limite 280, sin emojis de cabecera Unicode
  // que cuentan doble). El enlace lo añade postTwitter al final.
  const tweet =
    `🌸 Perfume del día: ${p.name} — ${p.brand}\n` +
    `${p.family} · ${p.year}\n` +
    `🌿 Salida: ${top}\n` +
    `🪵 Fondo: ${base}\n` +
    `⏱ ${p.longevity} · ${p.priceRange.min}-${p.priceRange.max}€`;

  return {
    photo: bestPhoto(p),
    button: { text: `Ver ${p.name} en Olfativa →`, url },
    short: caption,
    long: caption,
    tweet
  };
}

function postEvening() {
  // Tarde: clon del dia O dato curioso, alternando por hora+dia
  const slot = (dayOfYear() + new Date().getUTCHours()) % 2;
  const isClone = slot === 0;

  if (isClone && clones.length) {
    const c = pick(clones, 7 + hourSalt());
    const url = `${SITE}/clones/${c.slug}`;
    // Foto del perfume original que se clona
    const orig = perfumes.find((x) => x.slug === c.originalSlug);
    const photo = orig ? bestPhoto(orig) : `${SITE}/perfumes/${c.slug}/opengraph-image`;
    const cleanTitle = c.h1
      .replace(/^Clones de /i, "")
      .replace(/:.*$/, "")
      .trim();

    const caption =
      `💰 𝗖𝗟𝗢𝗡 𝗗𝗘𝗟 𝗗𝗜́𝗔\n\n` +
      `🔥 ¿Te gusta ${cleanTitle}?\n` +
      `Hay clones que huelen casi igual por 1/10 del precio.\n\n` +
      `${c.description ? c.description.slice(0, 160) + "…" : ""}\n\n` +
      `👉 Las mejores alternativas baratas 👇`;

    const tweet =
      `💰 ¿Te gusta ${cleanTitle}?\n` +
      `Hay clones que huelen casi igual por una fracción del precio. ` +
      `Las mejores alternativas baratas 👇`;

    return {
      photo,
      button: { text: `Clones de ${cleanTitle} →`, url },
      short: caption,
      long: caption,
      tweet
    };
  }

  // Guia curiosa
  if (guides.length) {
    const g = pick(guides, 13 + hourSalt());
    const url = `${SITE}/guias/${g.slug}`;
    const caption =
      `💡 ¿𝗦𝗔𝗕𝗜́𝗔𝗦 𝗤𝗨𝗘...?\n\n` +
      `${g.title}\n\n` +
      `${g.description ? g.description.slice(0, 220) : ""}\n\n` +
      `👉 Te lo contamos todo 👇`;
    const cleanG = g.title.replace(/\s*\|.*$/, "").trim();
    return {
      photo: null,
      button: { text: "Leer la guía completa →", url },
      short: `💡 ${g.title}\n\n${url}`,
      long: caption,
      tweet: `💡 ¿Sabías que...? ${cleanG}`
    };
  }

  return null;
}

// =================== Telegram ===================

async function postTelegram(text, photoUrl, button) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    console.log("[telegram] sin credenciales, saltado");
    return;
  }

  // Botón inline "Ver ficha" debajo del post -> 1 click al enlace
  const replyMarkup = button
    ? { inline_keyboard: [[{ text: button.text, url: button.url }]] }
    : undefined;

  // Si hay foto, sendPhoto con caption + botón. Cuando alguien reenvia
  // el post, se ve la foto del frasco + botón llamativo.
  if (photoUrl) {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat,
        photo: photoUrl,
        caption: text.slice(0, 1024),
        ...(replyMarkup && { reply_markup: replyMarkup })
      })
    });
    const j = await r.json();
    console.log("[telegram:photo]", r.status, j.ok ? "OK" : j.description);
    if (j.ok) return;
    console.log("[telegram] photo fallo, fallback a texto");
  }

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat,
      text,
      disable_web_page_preview: false,
      ...(replyMarkup && { reply_markup: replyMarkup })
    })
  });
  const j = await r.json();
  console.log("[telegram]", r.status, j.ok ? "OK" : j.description);
}

// =================== Bluesky (AT Protocol) ===================

async function postBluesky(text) {
  const handle = process.env.BLUESKY_HANDLE;
  const password = process.env.BLUESKY_PASSWORD;
  if (!handle || !password) {
    console.log("[bluesky] sin credenciales, saltado");
    return;
  }
  // 1. Crear sesion
  const session = await fetch(
    "https://bsky.social/xrpc/com.atproto.server.createSession",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: handle, password })
    }
  ).then((r) => r.json());

  if (!session.accessJwt) {
    console.log("[bluesky] login fallo:", session.message || JSON.stringify(session));
    return;
  }

  // 2. Construir post con facets (links clickables)
  const facets = [];
  const urlRegex = /https?:\/\/\S+/g;
  let m;
  const encoder = new TextEncoder();
  while ((m = urlRegex.exec(text))) {
    const start = encoder.encode(text.slice(0, m.index)).length;
    const end = start + encoder.encode(m[0]).length;
    facets.push({
      index: { byteStart: start, byteEnd: end },
      features: [{ $type: "app.bsky.richtext.facet#link", uri: m[0] }]
    });
  }

  const r = await fetch(
    "https://bsky.social/xrpc/com.atproto.repo.createRecord",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessJwt}`
      },
      body: JSON.stringify({
        repo: session.did,
        collection: "app.bsky.feed.post",
        record: {
          $type: "app.bsky.feed.post",
          text: text.slice(0, 300),
          facets,
          createdAt: new Date().toISOString(),
          langs: ["es"]
        }
      })
    }
  );
  const j = await r.json();
  console.log("[bluesky]", r.status, j.uri ? "OK " + j.uri : j.message || "fail");
}

// =================== Mastodon ===================

async function postMastodon(text) {
  const instance = process.env.MASTODON_INSTANCE;
  const token = process.env.MASTODON_TOKEN;
  if (!instance || !token) {
    console.log("[mastodon] sin credenciales, saltado");
    return;
  }
  const r = await fetch(`https://${instance}/api/v1/statuses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      status: text.slice(0, 500),
      language: "es",
      visibility: "public"
    })
  });
  const j = await r.json();
  console.log(
    "[mastodon]",
    r.status,
    j.url ? "OK " + j.url : j.error || "fail"
  );
}

// =================== X / Twitter (API v2 + OAuth 1.0a) ===================

// Percent-encoding RFC 3986 (encodeURIComponent deja sin codificar !*'() ).
function pctEncode(s) {
  return encodeURIComponent(s).replace(
    /[!*'()]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

async function postTwitter(post) {
  const ck = process.env.TWITTER_API_KEY;
  const cs = process.env.TWITTER_API_SECRET;
  const tok = process.env.TWITTER_ACCESS_TOKEN;
  const ts = process.env.TWITTER_ACCESS_SECRET;
  if (!ck || !cs || !tok || !ts) {
    console.log("[twitter] sin credenciales, saltado");
    return;
  }

  // Construir tweet <=280. X cuenta cualquier URL como 23 chars (t.co).
  const url = post.button && post.button.url;
  let text = post.tweet || post.short || "";
  const MAX = 280;
  const URLLEN = 23;
  const sep = "\n\n👉 ";
  if (url) {
    const budget = MAX - URLLEN - sep.length;
    if (text.length > budget) text = text.slice(0, budget - 1).trimEnd() + "…";
    text = text + sep + url;
  } else if (text.length > MAX) {
    text = text.slice(0, MAX - 1) + "…";
  }

  const endpoint = "https://api.twitter.com/2/tweets";
  const oauth = {
    oauth_consumer_key: ck,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: tok,
    oauth_version: "1.0"
  };

  // Base string: para application/json el body NO entra en la firma; solo
  // los parametros oauth_*. Orden alfabetico + percent-encoding.
  const paramStr = Object.keys(oauth)
    .sort()
    .map((k) => `${pctEncode(k)}=${pctEncode(oauth[k])}`)
    .join("&");
  const baseString = ["POST", pctEncode(endpoint), pctEncode(paramStr)].join("&");
  const signingKey = `${pctEncode(cs)}&${pctEncode(ts)}`;
  oauth.oauth_signature = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  const authHeader =
    "OAuth " +
    Object.keys(oauth)
      .sort()
      .map((k) => `${pctEncode(k)}="${pctEncode(oauth[k])}"`)
      .join(", ");

  const r = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: authHeader },
    body: JSON.stringify({ text })
  });
  const j = await r.json().catch(() => ({}));
  console.log(
    "[twitter]",
    r.status,
    j.data && j.data.id ? "OK " + j.data.id : JSON.stringify(j).slice(0, 220)
  );
}

// =================== Main ===================

async function main() {
  const slot = process.argv[2] || "morning"; // morning | evening
  const post = slot === "evening" ? postEvening() : postMorning();
  if (!post) {
    console.log("Sin contenido para slot", slot);
    return;
  }
  console.log("--- Post (" + slot + ") ---");
  console.log(post.long);
  console.log("---");

  await Promise.all([
    postTelegram(post.long, post.photo, post.button),
    postBluesky(post.long),
    postMastodon(post.long),
    postTwitter(post)
  ]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
