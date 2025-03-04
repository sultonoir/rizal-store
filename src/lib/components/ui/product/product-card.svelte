<script lang="ts">
	import { Image } from '@unpic/svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import ProductPrice from './product-price.svelte';
	import ProductRating from './product-rating.svelte';
	import type { ProductCardProps } from '$lib/types';
	import { transform } from 'unpic/providers/imagekit';
	let { product }: { product: ProductCardProps } = $props();
</script>

<!-- Tampilan komponen -->
<Card.Root class="relative rounded-2xl border p-2 shadow-lg">
	<a
		href={`/product/${product.slug}`}
		title={product.name}
		data-sveltekit-preload>
		<Image
			alt={product.name}
			src={product.image}
			width={250}
			height={400}
			transformer={transform}
			layout="constrained"
			class="rounded-lg object-cover"
			background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAAzNbS7e7s0cvMcneGrrfBz9HasazCPUaNZnugg5O2g5HEE0qg" />

		<Card.CardContent
			class="relative mt-2 flex flex-col space-y-1 bg-background p-2">
			<Card.CardTitle
				class="w-[calc(100%-1px)] truncate text-[16px] font-normal leading-none">
				{product.name}
			</Card.CardTitle>
			<ProductRating rating={product.rating} />
			<ProductPrice
				price={product.price}
				discount={product.discount}
				priceAfterDiscount={product.priceAfterDiscount} />
		</Card.CardContent>
	</a>
</Card.Root>
