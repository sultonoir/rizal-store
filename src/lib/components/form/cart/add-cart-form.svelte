<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { currentSize } from '$lib/hooks/current-size.svelte';
	import { Loader2, ShoppingBag } from 'lucide-svelte';
	import { addCartSchema, type AddCartSchema } from './schema';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { quantity } from '$lib/hooks/quantity.svelte';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	let isPending = $state(false);
	let {
		data,
		productId
	}: {
		data: { form: SuperValidated<AddCartSchema> };
		productId: string;
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(addCartSchema),
		onSubmit() {
			isPending = true;
		},
		onUpdated: async ({ form: f }) => {
			if (f.valid) {
				toast.success('Add to cart successfuly');
				quantity.value = 1;
				await invalidateAll();
			} else {
				toast.error('Please fix the errors in the form.');
			}
		},
		onResult() {
			isPending = false;
		}
	});

	const { enhance } = form;
</script>

<form method="POST" action="/?/addcart" use:enhance class="w-full">
	<Form.Field {form} name="productId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label class="sr-only">product name</Form.Label>
				<Input {...props} type="hidden" value={productId} />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="size">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label class="sr-only">size</Form.Label>
				<Input {...props} type="hidden" bind:value={currentSize.current.name} />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="quantity">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label class="sr-only">size</Form.Label>
				<Input {...props} type="hidden" bind:value={quantity.value} />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Form.Button disabled={isPending} class="h-[50px] w-full gap-2">
		{#if isPending}
			<Loader2 class="animate-spin" />
		{:else}
			<ShoppingBag />
		{/if}
		Add to cart
	</Form.Button>
</form>
