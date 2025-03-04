<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	let { desc }: { desc: string } = $props();
</script>

<Accordion.Root type="single" class="space-y-2" value="details">
	<Accordion.Item value="details" class="border-none">
		<Accordion.Trigger class="rounded-lg bg-muted p-2"
			>Details</Accordion.Trigger>
		<Accordion.Content class="p-2">{@html desc}</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="a" class="border-none">
		<Accordion.Trigger class="rounded-lg bg-muted p-2"
			>How it Fits</Accordion.Trigger>
		<Accordion.Content class="p-2">
			Use this as a guide. Preference is a huge factor — if you&apos;re near the
			top of a size range and/or prefer more coverage, you may want to size up.</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="b" class="border-none">
		<Accordion.Trigger class="rounded-lg bg-muted p-2"
			>Fabric + Care</Accordion.Trigger>
		<Accordion.Content class="p-2">
			<ul class="list-inside list-disc leading-7">
				<li>Made from a sheer Belgian power micromesh.</li>
				<li>74% Polyamide (Nylon) 26% Elastane (Spandex)</li>
				<li>Adjustable hook &amp; eye closure and straps</li>
				<li>Hand wash in cold water, dry flat</li>
			</ul></Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="c" class="border-none">
		<Accordion.Trigger class="rounded-lg bg-muted p-2">FAQ</Accordion.Trigger>
		<Accordion.Content class="p-2"
			><ul class="list-inside list-disc leading-7">
				<li>
					All full-priced, unworn items, with tags attached and in their
					original packaging are eligible for return or exchange within 30 days
					of placing your order.
				</li>
				<li>
					Please note, packs must be returned in full. We do not accept partial
					returns of packs.
				</li>
				<li>Want to know our full returns policies? Here you go.</li>
				<li>
					Want more info about shipping, materials or care instructions? Here!
				</li>
			</ul></Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
