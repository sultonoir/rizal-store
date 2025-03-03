import { db } from '$lib/db';

export async function getPromotions() {
	return await db.promo.findMany({
		select: {
			id: true,
			image: true,
			slug: true
		},
		take: 10,
		cacheStrategy: {
			swr: 600,
			ttl: 600
		}
	});
}
