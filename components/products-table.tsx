"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { Star } from "lucide-react";
import Drawer from "@/components/Drawer";
import { CATEGORIES, type Category, type Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

export default function ProductsTable({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const rows = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  );

  const chips = [{ key: "all" as const, label: "All" }, ...CATEGORIES];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {chips.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-indigo-600",
              filter === key ? "bg-neutral-950 text-white" : "bg-black/5 text-neutral-700 hover:bg-black/10",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-black/5 text-neutral-500">
            <tr>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Rating</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 text-right font-medium">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-neutral-500">
                  Nothing matches your search. Try a different word or clear the filter.
                </td>
              </tr>
            )}
            {rows.map((p) => (
              <tr
                key={p.id}
                tabIndex={0}
                onClick={() => setSelected(p)}
                onKeyDown={(e) => e.key === "Enter" && setSelected(p)}
                className="cursor-pointer transition hover:bg-indigo-50/60 focus-visible:bg-indigo-50 focus-visible:outline-none"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-4">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt="" fill unoptimized sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-neutral-500">{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 capitalize text-neutral-700">{p.category}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    {p.rating.toFixed(1)}
                  </span>
                </td>
                <td className={cn("px-5 py-3", p.stock > 0 ? "text-emerald-600" : "text-red-600")}>
                  {p.stock > 0 ? p.stock : "Out"}
                </td>
                <td className="px-5 py-3 text-right font-semibold">{formatPrice(p.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer product={selected} onClose={close} />
    </div>
  );
}
