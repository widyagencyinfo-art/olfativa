# Activar el bot social automático (5 minutos, una sola vez)

El bot está ya programado en GitHub Actions y se ejecutará todos los días a las **09:00 y 19:00 hora Madrid**. Solo necesita que le pongas las claves de las redes en las que quieras publicar. Puedes activar solo una, dos o las tres. La que no tenga claves se salta silenciosamente.

---

## 🟦 1. Telegram (recomendado empezar por aquí)

**Por qué Telegram:** sin algoritmo, retención brutal, los suscriptores ven el 100% de tus posts, perfecto para audiencia perfumera nicho que quiere "perfume del día".

### Pasos

1. Abre Telegram y busca `@BotFather`.
2. Manda `/newbot` y sigue las instrucciones (nombre: "Olfativa", username: "OlfativaBot" o similar).
3. BotFather te devuelve un **token** que parece `7891234567:AAFxxxxxxxxxxxxxxxxxx`. **Cópialo.**
4. Crea un **canal público** (no grupo) en Telegram con nombre "Olfativa - Perfume del día" y username `@olfativaes` (o el que esté libre).
5. Entra en el canal → Administradores → Añadir admin → busca tu bot → dale permiso de **publicar mensajes**.
6. El "chat_id" del canal es `@olfativaes` (lo que pusiste como username, con la @).

### Añadir secrets a GitHub

Ve a `https://github.com/widyagencyinfo-art/olfativa/settings/secrets/actions` → **New repository secret**:

- **Name:** `TELEGRAM_BOT_TOKEN` → **Value:** el token de BotFather
- **Name:** `TELEGRAM_CHAT_ID` → **Value:** `@olfativaes` (o el username del canal)

Listo. El próximo cron postea el "perfume del día" al canal.

---

## 🦋 2. Bluesky (recomendado segundo)

**Por qué Bluesky:** red tipo Twitter, gratis, creciendo fuerte en España en 2026. API abierta. Audiencia de early adopters muy receptiva a contenido nicho.

### Pasos

1. Crea cuenta en [bsky.app](https://bsky.app) → username `olfativa.bsky.social` (o tu dominio si quieres olfativa.es como handle, más prestigio).
2. Settings → **App Passwords** → crea una nueva (NO la contraseña principal, una específica para el bot).
3. Te devuelve algo como `abcd-efgh-ijkl-mnop`. **Cópiala.**

### Añadir secrets a GitHub

- **Name:** `BLUESKY_HANDLE` → **Value:** `olfativa.bsky.social`
- **Name:** `BLUESKY_PASSWORD` → **Value:** la app password del paso 2

---

## 🐘 3. Mastodon (opcional, audiencia geek)

**Por qué Mastodon:** federada, gratis, audiencia muy nicho/cult que valora contenido de calidad y comparte mucho. Bueno para SEO indirecto (backlinks de servidores Mastodon).

### Pasos

1. Crea cuenta en `mastodon.social` (o instancia en español como `mastodon.es`).
2. Preferences → **Development** → New application → permisos: `write:statuses`. Crea.
3. Te da un **access token**. Cópialo.

### Añadir secrets a GitHub

- **Name:** `MASTODON_INSTANCE` → **Value:** `mastodon.social` (sin https://)
- **Name:** `MASTODON_TOKEN` → **Value:** el access token

---

## Probar manualmente sin esperar al cron

Una vez puestos los secrets, ve a:

`https://github.com/widyagencyinfo-art/olfativa/actions/workflows/social-bot.yml`

→ Click **"Run workflow"** → elige `morning` o `evening` → Run.

En 30 segundos verás los logs y aparecerá el post en la red que hayas configurado.

---

## Qué postea el bot cada día

- **Mañana (09:00):** Perfume del día — nombre, marca, año, perfumista, notas de salida, fondo, duración, proyección y link a la ficha completa.
- **Tarde (19:00):** Alterna entre:
  - **Clon del día:** descripción, alternativas baratas y link a la página de clones.
  - **Curiosidad olfativa:** título de guía + resumen + link.

Rota de forma determinista (basada en día del año), nunca repite el mismo día y cubre todo el catálogo en ~165 días.

---

## Crecer rápido el canal de Telegram

Una vez tengas el canal funcionando:

1. **Añade el link en tu bio de Instagram, TikTok, X, Wallapop**, donde tengas presencia.
2. Añade un **botón "Suscríbete en Telegram"** en el footer de olfativa.es (puedo añadirlo si me das el username del canal).
3. Comparte el link del canal en grupos de WhatsApp donde estés (familia, amigos).
4. Cuando alguien te pregunte por perfumes, mándale el canal en lugar de responder uno a uno.

Telegram crece lento al principio pero **los suscriptores quedan para siempre** (no como TikTok donde un día explotas y al siguiente desapareces).

---

## Si quieres añadir otra red

Edita `scripts/social-bot.js` y replica el patrón de `postTelegram()` / `postBluesky()` / `postMastodon()`. Cualquier API HTTP con auth simple es trivial de integrar.

Redes que tienen API gratis:
- **Discord webhooks** (postear a un canal de un server)
- **Slack webhooks**
- **Threads (Meta)** — API limitada pero existe
- **Lemmy** (Reddit federado)
- **Pixelfed** (Instagram federado, solo imágenes)
