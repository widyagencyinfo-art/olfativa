// Bot de difusion social autonomo para Olfativa.
// Postea cada dia perfume del dia + clon + curiosidad olfativa
// a Telegram (canal broadcast), Bluesky y Mastodon. Sin servidor.
//
// Disparado por GitHub Actions (2 veces/dia, mañana y tarde).
// Tokens en GitHub Secrets:
//   TELEGRAM_BOT_TOKEN   (token de @BotFather)
//   TELEGRAM_CHAT_ID     (id del canal, ej. @olfativa o -100123456)
//   BLUESKY_HANDLE       (ej. olfativa.bsky.social)
//   BLUESKY_PASSWORD     (app password, NO la contraseña principal)
//   MASTODON_INSTANCE    (ej. mastodon.social)
//   MASTODON_TOKEN       (access token desarrollador)
//
// Si una variable no esta configurada, esa red simplemente se salta.

const fs = require("fs");
const path = require("path");

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

function postMorning() {
  // Mañana: perfume del dia (offset por hora -> no repite entre slots)
  const p = pick(perfumes, hourSalt());
  const url = `${SITE}/perfumes/${p.slug}`;
  const top = p.notes.top.slice(0, 3).join(", ").toLowerCase();
  const base = p.notes.base.slice(0, 2).join(" y ").toLowerCase();

  return {
    short: `🌸 Perfume del día: ${p.name} de ${p.brand}\n\n${p.family} · ${p.concentration} · ${p.year}\n\nSalida: ${top}\nFondo: ${base}\n\nDuración: ${p.longevity}\n\n${url}`,
    long: `🌸 Perfume del día\n\n${p.name} — ${p.brand} (${p.year})\n\nUn ${p.family.toLowerCase()} ${p.concentration} firmado por ${p.perfumer}.\n\nNotas de salida: ${top}.\nFondo: ${base}.\nProyección ${p.projection.toLowerCase()}, duración ${p.longevity}.\n\nFicha completa, FAQ y precio orientativo: ${url}\n\n#perfume #fragancia #olfativa #${p.brandSlug.replace(/-/g, "")}`
  };
}

function postEvening() {
  // Tarde: clon del dia O dato curioso, alternando por hora+dia
  const slot = (dayOfYear() + new Date().getUTCHours()) % 2;
  const isClone = slot === 0;

  if (isClone && clones.length) {
    const c = pick(clones, 7 + hourSalt());
    const url = `${SITE}/clones/${c.slug}`;
    return {
      short: `💰 Clon del día\n\n${c.h1}\n\n${url}`,
      long: `💰 Clon del día — paga 1/10 sin renunciar al aroma\n\n${c.h1}\n\n${c.description ? c.description.slice(0, 180) : ""}\n\nAlternativas, comparativa y veredicto: ${url}\n\n#clonesperfumes #perfumebarato #lattafa #armaf`
    };
  }

  // Guia curiosa
  if (guides.length) {
    const g = pick(guides, 13 + hourSalt());
    const url = `${SITE}/guias/${g.slug}`;
    return {
      short: `💡 ¿Sabías que...?\n\n${g.title}\n\n${url}`,
      long: `💡 Curiosidad olfativa: ${g.title}\n\n${g.description ? g.description.slice(0, 200) : ""}\n\nGuía completa: ${url}\n\n#perfumes #fragancias #olfativa`
    };
  }

  return null;
}

// =================== Telegram ===================

async function postTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    console.log("[telegram] sin credenciales, saltado");
    return;
  }
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat,
      text,
      disable_web_page_preview: false
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
    postTelegram(post.long),
    postBluesky(post.long),
    postMastodon(post.long)
  ]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
