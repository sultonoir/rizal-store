<script lang="ts">
	import PromoBanner from '$lib/components/promo/promo-banner.svelte';
	import Emailsubcribe from '$lib/components/shared/emailsubcribe.svelte';
	import Flow from '$lib/components/shared/flow.svelte';
	import HomeCategory from '$lib/components/shared/home-category.svelte';
	import Recommend from '$lib/components/shared/recommend.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Rizal Store Official • Rizal Store</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="mx-auto min-h-screen max-w-screen-lg space-y-10 py-5">
	<PromoBanner {...data.promotions} />
	<Recommend products={data.products} />
	<Flow />
	<HomeCategory />
	<Emailsubcribe />
</div>
