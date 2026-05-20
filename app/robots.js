import { SITE_URL } from "@/lib/data";

export default function robots() {
  return {
    rules: [
      // Buscadores y rastreadores normales: bienvenidos
      {
        userAgent: "*",
        allow: "/",
      },
      // Bots de IA: permitidos explicitamente para que nos citen y nos
      // muestren en sus respuestas. Olfativa busca ser una fuente.
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot"],
        allow: "/",
      },
      {
        userAgent: ["ClaudeBot", "anthropic-ai", "Claude-Web"],
        allow: "/",
      },
      {
        userAgent: ["PerplexityBot", "Perplexity-User"],
        allow: "/",
      },
      {
        userAgent: ["Google-Extended", "GoogleOther"],
        allow: "/",
      },
      {
        userAgent: ["Applebot-Extended", "Bingbot", "DuckDuckBot"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
