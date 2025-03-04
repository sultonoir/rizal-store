<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import image from '$lib/images/promo3.png?enhanced';
</script>

<div
	class="relative mt-24 flex flex-col rounded-2xl bg-slate-50 p-4 pb-0 dark:bg-accent sm:rounded-[40px] sm:p-5 sm:pb-0 lg:flex-row lg:p-24">
	<div class="relative max-w-lg lg:w-[50%]">
		<h2 class="text-4xl font-semibold md:text-5xl">
			Don&apos;t miss out on special offers
		</h2>
		<span class="mt-5 block text-neutral-500 dark:text-neutral-400">
			Register to receive news about the latest, savings combos, discount
			codes...
		</span>
		<ul class="mt-10 space-y-4">
			<li class="flex items-center space-x-4">
				<span
					class="nc-Badge relative inline-flex rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800">
					01
				</span>
				<span class="font-medium text-neutral-700 dark:text-neutral-300">
					Savings combos
				</span>
			</li>
			<li class="flex items-center space-x-4">
				<span
					class="nc-Badge relative inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
					02
				</span>
				<span class="font-medium text-neutral-700 dark:text-neutral-300">
					Freeship
				</span>
			</li>
			<li class="flex items-center space-x-4">
				<span
					class="nc-Badge relative inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
					03
				</span>
				<span class="font-medium text-neutral-700 dark:text-neutral-300">
					Premium magazines
				</span>
			</li>
		</ul>
		<div class="relative mt-10 max-w-sm">
			<input
				class="border-default focus:border-primary-300 focus:ring-primary-200 disabled:bg-primary-200 dark:border-primary-700 dark:bg-default-900 dark:focus:ring-primary-600 dark:disabled:bg-primary-800 block h-11 w-full rounded-full border bg-white px-4 py-3 text-sm font-normal text-black outline-none focus:ring focus:ring-opacity-50 dark:focus:ring-opacity-25"
				placeholder="Enter your email"
				type="email" />
			<button
				aria-label="button subscription email"
				class="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 transform items-center justify-center rounded-full bg-accent text-slate-50 hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-70 dark:focus:ring-offset-0"
				type="submit">
				<ArrowRight class="text-sky-500" />
			</button>
		</div>
	</div>
	<div
		class="relative mt-10 block max-w-lg lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:max-w-[calc(50%-40px)]">
		<enhanced:img
			src={image}
			alt="email subscription"
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
		></enhanced:img>
	</div>
</div>
