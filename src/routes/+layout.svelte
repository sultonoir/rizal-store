<script lang="ts">
	import '@fontsource-variable/inter';
	import Header from '../lib/components/shared/Header.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { LayoutProps } from './$types';
	let { children, data }: LayoutProps = $props();
</script>

<div class="app">
	<Header count={data.posts.length} />

	<ModeWatcher />
	<main class="container py-5">
		{@render children()}
	</main>

	<Toaster richColors position="top-center" />
</div>
