import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-sky-200 via-indigo-200 to-fuchsia-200 px-5 py-10">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 block text-center font-display text-3xl font-bold tracking-tight text-indigo-600"
        >
          Appliances
        </Link>
        <div className="rounded-3xl bg-white/80 p-7 shadow-xl shadow-indigo-900/10 backdrop-blur-xl">
          {children}
        </div>
      </div>
    </main>
  );
}
