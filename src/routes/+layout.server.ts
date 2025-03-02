import { getCartCount } from '$lib/server/controller/cart-controller';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const cartCount = await getCartCount({
		userId: locals?.user?.id ?? undefined
	});
	return {
		cartCount
	};
};
