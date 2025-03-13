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

async function promoBySlug({ slug }: { slug: string }) {
  // Fetch the promo data
  const promo = await db.promo.findFirst({
    where: {
      slug,
    },
    include: {
      product: {
        include: {
          product: {
            include: {
              productImage: {
                take: 1,
                orderBy: {
                  createdAt: "asc",
                },
              },
            },
          },
        },
      },
    },
  });

  if (!promo) {
    return null;
  }

  // Extract product IDs for rating calculation
  const productIds = promo.product.flatMap((item) => item.productId);

  // Fetch average ratings for the products
  const ratings = await db.rating.groupBy({
    by: ["productId"],
    _avg: {
      value: true,
    },
    where: {
      productId: {
        in: productIds,
      },
    },
  });

  // Map over each product to add details like rating and product link
  const product = promo.product.map((product) => {
    // Find the rating for the current product (default to 0 if not found)
    const productRating =
      ratings.find((rating) => rating.productId === product.productId)?._avg
        .value ?? 0;

    return {
      ...product.product,
      rating: productRating,
      productImage: product.product.productImage[0] ?? null, // Ensure fallback in case no image exists
    };
  });

  return {
    ...promo,
    product,
  };
}

export const getPromoByslug = unstable_cache(promoBySlug, ["promo"], {
  revalidate: 60 * 60 * 2,
});
