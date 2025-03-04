import { db } from '$lib/db';
import type { RatingStats } from '$lib/types';

export async function getReviews({
	pageSize = 4,
	slug,
	page
}: {
	slug: string;
	page?: string | null;
	pageSize?: number;
}) {
	const current = parseInt(page ?? '1');
	const skip = (current - 1) * pageSize;

	const [ratings, totalCount, ratingAvg, ratingStats] = await Promise.all([
		db.rating.findMany({
			where: { product: { slug } },
			select: {
				id: true,
				value: true,
				createdAt: true,
				message: true,
				updatedAt: true,
				userId: true,
				productId: true,
				user: { select: { name: true, image: true } }
			},
			take: pageSize,
			skip,
			orderBy: { createdAt: 'desc' },
			cacheStrategy: {
				ttl: 600,
				swr: 600
			}
		}),

		db.rating.count({
			where: { product: { slug } },
			cacheStrategy: {
				ttl: 600,
				swr: 600
			}
		}),

		db.rating.aggregate({
			where: { product: { slug } },
			_avg: { value: true },
			cacheStrategy: {
				ttl: 600,
				swr: 600
			}
		}),

		db.rating.groupBy({
			by: ['value'],
			where: { product: { slug } },
			_count: { value: true },
			cacheStrategy: {
				ttl: 600,
				swr: 600
			}
		})
	]);

	// Konversi hasil `groupBy` agar sesuai dengan `RatingStats`
	const ratingCounts = [5, 4, 3, 2, 1].map((value) => {
		const rating = ratingStats.find((r) => r.value === value);
		const count = rating ? rating._count.value : 0;
		return {
			stars: value,
			count,
			percentage: totalCount > 0 ? (count / totalCount) * 100 : 0
		};
	});

	return {
		ratings,
		pagination: {
			total: totalCount,
			pages: Math.ceil(totalCount / pageSize),
			current,
			limit: pageSize
		},
		stats: {
			averageRating: ratingAvg._avg.value || 0,
			ratingCounts,
			totalReviews: totalCount
		} satisfies RatingStats
	};
}
