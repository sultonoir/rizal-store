import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductBySlug } from '$lib/server/controller/product-controller';
import { getRecommends } from '$lib/server/controller/recommend-controller';
import { getReviews } from '$lib/server/controller/reviewer-controller';

export const load: PageServerLoad = async ({ params }) => {
	const [product, recommendations, reviews] = await Promise.all([
		getProductBySlug({ slug: params.slug }),
		getRecommends({ slug: params.slug }),
		getReviews({ slug: params.slug })
	]);
	if (!product) {
		error(404, 'Not found');
	}

	return {
		product,
		recommendations,
		reviews,
		slug: params.slug
	};
};
