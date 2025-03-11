import { Product, ProductImage } from "@prisma/client";

export type ProductCard = Product & {
  productImage: ProductImage;
  rating: number;
};
