import { getCartCount } from '$lib/server/controller/cart-controller';
import { superValidate } from 'sveltekit-superforms';
import type { LayoutServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
	addCartSchema,
	removecartSchema,
	updateCartSchema
} from '$lib/components/form/cart/schema';

export const load: LayoutServerLoad = async ({ locals }) => {
	const cartCount = await getCartCount({
		userId: locals?.user?.id ?? undefined
	});
	return {
		cartCount,
		form: await superValidate(zod(addCartSchema)),
		updateCart: await superValidate(zod(updateCartSchema)),
		removeCart: await superValidate(zod(removecartSchema))
	};
};
