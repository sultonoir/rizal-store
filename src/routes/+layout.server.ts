import { db } from '$lib/db';
import { getCart } from '$lib/server/controller/cart-controller';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const posts = await db.post.findMany();
	const carts = getCart(cookies);
	return {
		posts,
		carts
	};
};
