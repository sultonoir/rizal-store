import { type Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/server/product/product-service";
import { getReviews } from "@/server/reviews/reviews-service";
import { getRecommendByslug } from "@/server/recommend/recommen-service";
import ProductPage from "@/components/product/product-page";
import { ReviewerSection } from "@/components/review/review-section";
import {
  Carousel,
  CarouselContent,
  CarouselHeader,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product/product-card";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

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
  const [products, reviews, recommends] = await Promise.all([
    getProductBySlug({ slug }),
    getReviews({ slug }),
    getRecommendByslug({ slug }),
  ]);

  if (!products) notFound();
  return (
    <div className="container relative z-0 my-10 min-h-screen space-y-4">
      <ProductPage data={products} />
      <ReviewerSection slug={slug} initialData={reviews} />
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselHeader title="Recommendataions" />
        <CarouselContent>
          {recommends.map((recommend) => (
            <CarouselItem
              key={recommend.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <ProductCard product={recommend} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Page;
