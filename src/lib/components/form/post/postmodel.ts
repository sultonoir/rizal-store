import { z } from 'zod';

export const createPost = z.object({
	images: z.any()
});

export type CreatePost = z.infer<typeof createPost>;
