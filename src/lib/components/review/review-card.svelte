<script lang="ts">
	import { cn } from '$lib/utils';
	import { Image } from '@unpic/svelte';
	import { Star } from 'lucide-svelte';
	import { formatDate, formatDistanceToNowStrict } from 'date-fns';
	import logo from '$lib/images/logo.png';

	interface ReviewCardProps {
		name?: string | null;
		value: number;
		message: string;
		image?: string | null;
		createdAt: Date;
	}
	let { image, value, message, createdAt, name }: ReviewCardProps = $props();

	export function fromNow(from: Date) {
		if (!(from instanceof Date)) {
			return "Invalid input: 'from' must be a Date object";
		}

		const currentDate = new Date();
		if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
			return formatDistanceToNowStrict(from, { addSuffix: true });
		} else {
			if (currentDate.getFullYear() === from.getFullYear()) {
				return formatDate(from, 'MMM d');
			} else {
				return formatDate(from, 'MMM d, yyyy');
			}
		}
	}

	const now = fromNow(new Date(createdAt));
</script>

<div class="flex gap-5 py-4 first:pt-0 last:pb-0">
	<div class="relative size-10 flex-shrink-0 overflow-hidden rounded-full">
		<Image src={image ?? logo} alt="avatar" fill sizes="100%" />
	</div>
	<div class="flex flex-grow flex-col gap-1">
		<p class="text-lg font-semibold">
			{name}
			<span class="ml-2 text-sm text-muted-foreground">{now}</span>
		</p>
		<div class="flex items-center">
			{#each Array(5) as _, i (i)}
				<Star
					class={cn(
						'size-4',
						i < value
							? 'fill-yellow-400 text-yellow-400'
							: 'fill-muted text-muted'
					)} />
			{/each}
		</div>
		<p class="text-muted-foreground">{message}</p>
	</div>
</div>
