<script lang="ts">
	import '@fontsource-variable/inter';
	import '../../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { LayoutProps } from './$types';
	import Footer from '$lib/components/shared/footer.svelte';
	import Header from '$lib/components/shared/Header.svelte';
	let { children, data }: LayoutProps = $props();
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
