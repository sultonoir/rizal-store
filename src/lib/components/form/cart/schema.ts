import { z } from 'zod';

export const addCartSchema = z.object({
	quantity: z.number(),
	size: z.string(),
	productId: z.string()
});

export type AddCartSchema = z.infer<typeof addCartSchema>;

export const updateCartSchema = z.object({
	id: z.string(),
	quantity: z.number()
});

export type UpdateCart = z.infer<typeof updateCartSchema>;

export const removecartSchema = z.object({
	id: z.string().min(1)
});

export type RemoveCartSchema = z.infer<typeof removecartSchema>;
