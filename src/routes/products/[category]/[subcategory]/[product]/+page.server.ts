import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { addCartSchema } from '$lib/components/form/cart/schema';
import { getProductBySlug } from '$lib/server/controller/product-controller';
import { getRecommends } from '$lib/server/controller/recommend-controller';
import type { ReviewsProps } from '$lib/types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const product = await getProductBySlug({ slug: params.product });
	const recommeds = await getRecommends({
		subcategories: [params.subcategory]
	});
	if (!product) {
		error(404, 'Not found');
	}
	const response = await fetch(`/api/rating/${params.product}?page=1`);
	const reviews: ReviewsProps = await response.json();
	return {
		product,
		recommeds,
		form: await superValidate(zod(addCartSchema)),
		reviews,
		slug: params.product
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
