<script lang="ts">
	import logo from '$lib/images/logo.png';
	import DarkModeToggle from '$lib/components/ui/dark-mode/dark-mode-toggle.svelte';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { ShoppingBag } from 'lucide-svelte';
	import { authClient } from '$lib/auth-client';
	import SearchBar from '$lib/components/search/search-bar.svelte';
	let { count }: { count: number } = $props();
	const session = authClient.useSession();
</script>

<header class="sticky top-0 z-50 border-b bg-background py-2">
	<div class="mx-auto flex max-w-screen-2xl items-center justify-between px-10">
		<a href="/">
			<img src={logo} alt="SvelteKit" width="40" height="40" />
		</a>
		<SearchBar />
		<div class="flex items-center gap-2">
			<div class="relative">
				<a
					href="/signin"
					class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}
				>
					<ShoppingBag />
				</a>

				{#if count > 0}
					<div
						class="absolute -right-[9px] -top-[4px] flex size-5 items-center justify-center rounded-full bg-primary text-xs leading-none text-primary-foreground lg:-right-1 lg:top-0"
					>
						{count}
					</div>
				{/if}
			</div>

			<DarkModeToggle />
			{#if $session.data}
				<button
					onclick={async () => {
						await authClient.signOut();
					}}
				>
					Sign Out
				</button>
			{:else}
				<a href="/signin" class={cn(buttonVariants({ variant: 'default' }))}> Signin</a>
			{/if}
		</div>
	</div>
</header>
