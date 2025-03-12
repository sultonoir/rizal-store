import { z } from "zod";

export const updateStockSchema = z.object({
  productId: z.string(),
  size: z.string(),
  amount: z.number(),
});

export type UpdateStockSchema = z.infer<typeof updateStockSchema>;
