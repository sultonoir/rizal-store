import { queryRating } from '$lib/server/controller/reviewer-controller';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const slug = params.slug;
	const page = url.searchParams.get('page');

	const reviewers = await queryRating({ slug, page });
	return json(reviewers);
};
