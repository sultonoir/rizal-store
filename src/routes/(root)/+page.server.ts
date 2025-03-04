import { getProducts } from '$lib/server/controller/product-controller';
import { getPromotions } from '$lib/server/controller/promo-controller';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import {
	addCartSchema,
	removecartSchema,
	updateCartSchema
} from '$lib/components/form/cart/schema';
import { zod } from 'sveltekit-superforms/adapters';
import {
	addToCart,
	removeFromCart,
	updateCart
} from '$lib/server/controller/cart-controller';

export const load: PageServerLoad = async () => {
	const [promotions, products] = await Promise.all([
		getPromotions(),
		getProducts({ sort: 'most-rating', take: 22 })
	]);
	return {
		promotions,
		products
	};
};

export const actions: Actions = {
	addcart: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(307, '/signin');
		}

		const form = await superValidate(request, zod(addCartSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const cartIncrement = await addToCart({
			data: form.data,
			userId: locals.user.id
		});
		console.log(cartIncrement);
		if (!cartIncrement.id) {
			return message(form, 'Error add to cart');
		}

		return message(form, cartIncrement);
	},
	updatecart: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(307, `/signin`);
		}
		const form = await superValidate(request, zod(updateCartSchema));
		console.log(form);
		if (!form.valid) return fail(400, { form });
		await updateCart({ userId: locals.user.id, data: form.data });
		return message(form, 'message');
	},
	removecart: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(307, `/signin`);
		}
		const form = await superValidate(request, zod(removecartSchema));
		const data = await removeFromCart({
			userId: locals.user.id,
			id: form.data.id
		});

		return message(form, data);
	}
};
