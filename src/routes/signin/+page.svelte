<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import { writable } from 'svelte/store';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';

	let email = $state('');
	let isPending = $state(false);
	const handleSignIn = async () => {
		await signIn.magicLink(
			{
				email,
				callbackURL: '/'
			},
			{
				onRequest() {
					isPending = true;
				},
				onError(context) {
					toast.error(context.error.message);
				},
				onSuccess() {
					toast.success('Send magic link success');
					isPending = false;
					email = '';
				}
			}
		);
	};
</script>

<svelte:head>
	<title>Signin</title>
	<meta name="description" content="Signin to rizal" />
</svelte:head>

<div class="grid size-full min-h-screen place-items-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Wellcome back</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required bind:value={email} />
				</div>
				<Button type="button" disabled={isPending} class="w-full" onclick={handleSignIn}
					>Login</Button
				>
				<Button
					variant="outline"
					class="w-full"
					onclick={async () => {
						await signIn.social({
							provider: 'google',
							callbackURL: '/'
						});
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
							fill="currentColor"
						/>
					</svg>
					Continue with Google
				</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/sign-up" class="underline">Sign up</a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
