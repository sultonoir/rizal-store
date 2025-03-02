import { getProducts } from '$lib/server/controller/product-controller';
import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { generateId } from 'better-auth';
import { zod } from 'sveltekit-superforms/adapters';
import { addCartSchema } from '$lib/components/form/cart/schema';
import { addToCart } from '$lib/server/controller/cart-controller';
import { getPromotions } from '$lib/server/controller/promo-controller';

export const load: PageServerLoad = async () => {
	const products = await getProducts();
	const promotions = await getPromotions();
	return {
		products,
		promotions
	};
};

export const actions: Actions = {
	addcart: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(addCartSchema));
		console.log(form);

		if (!form.valid) return fail(400, { form });
		addToCart({ cookies, data: form.data, id: generateId(10) });
		return fail(400, { form });
	}
};
