import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { type ProductCard as ProductCardProps } from "@/types";
import Link from "next/link";
import { Image } from "@unpic/react/nextjs";
import ProductPrice from "./product-price";
import ProductRating from "./product-rating";

type Props = {
  product: ProductCardProps;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card className="relative rounded-2xl border p-2 shadow-lg">
      <Link
        href={`/product/${product.slug}`}
        prefetch={true}
        title={product.name}
      >
        <Image
          alt={product.name}
          src={product.productImage.url}
          width={300}
          height={400}
          layout="constrained"
          className="rounded-lg object-cover"
        />
        <CardContent className="relative mt-4 space-y-2 bg-background p-2">
          <CardTitle className="w-[calc(100%-1px)] truncate text-[16px] font-normal leading-none">
            {product.name}
          </CardTitle>
          <ProductRating rating={product.rating} />
          <ProductPrice
            discount={product.discount}
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
            className="flex-grow"
          />
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
