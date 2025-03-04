import { db } from '$lib/db';
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const SortEnum = {
	HOT_SALE: 'hot-sale',
	MOST_RATING: 'most-rating',
	LATEST: 'latest',
	LOWEST_PRICE: 'lowest-price',
	HIGH_PRICE: 'high-price'
};

export const SearchProductsParams = z.object({
	q: z.string().optional(),
	category: z.string().optional(),
	subcategory: z.string().optional(),
	size: z.string().optional(),
	min: z.string().optional(),
	max: z.string().optional(),
	discount: z.string().optional(),
	rating: z.string().optional(),
	page: z.string().optional(),
	take: z.number().optional(),
	ids: z.array(z.string()).optional(),
	sort: z.nativeEnum(SortEnum).optional().nullable()
});

export type SearchProductsParams = z.infer<typeof SearchProductsParams>;

export async function getProducts({
	q,
	ids,
	category,
	subcategory,
	size,
	min,
	max,
	discount,
	rating,
	page = '1',
	take = 12,
	sort = 'latest'
}: SearchProductsParams) {
	const conditions: Prisma.ProductWhereInput[] = [];

	if (ids) {
		conditions.push({ id: { in: ids } });
	}
	// Search by product name
	if (q) {
		conditions.push({ name: { contains: q, mode: 'insensitive' } });
	}

	// Filter by category
	if (category) {
		conditions.push({
			productDetails: {
				some: {
					category: { name: category }
				}
			}
		});
	}

	// Filter by subcategory
	if (subcategory) {
		conditions.push({
			productDetails: {
				some: {
					subcategory: { name: subcategory }
				}
			}
		});
	}

	// Filter by size
	if (size) {
		conditions.push({
			stockandsize: { some: { name: { contains: size, mode: 'insensitive' } } }
		});
	}

	// Price range filtering
	const priceConditions: Prisma.ProductWhereInput[] = [];
	if (min) {
		priceConditions.push({
			price: { gte: parseFloat(min) }
		});
	}
	if (max) {
		priceConditions.push({
			price: { lte: parseFloat(max) }
		});
	}

	// Combine price conditions with AND if there are any
	if (priceConditions.length > 0) {
		conditions.push({
			AND: priceConditions
		});
	}

	if (discount) {
		conditions.push({
			discount: { gte: parseFloat(discount) }
		});
	}

	const where: Prisma.ProductWhereInput = {
		AND: conditions
	};

	const orderBy: Prisma.ProductOrderByWithRelationInput = {
		...(sort === 'latest'
			? { createdAt: 'desc' }
			: sort === 'lowest-price'
				? { priceAfterDiscount: 'asc' }
				: sort === 'high-price'
					? { priceAfterDiscount: 'desc' }
					: sort === ''
						? {
								createdAt: 'asc'
							}
						: {})
	};

	const products = await db.product.findMany({
		where,
		orderBy,
		take,
		skip: page ? parseInt(page) : 1,
		select: {
			id: true,
			name: true,
			slug: true,
			price: true,
			discount: true,
			priceAfterDiscount: true,
			productImage: {
				take: 1,
				select: {
					url: true
				},
				orderBy: {
					createdAt: 'asc'
				}
			}
		},
		cacheStrategy: {
			ttl: 600,
			swr: 600
		}
	});

	const productIds = products.flatMap((item) => item.id);

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
		const rating = ratings.find((r) => r.productId === product.id);
		return {
			id: product.id,
			name: product.name,
			slug: product.slug,
			price: product.price,
			discount: product.discount,
			priceAfterDiscount: product.priceAfterDiscount,
			image: product.productImage[0].url,
			rating: rating?._avg.value ?? 0
		};
	});

	if (sort === 'most-rating') {
		return result.sort((a, b) => b.rating - a.rating);
	}

	if (rating) {
		return result.filter((a) => a.rating >= parseInt(rating));
	}

	return result;
}

export async function getProductBySlug({ slug }: { slug: string }) {
	const product = await db.product.findFirst({
		where: {
			slug
		},
		include: {
			productImage: true,
			stockandsize: true
		},
		cacheStrategy: {
			ttl: 600,
			swr: 600
		}
	});

	if (!product) {
		return undefined;
	}
	const rating = await db.rating.aggregate({
		where: { product: { slug } },
		_avg: { value: true },
		cacheStrategy: {
			ttl: 600,
			swr: 600
		}
	});

	return {
		...product,
		rating: rating._avg.value ?? 0
	};
}
