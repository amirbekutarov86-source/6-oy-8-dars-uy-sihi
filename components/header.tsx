"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Header({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 md:flex-nowrap">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600"
        >
          Appliances
        </Link>

        <form
          onSubmit={onSubmit}
          role="search"
          className="relative order-last w-full md:order-none md:mx-auto md:max-w-md md:flex-1"
        >
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search here..."
            aria-label="Search products"
            className="h-11 w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </form>

        <nav className="ml-auto flex items-center gap-2">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Log In
          </Link>
          <Link href="/register" className={buttonVariants()}>
            Get Started <ArrowRight className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
