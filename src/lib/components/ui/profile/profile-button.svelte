<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Image } from '@unpic/svelte';
	import logo from '$lib/images/logo.png';
	import { AdminMenulist, UserMenulist } from '$lib/constant';
	import { authClient } from '$lib/auth-client';

	interface ProfileButtonProps {
		role?: string | null;
		name: string;
		email: string;
		image?: string | null;
	}

	let { user }: { user: ProfileButtonProps } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="size-10 rounded-full">
		<Image src={user.image ?? logo} alt="avatar" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium capitalize leading-none">
					{user.name}
				</p>
				<p class="text-xs leading-none text-muted-foreground">
					{user.email}
				</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		{#if user.role === 'admin'}
			<DropdownMenu.Group>
				{#each AdminMenulist as admin}
					<DropdownMenu.Item>
						<a href={admin.path} class="flex w-full justify-between">
							{admin.title}
							<DropdownMenu.Shortcut>
								{admin.keybind}
							</DropdownMenu.Shortcut>
						</a>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
		{:else}
			<DropdownMenu.Group>
				{#each UserMenulist as user}
					<DropdownMenu.Item>
						<a href={user.path} class="flex w-full justify-between">
							{user.title}
							<DropdownMenu.Shortcut>
								{user.keybind}
							</DropdownMenu.Shortcut>
						</a>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
		{/if}
		<DropdownMenu.Group>
			<DropdownMenu.Item
				onclick={async () => {
					await authClient.signOut();
				}}>Signout</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
