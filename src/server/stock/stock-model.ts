import { z } from "zod";

export const updateStockSchema = z.object({
  productId: z.string(),
  size: z.string(),
  amount: z.number(),
  name: z.string(),
});

export type UpdateStockSchema = z.infer<typeof updateStockSchema>;
