import { getProducts } from '$lib/server/controller/product-controller';
import { getPromotions } from '$lib/server/controller/promo-controller';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [promotions, products] = await Promise.all([
		getPromotions(),
		getProducts({ sort: 'latest' })
	]);
	return {
		promotions,
		products
	};
};

export const prerender = true;
