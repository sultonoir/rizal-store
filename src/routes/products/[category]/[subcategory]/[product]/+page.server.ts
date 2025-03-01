import { db } from '$lib/db';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { addCartSchema, cartSchema } from '$lib/components/form/cart/schema';

export const load: PageServerLoad = async ({ params }) => {
	const product = await db.product.findFirst({
		where: {
			slug: params.product
		},
		include: {
			productImage: true,
			stockandsize: true
		}
	});

	if (!product) {
		error(404, 'Not found');
	}

	return {
		product,
		form: await superValidate(zod(addCartSchema))
	};
};

export const actions: Actions = {
	addcart: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(addCartSchema));
		console.log(form);
		const cart = cookies.get('cart');

		if (!form.valid) return fail(400, { form });

		if (!cart) {
			return [];
		}

		const carts = cartSchema.parse(JSON.parse(cart));

		return message(form, 'Form posted successfully!');
	}
};
