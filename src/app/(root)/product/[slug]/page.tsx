import { type Metadata } from "next";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/server/product/product-service";
import ProductPage from "@/components/product/product-page";
import RecommendSection from "@/components/recommend/recommend-section";
import ReviewServer from "@/components/review/review-server";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

//edge runtime
export const runtime = "edge";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductBySlug({ slug });
  if (!data) notFound();
  return {
    title: data.name ?? "Rainame",
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const products = await getProductBySlug({ slug });

  if (!products) notFound();

  return (
    <div className="container relative z-0 my-10 min-h-screen space-y-4">
      <ProductPage data={products} />
      <Suspense>
        <ReviewServer slug={slug} />
      </Suspense>
      <Suspense>
        <RecommendSection slug={slug} />
      </Suspense>
    </div>
  );
};

export default Page;
