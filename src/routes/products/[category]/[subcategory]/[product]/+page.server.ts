import { db } from '$lib/db';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { addCartSchema } from '$lib/components/form/cart/schema';
import { addToCart } from '$lib/server/controller/CartController';
import { generateId } from 'better-auth';

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

		if (!form.valid) return fail(400, { form });
		addToCart({ cookies, data: form.data, id: generateId(10) });
		return fail(400, { form });
	}
};
