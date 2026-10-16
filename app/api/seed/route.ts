import { NextResponse } from "next/server";
import { reseedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

// Brauzerda oching: http://localhost:3000/api/seed  (faqat development rejimida)
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Production'da o'chirilgan" }, { status: 403 });
  }
  try {
    const inserted = await reseedProducts();
    return NextResponse.json({ ok: true, inserted });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
  }
}
