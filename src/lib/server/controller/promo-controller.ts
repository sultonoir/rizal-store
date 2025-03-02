import { db } from '$lib/db';

export async function getPromotions() {
	return await db.promo.findMany();
}
