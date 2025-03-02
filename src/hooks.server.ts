import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Get the session
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	// Set session and user to locals
	event.locals.session = session?.session;
	event.locals.user = session?.user;

	const response = await resolve(event);
	return response;
};
