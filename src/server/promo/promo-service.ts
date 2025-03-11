import { db } from "../db";
import { unstable_cache } from "../unstable-cache";

export async function promoQuery() {
  return await db.promo.findMany({
    cacheStrategy: {
      ttl: 60,
      swr: 60,
      tags: ["promo_query"],
    },
    take: 10,
  });
}

export const getPromotions = unstable_cache(promoQuery, ["promo_query"], {
  revalidate: 60 * 60 * 2,
});
