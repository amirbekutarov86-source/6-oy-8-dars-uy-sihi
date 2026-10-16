"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, ShoppingBag, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

type Props = { product: Product | null; onClose: () => void };

export default function Drawer({ product, onClose }: Props) {
  const open = product !== null;
  const [added, setAdded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-neutral-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={product?.name ?? "Product details"}
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {product && (
          <>
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                sizes="448px"
                className="object-cover"
              />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 shadow transition hover:bg-white focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-sm text-neutral-500">
                {product.brand} · {product.category}
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">
                {product.name}
              </h2>

              <div className="mt-3 flex items-center gap-4">
                <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
                <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  {product.rating.toFixed(1)}
                </span>
                <span
                  className={`text-sm ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>

              <p className="mt-5 leading-relaxed text-neutral-700">{product.description}</p>

              {product.specs.length > 0 && (
                <ul className="mt-6 divide-y divide-black/5 rounded-2xl border border-black/5 bg-neutral-50">
                  {product.specs.map((s) => (
                    <li key={s} className="px-4 py-3 text-sm text-neutral-700">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-black/5 p-6">
              <Button
                size="lg"
                className="w-full"
                disabled={product.stock === 0}
                onClick={() => setAdded(product.id)}
              >
                {added === product.id ? (
                  <>
                    <Check className="size-5" /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-5" /> Add to cart
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
