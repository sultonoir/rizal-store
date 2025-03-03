<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageProps } from './$types';

	interface Comments {
		postId: number;
		id: number;
		name: string;
		email: string;
		body: string;
	}
	let { data }: PageProps = $props();
	let page = $state(1);
	let comments = $state<Comments[]>(data.comments);

	function fetchComment() {
		fetch(`https://jsonplaceholder.typicode.com/comments?postId=${page}`)
			.then((response) => response.json())
			.then((json) => (comments = json));
	}
	$effect(() => {
		fetchComment();
	});
</script>

<svelte:head>
	<title>About me</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<ul class="flex flex-col gap-3">
		{#each comments as comment}
			<li class="space-x-2">
				<span>{comment.id}</span>
				<span>{comment.body}</span>
			</li>
		{/each}
	</ul>
	<div class="space-x-3">
		<Button disabled={page === 1} onclick={() => page--}>back</Button>
		<Button onclick={() => page++}>next</Button>
		<a href="/about" data-sveltekit-preload-data>about</a>
	</div>
</div>
