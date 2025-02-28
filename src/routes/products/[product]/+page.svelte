<script lang="ts">
	import { Image } from '@unpic/svelte';
	import type { PageProps } from './$types';

	let { data: product }: PageProps = $props();
</script>

<svelte:head>
	<title>{product.name}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="flex flex-col gap-4 lg:flex-row lg:gap-10">
		<div class="lg:w-[55%]">
			<div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
				{#each product.productImage as image}
					<Image
						width={400}
						height={400}
						src={image.url}
						alt={product.name}
						layout="constrained"
						class="rounded-lg object-cover"
					/>
				{/each}
			</div>
		</div>

		<div class="space-y-4 lg:w-[45%]">
			<p class="text-2xl font-semibold">
				{product.name}
			</p>
		</div>
	</div>
</section>
