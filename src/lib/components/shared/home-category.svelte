<script lang="ts">
	import image1 from '$lib/images/1.jpg?enhanced';
	import image2 from '$lib/images/2.jpg?enhanced';
	import image3 from '$lib/images/3.jpg?enhanced';
	import image4 from '$lib/images/4.jpg?enhanced';
	import image5 from '$lib/images/5.jpg?enhanced';
	import image6 from '$lib/images/6.jpg?enhanced';
	import { ArrowRight } from 'lucide-svelte';
	const lists = [
		{
			name: 'Shoes',
			path: '/products/accessories/shoes',
			bgImage: '/explore1.svg',
			image: image2,
			totalProcuts: '155 products'
		},
		{
			name: 'T-shirt',
			path: '/products/t-shirt',
			bgImage: '/explore2.svg',
			image: image4,
			totalProcuts: '141 products'
		},
		{
			name: 'Outwear',
			path: '/products/outwear',
			bgImage: '/explore3.svg',
			image: image3,
			totalProcuts: '133 products'
		},
		{
			name: 'Pants',
			path: '/products/pants',
			bgImage: '/explore4.svg',
			image: image5,
			totalProcuts: '142 products'
		},
		{
			name: 'Shirt',
			path: '/products/shirt',
			bgImage: '/explore5.svg',
			image: image1,
			totalProcuts: '144 products'
		},
		{
			name: 'Bag',
			path: '/products/accessories/bags',
			bgImage: '/explore6.svg',
			image: image6,
			totalProcuts: '149 products'
		}
	];
</script>

<div
	class="relative z-0 rounded-[40px] bg-neutral-100/70 p-10 dark:bg-accent lg:p-20">
	<div
		class="nc-Section-Heading relative mb-12 flex flex-col justify-between text-neutral-900 dark:text-neutral-50 sm:flex-row sm:items-end lg:mb-14">
		<div class="mx-auto flex w-full flex-col items-center text-center">
			<h2
				class="justify-center text-3xl font-semibold md:text-4xl 2xl:text-5xl">
				Start exploring.
			</h2>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7 xl:grid-cols-3">
		{#each lists as item}
			<div
				class="group relative w-full overflow-hidden rounded-3xl bg-white p-4 transition-shadow hover:shadow-lg dark:bg-neutral-900">
				<div class="relative z-10 flex flex-col justify-between space-y-20">
					<div class="flex items-center justify-between">
						<div
							class="relative h-20 w-20 overflow-hidden rounded-full bg-indigo-50">
							<enhanced:img
								sizes="80px"
								alt={item.name}
								src={item.image}
								class="relative aspect-square object-cover" />
						</div>
						<span
							class="text-slate-700dark:text-neutral-300 text-xs font-medium">
							{item.totalProcuts}
						</span>
					</div>
					<div class="mt-5">
						<span class="mb-2 block text-sm text-slate-500 dark:text-slate-400">
							Manufacturar
						</span>
						<h2 class="text-2xl font-semibold sm:text-3xl">{item.name}</h2>
					</div>
					<a
						class="group-hover:text-primary-500 flex items-center text-sm font-medium transition-colors"
						href={item.path}>
						<span>See Collection</span>
						<ArrowRight />
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
