<script lang="ts">
	import logo from '$lib/images/svelte-logo.svg';
	import '@fontsource-variable/inter';
	import Header from './Header.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
	const year = new Date().getFullYear().toString();
</script>

<div class="app">
	<Header />
	<ModeWatcher />
	<main class="mx-auto max-w-screen-xl px-10 py-10">
		{@render children()}
	</main>

	<footer class="not-prose border-t">
		<section class="container mx-auto">
			<div class="grid gap-6 p-6 sm:p-8">
				<div class="grid gap-6">
					<a href="/">
						<img src={logo} alt="SvelteKit" width="40" height="40" />
					</a>
					<p class="max-w-screen-md">
						Rizal Store is a leading online fashion retailer that offers the latest trends and
						styles in clothing, shoes, and accessories for men and women. Our mission is to provide
						our customers with a seamless and enjoyable shopping experience, allowing them to stay
						ahead of the fashion curve without breaking the bank
					</p>
					<div
						class="mb-6 flex flex-col gap-4 text-sm text-muted-foreground underline underline-offset-4 md:mb-0 md:flex-row"
					>
						<a href="/">Privacy Policy</a>
						<a href="/">Terms of Service</a>
						<a href="/">Cookie Policy</a>
					</div>
					<p class="text-muted-foreground">
						©{' '}
						<a href="https://github.com/sultonoir/Rizal Store">Rizal Store</a>
						. All rights reserved. {year}-present.
					</p>
				</div>
			</div>
		</section>
	</footer>
</div>
