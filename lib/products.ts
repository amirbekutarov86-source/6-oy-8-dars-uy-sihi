import "server-only";
import type { Document } from "mongodb";
import { getDb } from "./mongodb";
import { seedProducts } from "./seed-data";
import type { Product } from "./types";

export type ProductsResult = {
  products: Product[];
  source: "mongodb" | "fallback";
};

type Options = { category?: string; q?: string };

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function applyFilters(list: Product[], { category, q }: Options) {
  const needle = q?.trim().toLowerCase();
  return list.filter(
    (p) =>
      (!category || p.category === category) &&
      (!needle ||
        `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(needle)),
  );
}

export async function getProducts(options: Options = {}): Promise<ProductsResult> {
  try {
    const col = (await getDb()).collection("products");

    // Baza bo'sh bo'lsa, birinchi so'rovda namunaviy mahsulotlar yoziladi
    if ((await col.estimatedDocumentCount()) === 0) {
      await col.insertMany(seedProducts.map((p) => ({ ...p })));
    }

    const filter: Document = {};
    if (options.category) filter.category = options.category;
    if (options.q?.trim()) {
      const rx = { $regex: escapeRegex(options.q.trim()), $options: "i" };
      filter.$or = [{ name: rx }, { brand: rx }, { category: rx }];
    }

    const docs = await col.find(filter).toArray();
    const products: Product[] = docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      brand: d.brand,
      category: d.category,
      price: d.price,
      description: d.description,
      image: d.image,
      rating: d.rating,
      stock: d.stock,
      specs: d.specs ?? [],
    }));

    return { products, source: "mongodb" };
  } catch (error) {
    console.warn(
      "[products] MongoDB ulanmadi, namunaviy ma'lumotlar ishlatilmoqda:",
      (error as Error).message,
    );
    const all = seedProducts.map((p, i) => ({ ...p, id: `seed-${i}` }));
    return { products: applyFilters(all, options), source: "fallback" };
  }
}

/** Bazani qaytadan namunaviy ma'lumotlar bilan to'ldiradi */
export async function reseedProducts() {
  const col = (await getDb()).collection("products");
  await col.deleteMany({});
  const res = await col.insertMany(seedProducts.map((p) => ({ ...p })));
  return res.insertedCount;
}
