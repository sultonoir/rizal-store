import { auth } from '$lib/auth';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ request }) => {
	return auth.handler(request);
};
export const POST: RequestHandler = ({ request }) => {
	return auth.handler(request);
};
