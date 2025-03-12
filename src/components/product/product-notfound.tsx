import { type ProductCard as ProductCardProps } from "@/types";
import React from "react";
import ProductCard from "./product-card";

export function ProductNotFound({
  title,
  recommend,
}: {
  title: string;
  recommend: ProductCardProps[];
}) {
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex h-full flex-col items-center">
        <p>
          No items found for <b>{title}</b>
        </p>
        <p>
          <b>You may be interested in:</b>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {recommend.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
