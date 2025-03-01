<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Spring } from 'svelte/motion';
	import Minus from 'lucide-svelte/icons/minus';
	import Plus from 'lucide-svelte/icons/plus';
	import { currentSize } from '$lib/hooks/current-size.svelte';
	import { quantity } from '$lib/hooks/quantity.svelte';
	const count = new Spring(1);
	const offset = $derived(modulo(count.current, 1));

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="flex w-fit items-center space-x-4 rounded-lg border p-1">
	<Button
		variant="ghost"
		size="icon"
		disabled={count.target === 1}
		onclick={() => {
			count.target -= 1;
			quantity.value -= 1;
		}}
		aria-label="Decrease the counter by one"
	>
		<Minus />
	</Button>

	<div class="counter-viewport relative size-10 overflow-hidden text-center text-lg">
		<div class="absolute size-full" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor(count.current + 1)}</strong>
			<strong class="absolute flex size-full items-center justify-center">{quantity.value}</strong>
		</div>
	</div>

	<Button
		variant="ghost"
		size="icon"
		disabled={count.current >= currentSize.current.amount}
		onclick={() => {
			count.target += 1;
			quantity.value += 1;
		}}
		aria-label="Increase the counter by one"
	>
		<Plus />
	</Button>
</div>
