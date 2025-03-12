import { z } from "zod";

export const SearchProductsParams = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  min: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().optional(),
  ),
  max: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().optional(),
  ),
  discount: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().optional(),
  ),
  rating: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().optional(),
  ),
  page: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().optional(),
  ),
  take: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().optional(),
  ),
  sort: z.preprocess(
    (val) => (typeof val === "string" ? val : undefined),
    z
      .enum(["hot-sale", "most-rating", "latest", "lowest-price", "high-price"])
      .optional(),
  ),
});

export type SearchProductsParams = z.infer<typeof SearchProductsParams>;
