import type { PageServerLoad } from './$types';

interface Comments {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/comments?postId=1`
	);
	const comments: Comments[] = await res.json();

	return { comments };
};
