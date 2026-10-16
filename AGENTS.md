# Appliances — loyiha qoidalari

- Next.js (App Router) + TypeScript + Tailwind CSS v4 + MongoDB (rasmiy `mongodb` driver).
- Ma'lumotlar `lib/products.ts` orqali olinadi. Baza bo'sh bo'lsa `lib/seed-data.ts` dan avtomatik to'ldiriladi.
- UI komponentlar `components/ui`, sahifa bo'limlari `components/`.
- Mahsulot rasmlari `public/products/*.svg`. Bazada `image` maydoniga istalgan `/products/x.svg` yoki https havola yozish mumkin.
- Server-only kodni (`lib/mongodb.ts`, `lib/products.ts`) client komponentlarga import qilmang. Client uchun `lib/types.ts` ishlating.
