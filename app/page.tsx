import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Headset } from "lucide-react";
import Header from "@/components/header";
import ImagesSection from "@/components/images-section";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { products, source } = await getProducts();

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-200 via-indigo-200 to-fuchsia-200">
          <div className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-sky-300/50 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-fuchsia-300/50 blur-3xl" />

          <Image
            src="/products/laptop-silver.svg"
            alt=""
            width={800}
            height={600}
            unoptimized
            style={{ "--r": "-6deg" } as React.CSSProperties}
            className="drift pointer-events-none absolute left-[3%] top-[18%] hidden w-60 rounded-3xl shadow-2xl shadow-indigo-900/20 xl:block"
          />
          <Image
            src="/products/phone-pro.svg"
            alt=""
            width={800}
            height={600}
            unoptimized
            style={{ "--r": "6deg", animationDelay: "-2s" } as React.CSSProperties}
            className="drift pointer-events-none absolute right-[4%] top-[14%] hidden w-56 rounded-3xl shadow-2xl shadow-indigo-900/20 xl:block"
          />
          <Image
            src="/products/fridge.svg"
            alt=""
            width={800}
            height={600}
            unoptimized
            style={{ "--r": "4deg", animationDelay: "-4s" } as React.CSSProperties}
            className="drift pointer-events-none absolute bottom-[10%] left-[12%] hidden w-44 rounded-3xl shadow-2xl shadow-indigo-900/20 xl:block"
          />

          <div className="relative mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center justify-center px-5 pb-28 pt-16 text-center">
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-neutral-950 sm:text-6xl md:text-7xl">
              Best appliances for your home.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
              Laptops, kitchen and laundry appliances, and smartphones. Compare prices, check
              specs and pick what fits your home.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="#catalog" className={buttonVariants({ size: "lg" })}>
                Get Started <ArrowRight className="size-4" />
              </a>
              <Link href="/products" className={buttonVariants({ size: "lg", variant: "outline" })}>
                Browse all products
              </Link>
            </div>
          </div>
        </section>

        {/* Catalog */}
        <section
          id="catalog"
          className="relative -mt-14 scroll-mt-20 rounded-t-[2.5rem] bg-[var(--paper)] px-5 pb-20 pt-10 shadow-[0_-20px_40px_-20px_rgba(79,70,229,0.25)]"
        >
          <div className="mx-auto max-w-6xl">
            {source === "fallback" && (
              <p className="mx-auto mb-8 max-w-xl rounded-xl bg-amber-100 px-4 py-3 text-center text-sm text-amber-900">
                MongoDB is not reachable, so sample products are shown. Check MONGODB_URI in
                your .env file and restart the dev server.
              </p>
            )}
            <ImagesSection products={products} />
          </div>
        </section>

        {/* Perks */}
        <section className="border-t border-black/5 bg-white px-5 py-14">
          <ul className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
            {[
              { icon: Truck, title: "Free delivery", text: "On every order over $300." },
              { icon: ShieldCheck, title: "2-year warranty", text: "Full coverage on all appliances." },
              { icon: Headset, title: "Real support", text: "Talk to a person, 7 days a week." },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-neutral-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="bg-neutral-950 px-5 py-8 text-sm text-neutral-400">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span className="font-display text-lg font-bold text-white">Appliances</span>
          <span>© {new Date().getFullYear()} Appliances. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
