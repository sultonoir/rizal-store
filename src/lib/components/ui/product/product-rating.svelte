<script lang="ts">
	import { Sparkles, Star } from 'lucide-svelte';
	let { rating }: { rating: number } = $props();
</script>

<div class="inline-flex items-center space-x-2">
	{#if rating === 0}
		<Sparkles size={16} class=" text-yellow-400" />
		{rating.toFixed(1)}
	{:else}
		<Star size={16} class="fill-yellow-400 text-yellow-400" />
		<p class="text-sm">
			{rating.toFixed(1)}
		</p>
	{/if}
</div>
