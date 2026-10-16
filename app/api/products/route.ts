import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await getProducts({
    category: searchParams.get("category") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });
  return NextResponse.json(result);
}
