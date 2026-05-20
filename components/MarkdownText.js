import Link from "next/link";

// Parser inline minimal: soporta **negrita**, [texto](url), saltos de linea.
function renderInline(text, keyPrefix = "") {
  const nodes = [];
  // Patron unificado: **bold** o [text](url)
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b-${i}`}>{match[1]}</strong>);
    } else {
      const href = match[3];
      const label = match[2];
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={`${keyPrefix}-l-${i}`} href={href}>
            {label}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={`${keyPrefix}-l-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        );
      }
    }
    lastIndex = regex.lastIndex;
    i++;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export default function MarkdownText({ children }) {
  if (!children) return null;
  const paragraphs = String(children).split(/\n\n+/);
  return paragraphs.map((para, idx) => (
    <p key={idx}>{renderInline(para, `p${idx}`)}</p>
  ));
}
