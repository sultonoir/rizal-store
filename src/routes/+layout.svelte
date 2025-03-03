<script lang="ts">
	import '@fontsource-variable/inter';
	import Header from '../lib/components/shared/Header.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { LayoutProps } from './$types';
	import Footer from '$lib/components/shared/footer.svelte';
	import { onNavigate } from '$app/navigation';
	let { children, data }: LayoutProps = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="app">
	<Header count={data.cartCount} />

	<ModeWatcher />
	<main class="container py-5">
		{@render children()}
	</main>
	<Footer />
	<Toaster richColors position="top-center" />
</div>
