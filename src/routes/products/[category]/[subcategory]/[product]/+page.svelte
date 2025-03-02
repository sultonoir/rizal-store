<script lang="ts">
	import type { PageProps } from './$types';
	import ProductImages from '$lib/components/ui/product/product-images.svelte';
	import ProductPrice from '$lib/components/ui/product/product-price.svelte';
	import ProductSize from '$lib/components/ui/product/product-size.svelte';
	import Counter from '$lib/components/shared/Counter.svelte';
	import ProductRating from '$lib/components/ui/product/product-rating.svelte';
	import ProductBenefite from '$lib/components/ui/product/product-benefite.svelte';
	import AddCartForm from '$lib/components/form/cart/add-cart-form.svelte';
	let { data }: PageProps = $props();
	const product = data.product;
</script>

<svelte:head>
	<title>{product.name}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="flex flex-col gap-4 lg:flex-row lg:gap-10">
		<div class="lg:w-[55%]">
			<ProductImages images={product.productImage} />
		</div>
		<div class="flex flex-col space-y-4 lg:w-[45%]">
			<p class="text-2xl font-semibold">
				{product.name}
			</p>
			<ProductRating rating={4} />
			<ProductPrice
				price={product.price}
				discount={product.discount}
				priceAfterDiscount={product.priceAfterDiscount}
				priceClass="~text-2xl/4xl"
				discountClass="~text-xl/3xl" />
			<ProductSize sizes={product.stockandsize} />
			<div class="flex gap-2">
				<Counter />
				<AddCartForm {data} productId={product.id} />
			</div>
			<ProductBenefite />
		</div>
	</div>
</section>
