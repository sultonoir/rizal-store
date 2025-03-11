import { RecommedParams } from "@/types";
import { db } from "../db";
import { unstable_cache } from "../unstable-cache";

export async function queryRecommendByslug({ slug }: { slug: string }) {
  const categoryName = await db.category.findFirst({
    where: {
      productDetails: {
        some: {
          product: {
            slug,
          },
        },
      },
    },
  });

  if (!categoryName) {
    return [];
  }

  return await queryRecommendation({ categories: [categoryName?.name] });
}

export async function queryRecommendation({
  categories,
  subcategories,
  take,
}: RecommedParams) {
  const products = await db.productDetails.findMany({
    where: {
      category: {
        name:
          categories && categories.length !== 0
            ? { in: categories }
            : undefined,
      },
      subcategory: {
        name:
          subcategories && subcategories.length !== 0
            ? { in: subcategories }
            : undefined,
      },
    },
    include: {
      product: {
        include: {
          productImage: {
            take: 1,
            orderBy: {
              createdAt: "asc",
            },
          },
          rating: true,
        },
      },
      subcategory: true,
      category: true,
    },
    take,
  });

  const productIds = products.flatMap((item) => item.productId);

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

  const result = products.map((product) => {
    //find rating
    const productRating =
      ratings.find((rating) => rating.productId === product.productId)?._avg
        .value ?? 0;

    //return result
    return {
      ...product.product,
      rating: productRating,
      productImage: product.product.productImage[0]!,
    };
  });

  return result;
}

export const getRecommendByslug = unstable_cache(
  queryRecommendByslug,
  ["slug"],
  {
    revalidate: 60 * 60 * 2,
  },
);
