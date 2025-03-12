import { z } from "zod";

export const CreatePayment = z.object({
  cart: z.array(
    z.object({
      productId: z.string(),
      size: z.string(),
      amount: z.number(),
    }),
  ),
  promoId: z.string().optional(),
});

export type CreatePayment = z.infer<typeof CreatePayment>;
