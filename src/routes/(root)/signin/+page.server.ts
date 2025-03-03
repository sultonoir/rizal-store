import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createPost } from '$lib/components/form/post/postmodel';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (session) {
		redirect(307, '/');
	}

	return {
		form: await superValidate(zod(createPost))
	};
};

export const actions: Actions = {
	post: async (event) => {
		const form = await superValidate(event, zod(createPost));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { images } = form.data;

		if (!(images instanceof File)) {
			return fail(400, { form });
		}
		console.log(images);
		return message(form, 'hallo');
	},
	guest: async (event) => {
		const form = await superValidate(event, zod(createPost));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { images } = form.data;

		if (!(images instanceof File)) {
			return fail(400, { form });
		}
		console.log(images);
		return message(form, 'hallo');
	}
};
