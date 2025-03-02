<script lang="ts">
	import type { PageProps } from './$types';
	import ProductCard from '$lib/components/ui/product/product-card.svelte';
	import PromoBanner from '$lib/components/promo/promo-banner.svelte';

	let { data }: PageProps = $props();
	let products = data.products;
</script>

<svelte:head>
	<title>Rizal Store Official • Rizal Store</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="space-y-10">
	{#await data.promotions}
		Loading promotions...
	{:then promotions}
		<PromoBanner {...promotions} />
	{:catch error}
		<p>error loading promotions: {error.message}</p>
	{/await}

	<div
		class="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
		{#each products as product}
			<ProductCard {product} />
		{/each}
	</div>
</div>
