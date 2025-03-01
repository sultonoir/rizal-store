import { z } from 'zod';

export const addCartSchema = z.object({
	quantity: z.number(),
	size: z.string(),
	productSlug: z.string()
});

export type AddCartSchema = typeof addCartSchema;

export const cartSchema = z.array(
	z.object({
		productSlug: z.string(),
		quantity: z.number(),
		size: z.string(),
		id: z.string()
	})
);

export type CartSchema = z.infer<typeof cartSchema>;
