import { db } from '$lib/db';

export async function getProducts() {
	const products = await db.productDetails.findMany({
		include: {
			category: true,
			subcategory: true,
			product: {
				include: {
					productImage: {
						take: 1,
						orderBy: {
							createdAt: 'asc'
						}
					}
				}
			}
		}
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
		const productRating =
			ratings.find((rating) => rating.productId === product.productId)?._avg.value ?? 0;
		return {
			...product.product,
			link,
			rating: productRating,
			productImage: product.product.productImage[0]!
		};
	});

	return result;
}

export async function getProductBySlug({slug}:{slug : string}) {
	const product = await db.product.findFirst({
		where: {
			slug
		},
		include: {
			rating: true,
			productImage: true,
			stockandsize: true
		}
	});

	if (!product) {
		return undefined;
	}
	const rating = await db.rating.aggregate({
		where: { product: { slug } },
		_avg: { value: true }
	});

	return {
		...product,
		rating: rating._avg.value ?? 0
	};
}