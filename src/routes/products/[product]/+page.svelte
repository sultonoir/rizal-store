<script lang="ts">
	import { Image } from '@unpic/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if !data.product}
		<h1>Product not found</h1>
	{:else}
		<div class="flex gap-10">
			<div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
				{#each data.product.productImage as image}
					<Image
						width={400}
						height={400}
						src={image.url}
						alt={data.product.name}
						layout="constrained"
						class="rounded-lg object-cover"
					/>
				{/each}
			</div>
			<div>
				<p class="text-2xl font-semibold">
					{data.product.name}
				</p>
			</div>
		</div>
	{/if}
</section>
