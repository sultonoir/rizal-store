import { SearchProductsParams } from "@/server/product/product-model";
import { searchProducts } from "@/server/product/product-service";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  // Konversi URLSearchParams ke objek biasa dan decode nilai yang diambil
  const searchParams = Object.fromEntries(
    [...request.nextUrl.searchParams.entries()].map(([key, value]) => [
      key,
      decodeURIComponent(value),
    ]),
  );

  const parsedata = SearchProductsParams.parse(searchParams);
  console.log({ searchParams, parsedata });

  const results = await searchProducts(parsedata);
  const response = Response.json(results);
  response.headers.set("Cache-Control", "public, max-age=600");

  return response;
}
