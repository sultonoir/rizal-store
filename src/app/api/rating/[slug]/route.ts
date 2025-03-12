import { queryRating } from "@/server/reviews/reviews-service";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
  const page = request.nextUrl.searchParams.get("page");
  if (!page) {
    return Response.json([]);
  }

  const results = await queryRating({ slug, page: parseInt(page) });
  const response = Response.json(results);
  // cache for 10 minutes
  response.headers.set("Cache-Control", "public, max-age=600");
  return response;
}
