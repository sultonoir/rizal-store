import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const products = await db.product.findMany({
		include: {
			productImage: {
				take: 1,
				orderBy: {
					createdAt: 'asc'
				}
			}
		}
	});

	const result = products.map((product) => {
		return {
			...product,
			productImage: product.productImage[0]
		};
	});
	return {
		products: result
	};
};
