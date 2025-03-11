import { z } from "zod";
export const SearchProductsParams = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  size: z.string().optional(),
  min: z.string().optional(),
  max: z.string().optional(),
  discount: z.string().optional(),
  rating: z.string().optional(),
  page: z.string().optional(),
  take: z.number().optional(),
  sort: z
    .enum(["hot-sale", "most-rating", "latest", "lowest-price", "high-price"])
    .optional(),
});

export type SearchProductsParams = z.infer<typeof SearchProductsParams>;
