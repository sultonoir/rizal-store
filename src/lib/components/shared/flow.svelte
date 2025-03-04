<script lang="ts">
	import { Hiws } from '$lib/constant';
	import Badge from '../ui/badge/badge.svelte';
	import logo from '$lib/images/VectorHIW.be5444ab.svg';
</script>

<div
	class="border-b border-t border-slate-200 py-24 dark:border-slate-700 lg:py-32">
	<div
		class="relative grid gap-10 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4 xl:gap-20">
		<img
			src={logo}
			alt="vector background"
			class="absolute inset-x-0 top-5 hidden md:block"
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
		{#each Hiws as item}
			<div class="relative mx-auto flex max-w-xs flex-col items-center">
				<div
					class="mx-auto mb-4 max-w-[140px] rounded-full bg-slate-50 p-2 sm:mb-10">
					<enhanced:img
						src={item.image}
						alt="hiw1"
						class="bg-blend-color-burn"
						sizes="80px" />
				</div>
				<div class="space-y-5 text-center">
					<Badge variant={item.type ?? 'default'}>{item.step}</Badge>
					<h3 class="text-base font-semibold">{item.title}</h3>
					<span
						class="block text-sm leading-6 text-slate-600 dark:text-slate-400">
						{item.desc}
					</span>
				</div>
			</div>{/each}
	</div>
</div>
