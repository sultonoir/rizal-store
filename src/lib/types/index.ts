import type { Rating } from '@prisma/client';

export type ProductCardProps = {
	id: string;
	name: string;
	slug: string;
	price: number;
	discount: number;
	priceAfterDiscount: number;
	image: string;
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
