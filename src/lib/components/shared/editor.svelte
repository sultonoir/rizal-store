<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Button from '../ui/button/button.svelte';
	import {
		Bold,
		Heading1,
		Italic,
		List,
		ListOrdered,
		Strikethrough
	} from 'lucide-svelte';

	let element: HTMLDivElement;
	let editor = $state<InstanceType<typeof Editor>>();
	let values = $state('');

	$effect(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					bulletList: {
						keepMarks: true,
						keepAttributes: false,
						HTMLAttributes: {
							class: 'list-disc pl-[30px]'
						}
					},
					orderedList: {
						keepMarks: true,
						keepAttributes: false,
						HTMLAttributes: {
							class: 'list-decimal pl-[30px]'
						}
					},
					heading: {
						levels: [1],
						HTMLAttributes: {
							class: 'text-3xl '
						}
					}
				})
			],
			editorProps: {
				attributes: {
					class:
						'min-h-[250px] border border-border px-5 py-2 rounded-sm focus:border-primary/50 focus:outline-none focus:ring focus:ring-primary/30'
				}
			},

			content: '<p>Hello World! 🌍️ </p>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate(props) {
				values = props.editor.getHTML();
			}
		});
		return () => {
			editor?.destroy();
		};
	});
</script>

{#if editor}
	<div class="flex flex-wrap items-center gap-2 rounded-sm border p-2">
		<Button
			size="sm"
			variant="ghost"
			type="button"
			onclick={() => editor?.chain().focus().toggleBold().run()}
			disabled={!editor.can().chain().focus().toggleBold().run()}
			class={editor.isActive('bold') ? 'is-active' : ''}>
			<Bold class="size-4" />
		</Button>
		<Button
			size="sm"
			variant="ghost"
			type="button"
			onclick={() => editor?.chain().focus().toggleItalic().run()}
			disabled={!editor.can().chain().focus().toggleItalic().run()}
			class={editor.isActive('italic') ? 'is-active' : ''}>
			<Italic class="size-4" />
		</Button>
		<Button
			size="sm"
			variant="ghost"
			type="button"
			onclick={() => editor?.chain().focus().toggleStrike().run()}
			disabled={!editor.can().chain().focus().toggleStrike().run()}
			class={editor.isActive('strike') ? 'is-active' : ''}>
			<Strikethrough class="size-4" />
		</Button>
		<Button
			size="sm"
			variant="ghost"
			type="button"
			onclick={() => editor?.chain().focus().toggleBulletList().run()}
			class={editor.isActive('bulletList') ? 'is-active' : ''}>
			<List />
		</Button>
		<Button
			size="sm"
			variant="ghost"
			type="button"
			onclick={() => editor?.chain().focus().toggleOrderedList().run()}
			class={editor.isActive('orderedList') ? 'is-active' : ''}>
			<ListOrdered />
		</Button>
		<Button
			size="sm"
			variant="ghost"
			type="button"
			onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
			class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
			<Heading1 />
		</Button>
	</div>
{/if}

<div bind:this={element}></div>
<div>
	{values}
</div>
