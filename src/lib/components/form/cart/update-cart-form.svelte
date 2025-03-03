<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Minus, Plus } from 'lucide-svelte';

	let {
		quantity,
		max,
		cartId
	}: {
		cartId: string;
		quantity: number;
		max: number;
	} = $props();

	let timeout: NodeJS.Timeout | null = null;
	let itemCount = $state(quantity);

	async function updateItemCart() {
		const formData = new FormData();
		formData.set('id', cartId);
		formData.set('quantity', itemCount.toString());

		await fetch('/?/updatecart', {
			method: 'POST',
			body: formData
		});
		invalidateAll();
	}

	function increment() {
		itemCount += 1;

		// Debounce update ke debouncedCount
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			updateItemCart();
		}, 300);
	}

	function decrement() {
		itemCount--;

		// Debounce update ke debouncedCount
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			updateItemCart();
		}, 300);
	}
</script>

<div class="mt-auto flex w-fit gap-3 rounded-lg bg-muted p-1 dark:bg-muted/50">
	<Button
		class="size-6"
		size="icon"
		disabled={itemCount <= 1}
		onclick={decrement}>
		<Minus />
	</Button>
	<div>{itemCount}</div>
	<Button
		class="size-6"
		size="icon"
		disabled={itemCount >= max}
		onclick={increment}>
		<Plus />
	</Button>
</div>
