import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { addCartSchema } from '$lib/components/form/cart/schema';

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

export const entries: EntryGenerator = () => {
	return [
		{
			category: 't-shirt',
			subcategory: 'basic t-shirt',
			product: 'rainame-t-shirt-thrdy-black'
		}
	];
};

export const prerender = true;
