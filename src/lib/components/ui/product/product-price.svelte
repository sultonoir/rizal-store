<script lang="ts">
	import { currentSize } from '$lib/hooks/current-size.svelte';
	import { cn } from '$lib/utils';

	type ProductPrice = {
		price: number;
		discount: number;
		priceAfterDiscount: number;
		priceClass?: string;
		discountClass?: string;
	};

	let { price, priceAfterDiscount, discount, priceClass, discountClass }: ProductPrice = $props();
</script>

<div class="inline-flex gap-2">
	{#if discount > 0}
		<p class={cn('font-bold', priceClass)}>${priceAfterDiscount}</p>
		<span class={cn('text-destructive line-through dark:text-red-500', discountClass)}
			>${price}</span
		>
	{:else}
		<p class={cn('font-bold', priceClass)}>${price}</p>
	{/if}
</div>
