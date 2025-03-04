import { getCartUserId } from '$lib/server/controller/cart-controller';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(307, '/signin');
	}
	const carts = await getCartUserId(locals.user.id);

	return {
		carts
	};
};

export const prerender = true;
