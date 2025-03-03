import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { addCartSchema } from '$lib/components/form/cart/schema';
import { getProductBySlug } from '$lib/server/controller/product-controller';

export const load: PageServerLoad = async ({ params }) => {
	const product = await getProductBySlug({ slug: params.slug });
	if (!product) {
		error(404, 'Not found');
	}

	return {
		product,
		form: await superValidate(zod(addCartSchema)),
		slug: params.slug
	};
};

export const entries: EntryGenerator = () => {
	return [
		{
			slug: 'rainame-t-shirt-thrdy-black'
		}
	];
};

export const prerender = true;
