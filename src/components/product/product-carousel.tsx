import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselHeader,
  CarouselItem,
} from "@/components/ui/carousel";
import CardProduct from "@/components/product/product-card";
import { getProducts } from "@/server/product/product-service";

interface Props {
  sort?:
    | "hot-sale"
    | "most-rating"
    | "latest"
    | "lowest-price"
    | "high-price"
    | undefined;
  title?: string;
}

async function ProductCarousel({
  sort,
  title = "You May Like This Product 🥰",
}: Props) {
  const products = await getProducts({
    input: {
      sort,
    },
  });

  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselHeader title={title} />
      <CarouselContent>
        {products.products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <CardProduct product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ProductCarousel;
