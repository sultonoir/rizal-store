import { getProducts } from '$lib/server/controller/ProductController';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const products = await getProducts();

	return {
		products
	};
};
