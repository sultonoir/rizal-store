import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const product = await db.product.findFirst({
		where: {
			slug: params.product
		},
		include: {
			productImage: true
		}
	});
	return {
		product
	};
};
