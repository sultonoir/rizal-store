import type { Product, ProductImage, Rating } from '@prisma/client';

export type ProductCardProps = Product & {
	productImage: ProductImage;
	link: string;
	rating: number;
};

export type RatingStats = {
	averageRating: number;
	ratingCounts: {
		stars: number;
		count: number;
		percentage: number;
	}[];
	totalReviews: number;
};

export type Pagination = {
	total: number;
	pages: number;
	current: number;
	limit: number;
};

export type RatingWithuser = Rating & {
	user: {
		name: string | null;
		image: string | null;
	};
};

export type ReviewsProps = {
	ratings: RatingWithuser[];
	pagination: Pagination;
	stats: RatingStats;
	page?: string;
};
