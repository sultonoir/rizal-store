import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getReviews } from '$lib/server/controller/reviewer-controller';

export const GET: RequestHandler = async ({ params, url }) => {
	const slug = params.slug;
	const page = url.searchParams.get('page');

	const reviewers = await getReviews({ slug, page });
	return json(reviewers);
};
