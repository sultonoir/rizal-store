import { db } from '$lib/db';

export type RecommedParams = {
	categories?: string[];
	subcategories?: string[];
	take?: number;
};

export async function getRecommends({
	categories,
	subcategories,
	take
}: RecommedParams) {
	const products = await db.productDetails.findMany({
		where: {
			category: {
				name:
					categories && categories.length !== 0 ? { in: categories } : undefined
			},
			subcategory: {
				name:
					subcategories && subcategories.length !== 0
						? { in: subcategories }
						: undefined
			}
		},
		include: {
			product: {
				include: {
					productImage: {
						take: 1,
						orderBy: {
							createdAt: 'asc'
						}
					},
					rating: true
				}
			},
			subcategory: true,
			category: true
		},
		take
	});

	const productIds = products.flatMap((item) => item.productId);

	const ratings = await db.rating.groupBy({
		by: ['productId'],
		_avg: {
			value: true
		},
		where: {
			productId: {
				in: productIds
			}
		}
	});

	const result = products.map((product) => {
		const link = `/products/${product.category.name}/${product.subcategory.name}/${product.product.slug}`;

		//find rating
		const productRating =
			ratings.find((rating) => rating.productId === product.productId)?._avg
				.value ?? 0;

		//return result
		return {
			...product.product,
			link,
			rating: productRating,
			productImage: product.product.productImage[0]!
		};
	});

	return result;
}
