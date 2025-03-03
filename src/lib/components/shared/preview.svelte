<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	let element: HTMLDivElement;
	let editor = $state<InstanceType<typeof Editor>>();
	let { value }: { value: string } = $props();
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
			editable: false,
			content: value,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
		return () => {
			editor?.destroy();
		};
	});
</script>

<div bind:this={element}></div>
