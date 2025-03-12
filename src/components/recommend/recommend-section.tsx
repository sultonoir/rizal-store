import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselHeader,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product/product-card";
import { getRecommendByslug } from "@/server/recommend/recommen-service";
const RecommendSection = async ({ slug }: { slug: string }) => {
  const recommends = await getRecommendByslug({ slug });
  return (
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
  );
};

export default RecommendSection;
