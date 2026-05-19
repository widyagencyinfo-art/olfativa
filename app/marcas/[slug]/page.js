import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PerfumeGrid from "@/components/PerfumeGrid";
import { getBrands, getBrandBySlug } from "@/lib/data";

export function generateStaticParams() {
  return getBrands().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  const title = `Perfumes de ${brand.name}`;
  const description = `Todos los perfumes de ${brand.name}: ${brand.count} fragancias con notas, perfil olfativo, precio e historia. Descúbrelas en Olfativa.`;
  return {
    title,
    description,
    alternates: { canonical: `/marcas/${brand.slug}` },
    openGraph: { title: `${title} | Olfativa`, description },
  };
}

export default async function MarcaPage({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { href: "/marcas", label: "Marcas" },
          { href: `/marcas/${brand.slug}`, label: brand.name },
        ]}
      />
      <div className="container">
        <div className="page-head">
          <h1>Perfumes de {brand.name}</h1>
          <p>
            {brand.count} {brand.count === 1 ? "fragancia" : "fragancias"} de{" "}
            {brand.name} en el catálogo. Compara sus notas, perfil olfativo y
            precio.
          </p>
        </div>
        <div style={{ marginTop: "24px" }}>
          <PerfumeGrid perfumes={brand.perfumes} />
        </div>
      </div>
    </>
  );
}
