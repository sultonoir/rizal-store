import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createPost } from '$lib/components/form/post/postmodel';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(createPost))
	};
};

export const actions: Actions = {
	default: async (event) => {
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
