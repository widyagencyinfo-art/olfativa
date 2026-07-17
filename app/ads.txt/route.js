import { ADSENSE_CLIENT } from "@/lib/data";

// ads.txt de Google AdSense. Se genera solo a partir del ID de editor.
// El ID en ads.txt va sin el prefijo "ca-": ca-pub-123... -> pub-123...
// Mientras no haya ID, devolvemos 404 (no servimos un ads.txt roto).
export function GET() {
  if (!ADSENSE_CLIENT) {
    return new Response("Not found", { status: 404 });
  }
  const pubId = ADSENSE_CLIENT.replace(/^ca-/, "");
  const body = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
