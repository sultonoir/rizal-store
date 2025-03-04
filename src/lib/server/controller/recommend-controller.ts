import { db } from '$lib/db';
import { getProducts } from './product-controller';

export type RecommedParams = {
	slug: string;
	take?: number;
};

export async function getRecommends({ slug, take }: RecommedParams) {
	const category = await db.category.findFirst({
		where: {
			productDetails: {
				some: {
					product: {
						slug
					}
				}
			}
		},
		cacheStrategy: {
			ttl: 600,
			swr: 600
		}
	});
	return await getProducts({ category: category?.name, take });
}
