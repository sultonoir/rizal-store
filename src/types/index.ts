import { SearchProductsParams } from "@/server/product/product-model";
import { Product, ProductImage, Rating, StockAndSize } from "@prisma/client";

export type ProductCard = Product & {
  productImage: ProductImage;
  rating: number;
};

export type ProductPage = Product & {
  productImage: ProductImage[];
  rating: number;
  stockandsize: StockAndSize[];
};

export type FormatCart = {
  id: string;
  name: string;
  productId: string;
  size: string;
  amount: number;
  createdAt: Date;
  max: number;
  updatedAt: Date;
  price: number;
  discount: number;
  image: ProductImage;
};

export type RecommedParams = {
  categories?: string[];
  subcategories?: string[];
  take?: number;
};

export type RatingStats = {
  averageRating: number;
  ratingCounts: {
    stars: number;
    count: number;
    percentage: number;
  }[];
  totalReviews: number;
};

export type Pagination = {
  total: number;
  pages: number;
  current: number;
  limit: number;
};

export type RatingWithuser = Rating & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export type ReviewerProps = {
  ratings: RatingWithuser[];
  pagination: Pagination;
  stats: RatingStats;
  page?: string;
};

type Params = Promise<Record<string, string>>;
type SearchParams = Promise<Record<string, string | undefined>>;

export type PageDynamic = {
  searchParams: SearchParams;
  params: Params;
};

export type SearchProductsClient = {
  params?: { category?: string; subcategory?: string };
  title: string;
  searchParams: SearchProductsParams;
};

export type SearchProduct = {
  products?: ProductCard[];
  pagination: Pagination;
  recommend?: ProductCard[];
};

export type GlobalResponse = {
  success: boolean;
  error?: {
    message: string;
  };
};
