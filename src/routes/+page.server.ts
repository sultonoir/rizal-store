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
	return {
		products
	};
};
