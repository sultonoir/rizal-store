<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import { Image } from '@unpic/svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let products = data.products;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<ul class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each products as product}
			<li class="flex flex-col gap-2 rounded-lg bg-black p-2">
				<a href={`/products/${product.slug}`} data-sveltekit-preload-data>
					<Image
						src={product.productImage[0].url}
						layout="constrained"
						width={300}
						height={400}
						alt="A lovely bath"
					/>
					<p class="line-clamp-1 text-white">{product.name}</p>
					<div class="inline-flex gap-2">
						{#if product.discount > 0}
							<p class="text-white">${product.priceAfterDiscount}</p>
							<span class="text-rose-400 line-through">${product.price}</span>
						{:else}
							<p class="text-white">${product.price}</p>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>
