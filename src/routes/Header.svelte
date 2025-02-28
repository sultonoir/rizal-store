<script lang="ts">
	import logo from '$lib/images/svelte-logo.svg';
	import DarkModeToggle from '$lib/components/ui/dark-mode/dark-mode-toggle.svelte';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<header class="sticky top-0 z-50 border-b bg-background py-2">
	<div class="mx-auto flex max-w-screen-2xl items-center justify-between px-10">
		<a href="/">
			<img src={logo} alt="SvelteKit" width="40" height="40" />
		</a>
		<div class="flex items-center gap-2">
			<DarkModeToggle />
			<a href="/signin" class={cn(buttonVariants({ variant: 'default' }))}> Signin</a>
		</div>
	</div>
</header>
