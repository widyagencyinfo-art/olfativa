import Link from "next/link";
import { SITE_URL } from "@/lib/data";

export default function Breadcrumbs({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <nav className="breadcrumbs container" aria-label="Ruta de navegación">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {items.map((item, i) => (
        <span key={item.href}>
          {i > 0 && <span>›</span>}
          {i === items.length - 1 ? (
            <strong style={{ fontWeight: 600 }}>{item.label}</strong>
          ) : (
            <Link href={item.href}>{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
