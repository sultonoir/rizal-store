<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import 'swiper/css';
	import { Autoplay } from 'swiper/modules';
	import { Image } from '@unpic/svelte';
	import { transform } from 'unpic/providers/imagekit';

	type Promo = {
		id: string;
		image: string;
		slug: string;
	};

	let promotions: Promo[] = $props();

	let swiperContainer: HTMLDivElement | null = null;

	onMount(() => {
		if (swiperContainer) {
			new Swiper(swiperContainer, {
				loop: true,
				slidesPerView: 1,
				autoplay: { delay: 3000, disableOnInteraction: false },
				scrollbar: { el: '.swiper-scrollbar', draggable: true },
				pagination: { el: '.swiper-pagination', clickable: true },
				modules: [Autoplay]
			});
		}
	});
</script>

<div
	bind:this={swiperContainer}
	class="swiper relative z-0 max-w-[928px] overflow-hidden rounded-2xl">
	<div class="swiper-wrapper">
		{#each promotions as promo, i (promo.id)}
			<div class="swiper-slide w-fit">
				<div class="mx-auto w-fit overflow-hidden rounded-3xl">
					<Image
						src={promo.image}
						alt={promo.slug}
						priority={i === 0}
						className="object-cover rounded-lg"
						width={900}
						height={300}
						layout="constrained"
						background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAAzNbS7e7s0cvMcneGrrfBz9HasazCPUaNZnugg5O2g5HEE0qg"
						transformer={transform} />
				</div>
			</div>
		{/each}
	</div>
</div>
