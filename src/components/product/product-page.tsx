import { type ProductPage as ProductPageProps } from "@/types";
import React from "react";
import { ProductImages } from "./product-images";
import ProductRating from "./product-rating";
import ProductPrice from "./product-price";
import ProductSizes from "./product-size";
import ProductCounter from "./product-counter";
import ProductPayment from "./product-payment";
import ProductDetails from "./product-detail";
import ProductBenefit from "./product-benefit";

interface Props {
  data: ProductPageProps;
}

const ProductPage = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
      <div className="relative lg:w-[55%]">
        <ProductImages images={data.productImage} />
      </div>
      <div className="space-y-4 lg:w-[45%]">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {data.name}
        </h1>
        <ProductRating rating={data.rating} size={20} />
        <ProductPrice
          discount={data.discount}
          price={data.price}
          priceAfterDiscount={data.priceAfterDiscount}
          priceClassName="~text-lg/4xl"
          discountClassName="~text-sm/2xl"
        />
        <ProductSizes sizes={data.stockandsize} />
        <ProductCounter />
        <ProductPayment data={data} />
        <ProductDetails about={data.desc} />
        <ProductBenefit />
      </div>
    </div>
  );
};

export default ProductPage;
