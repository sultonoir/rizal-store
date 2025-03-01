<script lang="ts">
	import { ArrowRight, Search } from 'lucide-svelte';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';
</script>

<form action="/products" class="w-full px-10">
	<Label for="Search product" class="sr-only">Search product</Label>
	<div class="relative">
		<Input
			id="Search product"
			class="peer pe-9 ps-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			placeholder="Search..."
			name="q"
			type="search"
		/>
		<div
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
		>
			<Search size={16} strokeWidth={2} />
		</div>
		<button
			class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
			aria-label="Submit search"
			type="submit"
		>
			<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
		</button>
	</div>
</form>
