<script lang="ts">
	import type { Promo } from '@prisma/client';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Image } from '@unpic/svelte';
	import { transform } from 'unpic/providers/imagekit';
	import Autoplay from 'embla-carousel-autoplay';
	const plugin = Autoplay({ delay: 2000 });
	let promotions: Promo[] = $props();
</script>

<Carousel.Root
	class="mx-auto max-w-screen-lg"
	plugins={[plugin]}
	onmouseenter={plugin.stop}
	onmouseleave={plugin.reset}>
	<Carousel.Content>
		{#each promotions as promo, i (i)}
			<Carousel.Item class="min-w-fit">
				<div class="mx-auto w-fit overflow-hidden rounded-3xl">
					<Image
						src={promo.image}
						alt={promo.title}
						priority={i === 0}
						className="object-cover rounded-lg"
						width={900}
						height={300}
						layout="constrained"
						background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAAzNbS7e7s0cvMcneGrrfBz9HasazCPUaNZnugg5O2g5HEE0qg"
						transformer={transform} />
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next />
</Carousel.Root>
