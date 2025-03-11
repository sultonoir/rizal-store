import { cn } from "@/lib/utils";
import React, { type HTMLAttributes } from "react";

interface PriceProductProps extends HTMLAttributes<HTMLDivElement> {
  discount: number;
  price: number;
  priceAfterDiscount: number;
  priceClassName?: string;
  discountClassName?: string;
}

const ProductPrice = ({
  price,
  discount,
  className,
  priceClassName,
  discountClassName,
  priceAfterDiscount,
  ...props
}: PriceProductProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm lg:text-[16px]",
        className,
      )}
      {...props}
    >
      <div className={cn("font-bold", priceClassName)}>
        ${priceAfterDiscount}
      </div>
      {discount > 0 && (
        <p
          className={cn("text-sm text-red-600 line-through", discountClassName)}
        >
          ${price}
        </p>
      )}
    </div>
  );
};

export default ProductPrice;
