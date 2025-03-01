<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createPost, type CreatePost } from './postmodel';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { form: SuperValidated<CreatePost> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(createPost),
		onUpdated: ({ form: f }) => {
			if (f.errors) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;

	// let files = $state<FileList>();

	// $effect(() => {
	// 	if (files) {
	// 		formData.set({ images: Array.from(files) });
	// 	}
	// });
</script>

<form method="POST" use:enhance enctype="multipart/form-data">
	<Form.Field {form} name="images">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input type="file" multiple {...props} bind:value={$formData.images} />
			{/snippet}
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>

<!-- {#if files}
	<h2>Selected files:</h2>
	{#each Array.from(files) as file}
		<p>{file.name} ({file.size} bytes)</p>
	{/each}
{/if} -->
