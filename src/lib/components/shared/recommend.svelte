<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { ProductCardProps } from '$lib/types';
	import ProductCard from '../ui/product/product-card.svelte';
	let {
		title = 'You May Like This Product 🥰',
		products
	}: { title?: string; products: ProductCardProps[] } = $props();
</script>

<Carousel.Root>
	<div class="mb-5 flex items-center justify-between">
		<h3 class="font-bold ~text-2xl/4xl">{title}</h3>
		<div class="relative flex gap-2">
			<Carousel.Previous class="relative left-0 top-0 translate-y-0" />
			<Carousel.Next class="relative right-0 top-0 translate-y-0" />
		</div>
	</div>
	<Carousel.Content>
		{#each products as product}
			<Carousel.Item
				class="basis-1/2 sm:basis-1/3 md:basis-1/4 
			lg:basis-1/5 xl:basis-1/6">
				<ProductCard {product} />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
</Carousel.Root>
