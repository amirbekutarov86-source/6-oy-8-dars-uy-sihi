import Header from "@/components/header";
import ProductsTable from "@/components/products-table";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { products, source } = await getProducts({ q });

  return (
    <>
      <Header initialQuery={q ?? ""} />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          {q ? `Results for “${q}”` : "All products"}
        </h1>
        <p className="mt-2 text-neutral-600">
          {products.length} {products.length === 1 ? "product" : "products"}
          {source === "fallback" && " (sample data, MongoDB is not connected)"}
        </p>
        <div className="mt-8">
          <ProductsTable products={products} />
        </div>
      </main>
    </>
  );
}
