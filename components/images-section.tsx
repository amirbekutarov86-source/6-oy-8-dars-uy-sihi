"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Drawer from "@/components/Drawer";
import { CATEGORIES, type Category, type Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

export default function ImagesSection({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Category>("computers");
  const [selected, setSelected] = useState<Product | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible = useMemo(
    () => products.filter((p) => p.category === active),
    [products, active],
  );

  return (
    <div>
      <div role="tablist" aria-label="Categories" className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map(({ key, label }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(key)}
              className={cn(
                "rounded-xl px-5 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                isActive
                  ? "bg-neutral-950 text-white shadow-lg shadow-neutral-950/20"
                  : "bg-black/5 text-neutral-700 hover:bg-black/10",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-14 text-center text-neutral-500">
          No products in this category yet. Add some in MongoDB and refresh.
        </p>
      ) : (
        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setSelected(p)}
                className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    unoptimized
                    sizes="(min-width:1024px) 280px, (min-width:640px) 45vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight">{p.name}</h3>
                    <p className="mt-0.5 text-sm text-neutral-500">{p.brand}</p>
                  </div>
                  <span className="shrink-0 font-semibold">{formatPrice(p.price)}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Drawer product={selected} onClose={close} />
    </div>
  );
}
