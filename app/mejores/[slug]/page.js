import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import { LISTS, getList } from "@/lib/lists";

export function generateStaticParams() {
  return LISTS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const list = getList(slug);
  if (!list) return {};
  return {
    title: list.title,
    description: list.description,
    alternates: { canonical: `/mejores/${list.slug}` },
    openGraph: { title: `${list.title} | Olfativa`, description: list.description },
  };
}

export default async function MejoresPage({ params }) {
  const { slug } = await params;
  const list = getList(slug);
  if (!list) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.title,
    description: list.description,
    numberOfItems: list.perfumes.length,
    itemListElement: list.perfumes.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.brand} ${p.name}`,
      url: `/perfumes/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/mejores", label: "Listas" },
          { href: `/mejores/${list.slug}`, label: list.title },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>{list.h1}</h1>
          <p>{list.intro}</p>
        </div>
        <div style={{ marginTop: "24px" }}>
          <PerfumeGrid perfumes={list.perfumes} />
        </div>

        <div className="block">
          <h2>Otras listas relacionadas</h2>
          <div className="chip-row">
            {LISTS.filter((l) => l.slug !== list.slug)
              .slice(0, 8)
              .map((l) => (
                <Link key={l.slug} href={`/mejores/${l.slug}`} className="chip">
                  {l.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
