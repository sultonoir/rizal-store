<script lang="ts">
	import { type ProductImage } from '@prisma/client';
	import { Image } from '@unpic/svelte';
	import { transform } from 'unpic/providers/imagekit';
	let { images }: { images: ProductImage[] } = $props();
	let picture = $state(images[0]);

	$effect(() => {
		picture = images[0];
	});

	const setPicture = (image: ProductImage) => {
		picture = image;
	};
</script>

<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
	<div class="lens">
		<Image
			src={picture?.url}
			alt={picture?.id.toString()}
			width={713}
			height={713}
			priority={true}
			transformer={transform}
			layout="constrained"
			class="rounded-lg object-cover"
			background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAAzNbS7e7s0cvMcneGrrfBz9HasazCPUaNZnugg5O2g5HEE0qg" />
	</div>

	<div class="grid grid-cols-4 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each images as image}
			<button
				class="image-thumb"
				onmouseenter={() => setPicture(image)}
				onclick={() => setPicture(image)}>
				<Image
					src={image.url}
					alt={image.id.toString()}
					width={200}
					height={200}
					class="rounded-lg"
					transformer={transform}
					layout="constrained"
					priority={true}
					background="data:image/bmp;base64,Qk1aBAAAAAAAADYAAAAoAAAABAAAAAMAAAABABgAAAAAACQAAAATCwAAEwsAAAAAAAAAAAAAzNbS7e7s0cvMcneGrrfBz9HasazCPUaNZnugg5O2g5HEE0qg" />
			</button>
		{/each}
	</div>
</div>
