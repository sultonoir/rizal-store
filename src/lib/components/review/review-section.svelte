<script lang="ts">
	import type { ReviewsProps } from '$lib/types';
	import { cn } from '$lib/utils';
	import ReviewCard from './review-card.svelte';
	import ReviewStats from './review-stats.svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import * as Pagination from '$lib/components/ui/pagination/index.js';

	const isDesktop = new MediaQuery('(min-width: 768px)');
	let { reviews, slug }: { reviews: ReviewsProps; slug: string } = $props();

	let initialData = $state(reviews);
	const count = $derived(reviews.pagination.total);
	const perPage = $derived(isDesktop.current ? 4 : 4);
	const siblingCount = $derived(isDesktop.current ? 1 : 0);

	async function onPageChange(page: number) {
		const response = await fetch(`/api/rating/${slug}?page=${page}`);
		const reviews: ReviewsProps = await response.json();
		initialData = reviews;
		document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<div
	id="reviews"
	class={cn('scroll-mt-28 bg-background', {
		'min-h-fit': initialData.pagination.pages <= 7
	})}>
	<div class="relative w-full">
		<h1 class="mb-8 text-4xl font-bold">Customer Reviews</h1>
		<div class="flex flex-col gap-10 lg:flex-row">
			<!-- {/* Stats */} -->
			<div class="order-1 mb-8 w-full flex-none lg:order-2 lg:max-w-sm">
				<ReviewStats {...initialData.stats} />
			</div>
			<!-- {/* List */} -->
			<div
				class="order-2 mb-8 grid w-full gap-1 divide-y md:grid-cols-1 lg:order-1">
				{#each initialData.ratings as review}
					<ReviewCard
						image={review.user.image}
						name={review.user.name}
						value={review.value}
						message={review.message}
						createdAt={review.createdAt} />
				{/each}
			</div>
		</div>
		<!-- {/* Pagination */} -->
		<Pagination.Root {count} {perPage} {siblingCount} {onPageChange}>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</div>
</div>
