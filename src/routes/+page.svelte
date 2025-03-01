<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import { Image } from '@unpic/svelte';
	import type { PageProps } from './$types';
	import ProductCard from '$lib/components/ui/product/product-card.svelte';
	let { data }: PageProps = $props();
	let products = data.products;
</script>

<svelte:head>
	<title>Rizal Store Official • Rizal Store</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
		{#each products as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>
