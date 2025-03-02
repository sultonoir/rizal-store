import { z } from 'zod';

export const addCartSchema = z.object({
	quantity: z.number(),
	size: z.string(),
	productId: z.string()
});

export type AddCartSchema = z.infer<typeof addCartSchema>;

export const cartSchema = z.array(
	z.object({
		productSlug: z.string(),
		quantity: z.number(),
		size: z.string(),
		id: z.string()
	})
);

export type CartSchema = z.infer<typeof cartSchema>;
