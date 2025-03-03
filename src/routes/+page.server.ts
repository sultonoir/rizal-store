import { getProducts } from '$lib/server/controller/product-controller';
import { message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import {
	addCartSchema,
	removecartSchema,
	updateCartSchema
} from '$lib/components/form/cart/schema';
import {
	addToCart,
	removeFromCart,
	updateCart
} from '$lib/server/controller/cart-controller';
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
	addcart: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(307, `/signin?callbackurl=${request.headers.get('referer')}`);
		}
		const form = await superValidate(request, zod(addCartSchema));

		if (!form.valid) return fail(400, { form });
		await addToCart({ userId: locals.user.id, data: form.data });
		return fail(400, { form });
	},
	updatecart: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(307, `/signin?callbackurl=${request.headers.get('referer')}`);
		}
		const form = await superValidate(request, zod(updateCartSchema));
		console.log(form);
		if (!form.valid) return fail(400, { form });
		await updateCart({ userId: locals.user.id, data: form.data });
		return message(form, 'message');
	},
	removecart: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(307, `/signin?callbackurl=${request.headers.get('referer')}`);
		}
		const form = await superValidate(request, zod(removecartSchema));
		const data = await removeFromCart({
			userId: locals.user.id,
			id: form.data.id
		});

		return message(form, data);
	}
};
