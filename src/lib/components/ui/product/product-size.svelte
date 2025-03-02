<script lang="ts">
	import type { StockAndSize } from '@prisma/client';
	import Button from '../button/button.svelte';
	import { currentSize } from '$lib/hooks/current-size.svelte';

	type ProductSizeProps = {
		sizes: StockAndSize[];
	};

	let { sizes }: ProductSizeProps = $props();
	currentSize.current = sizes[0];
	// Fungsi untuk mengubah ukuran yang dipilih
	const setSize = (size: StockAndSize) => {
		currentSize.current = size;
	};
</script>

<div class="flex flex-col space-y-2">
	<p class="text-lg font-semibold">
		Sizes •{' '}
		<span class="text-base text-muted-foreground">International</span>
	</p>
	<div class="flex flex-row flex-wrap gap-3">
		{#each sizes as size}
			<Button
				disabled={size.amount === 0}
				variant={currentSize.current.id === size.id ? 'default' : 'outline'}
				onclick={() => setSize(size)}>
				{size.name}
			</Button>
		{/each}
	</div>
</div>
