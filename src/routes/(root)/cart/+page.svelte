<script lang="ts">
	import UpdateCartForm from '$lib/components/form/cart/update-cart-form.svelte';
	import { Image } from '@unpic/svelte';
	import type { PageProps } from './$types';
	import ProductPrice from '$lib/components/ui/product/product-price.svelte';
	import { transform } from 'unpic/providers/imagekit';
	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { XIcon } from 'lucide-svelte';

	let { data }: PageProps = $props();

	function calculateTotal(product: {
		priceAfterDiscount: number;
		quantity: number;
	}): string {
		const total = product.priceAfterDiscount * product.quantity;
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(total);
	}

	async function removeCart(id: string) {
		const formData = new FormData();
		formData.set('id', id);
		await fetch('/?/removecart', {
			method: 'POST',
			body: formData
		});

		await invalidateAll();
	}

	let totalCost = $state(0);

	$effect(() => {
		totalCost = data.carts.reduce(
			(acc, product) => acc + product.quantity * product.priceAfterDiscount - 4,
			0
		);
	});
</script>

<svelte:head>
	<title>Cart • Rizal Store</title>
	<meta name="description" content="Cart product" />
</svelte:head>

<div class="flex min-h-[calc(100dvh-100px)] flex-col gap-2">
	{#each data.carts as cart}
		<div class="flex flex-row gap-5">
			<div class="flex-none overflow-hidden rounded-lg">
				<Image
					src={cart.image}
					alt={cart.name}
					layout="constrained"
					width={100}
					height={150}
					transformer={transform}
					className="object-cover flex-none rounded-lg"
					background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAAzNbS7e7s0cvMcneGrrfBz9HasazCPUaNZnugg5O2g5HEE0qg" />
			</div>
			<div class="flex w-full flex-col items-start justify-start gap-[6px]">
				<div
					class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
					Size : {cart.size}
				</div>
				<a
					href={`/product/${cart.slug}`}
					class="line-clamp-1 text-lg font-semibold">
					{cart.name}
				</a>
				<UpdateCartForm
					cartId={cart.id}
					max={cart.max}
					quantity={cart.quantity} />
				<ProductPrice
					price={cart.price}
					priceAfterDiscount={cart.priceAfterDiscount}
					discount={cart.discount}
					priceClass="text-lg"
					discountClass="~text-sm/md" />
			</div>
			<div class="flex w-full flex-col items-end gap-[6px]">
				<Button
					class="size-6"
					size="icon"
					variant="ghost"
					onclick={async () => removeCart(cart.id)}>
					<XIcon />
				</Button>
				<p class="text-lg">
					{calculateTotal({
						priceAfterDiscount: cart.priceAfterDiscount,
						quantity: cart.quantity
					})}
				</p>
			</div>
		</div>
	{/each}
	<div
		class="fixed bottom-0 left-0 right-0 z-10 mt-auto border-t bg-muted p-3 lg:relative lg:z-0 lg:rounded-lg lg:border-none">
		<div class="flex items-center justify-between">
			<div class="flex flex-col items-start justify-start">
				<p class="text-base">First Order (- $4)</p>
				<p class="text-lg">
					Estimated total{' '}
					<span class="text-xl">${totalCost.toFixed(2)}</span>
				</p>
			</div>
			<Button onclick={() => goto('/checkout')} size="lg">Checkout</Button>
		</div>
	</div>
</div>
