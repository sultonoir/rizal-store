<script lang="ts">
	import type { PageProps } from './$types';
	import ProductImages from '$lib/components/ui/product/product-images.svelte';
	import ProductPrice from '$lib/components/ui/product/product-price.svelte';
	import ProductSize from '$lib/components/ui/product/product-size.svelte';
	import Counter from '$lib/components/shared/Counter.svelte';
	import ProductRating from '$lib/components/ui/product/product-rating.svelte';
	import ProductBenefite from '$lib/components/ui/product/product-benefite.svelte';
	import AddCartForm from '$lib/components/form/cart/add-cart-form.svelte';
	import Recommend from '$lib/components/shared/recommend.svelte';
	import ReviewSection from '$lib/components/review/review-section.svelte';
	import ProductDesc from '$lib/components/ui/product/product-desc.svelte';
	let { data }: PageProps = $props();
	const product = $derived(data.product);
	const desc = $derived(data.product.desc);
</script>

<svelte:head>
	<title>{product.name} • Rizal Store</title>
	<meta
		name="description"
		content="Rizal Store is a leading online fashion retailer that offers the
					latest trends and styles in clothing, shoes, and accessories for men
					and women. Our mission is to provide our customers with a seamless and
					enjoyable shopping experience, allowing them to stay ahead of the
					fashion curve without breaking the bank" />
</svelte:head>

<section class="min-h-screen space-y-10 py-5">
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
			<ProductDesc {desc} />
			<ProductBenefite />
		</div>
	</div>
	<ReviewSection reviews={data.reviews} slug={data.slug} />
	<Recommend products={data.recommendations} />
</section>
