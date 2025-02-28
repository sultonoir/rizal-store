<script lang="ts">
	import type { Product, ProductImage } from '@prisma/client';
	import { Image } from '@unpic/svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	type ProductCardProps = Product & {
		productImage: ProductImage;
	};

	// Menggunakan $props() untuk menerima objek ProductCardProps
	let { product }: { product: ProductCardProps } = $props();
</script>

<!-- Tampilan komponen -->
<Card.Root class="relative rounded-2xl border p-2 shadow-lg">
	<a href={`/products/${product.slug}`} title={product.name} data-sveltekit-preload-data>
		<Image
			alt={product.name}
			src={product.productImage.url}
			width={300}
			height={400}
			layout="constrained"
			class="rounded-lg object-cover"
		/>
		<Card.CardContent class="relative mt-4 space-y-2 bg-background p-2">
			<Card.CardTitle class="w-[calc(100%-1px)] truncate text-[16px] font-normal leading-none">
				{product.name}
			</Card.CardTitle>
			<div class="inline-flex gap-2">
				{#if product.discount > 0}
					<p class="text-white">${product.priceAfterDiscount}</p>
					<span class="text-red-500 line-through">${product.price}</span>
				{:else}
					<p class="text-white">${product.price}</p>
				{/if}
			</div>
		</Card.CardContent>
	</a>
</Card.Root>
