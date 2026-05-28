// Cliente Redis minimo via Upstash REST API (sin SDK).
// Usa las env vars que Vercel inyecto al conectar el store:
// KV_REST_API_URL + KV_REST_API_TOKEN.

const URL = process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_TOKEN;

export function redisAvailable() {
  return Boolean(URL && TOKEN);
}

// Ejecuta un solo comando: redis(["INCR", "key"])
export async function redis(command) {
  if (!redisAvailable()) return null;
  try {
    const r = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(command),
      cache: "no-store"
    });
    const j = await r.json();
    return j.result;
  } catch (e) {
    return null;
  }
}

// Ejecuta varios comandos en pipeline: pipeline([["INCR","a"],["GET","b"]])
export async function pipeline(commands) {
  if (!redisAvailable()) return [];
  try {
    const r = await fetch(`${URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commands),
      cache: "no-store"
    });
    const j = await r.json();
    return Array.isArray(j) ? j.map((x) => x.result) : [];
  } catch (e) {
    return [];
  }
}
