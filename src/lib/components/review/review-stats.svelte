<script lang="ts">
	import type { RatingStats } from '$lib/types';
	import { cn } from '$lib/utils';
	import { Star } from 'lucide-svelte';
	import Progress from '../ui/progress/progress.svelte';

	let { ratingCounts, averageRating, totalReviews }: RatingStats = $props();
</script>

<div class="rounded-lg border bg-card p-6 shadow-sm">
	<div class="mb-6 flex flex-col items-center gap-4 lg:flex-row">
		<div class="text-center">
			<div class="text-4xl font-bold">{averageRating.toFixed(1)}</div>
			<div class="flex items-center justify-center gap-1 text-yellow-400">
				{#each Array(5) as _, i (i)}
					<Star
						class={cn(
							'h-4 w-4',
							i < Math.round(averageRating) ? 'fill-current' : 'fill-muted'
						)} />
				{/each}
			</div>
			<div class="mt-1 text-sm text-muted-foreground">
				{totalReviews} reviews
			</div>
		</div>
		<div class="flex w-full flex-1 flex-col gap-2">
			{#each ratingCounts as rating}
				<div class="flex items-center gap-2">
					<div class="min-w-[60px] flex-shrink-0 whitespace-nowrap text-sm">
						{rating.stars} stars
					</div>
					<Progress value={rating.percentage} class="w-full flex-grow" />
					<div
						class="min-w-[30px] flex-shrink-0 whitespace-nowrap text-right text-sm text-muted-foreground">
						{rating.count}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
