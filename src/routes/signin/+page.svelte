<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';
	import { Image } from '@unpic/svelte';
	import logo from '$lib/images/logo.png';
	import { ArrowLeft, User } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	let email = $state('');
	let isPending = $state(false);
	let socialPending = $state(false);
	let guetPending = $state(false);

	let { data }: PageProps = $props();

	const handleSignIn = async () => {
		await signIn.magicLink(
			{
				email,
				callbackURL: data.callbackUrl ?? '/'
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

	const handleSoccial = async () => {
		await signIn.magicLink(
			{
				email,
				callbackURL: data.callbackUrl ?? '/'
			},
			{
				onRequest() {
					socialPending = true;
				},
				onError(context) {
					toast.error(context.error.message);
				},
				onSuccess() {
					toast.success('Send magic link success');
					socialPending = false;
					email = '';
				}
			}
		);
	};

	const handleGuest = async () => {
		guetPending = true;
		const { error } = await signIn.anonymous();
		if (error?.message) {
			return toast.error(error.message);
		}
		goto('/');
	};
</script>

<svelte:head>
	<title>Signin • Rizal Store</title>
	<meta name="description" content="Signin to rizal" />
</svelte:head>

<div
	id="signin"
	class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
	<div class="w-full max-w-sm">
		<div class="flex flex-col gap-6">
			<Button
				variant="outline"
				size="icon"
				class="rounded-full"
				onclick={() => history.back()}>
				<ArrowLeft />
			</Button>
			<div class="flex flex-col gap-6">
				<div class="flex flex-col items-center gap-2">
					<a
						href="#signin"
						class="flex flex-col items-center gap-2 font-medium">
						<div class="flex items-center justify-center rounded-md">
							<Image src={logo} alt="logo" width={50} height={50} priority />
						</div>
						<span class="sr-only">Rizal Store.</span>
					</a>
					<h1 class="text-xl font-bold">Welcome to Rizal Store.</h1>
				</div>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="rizal-store@example.com"
							bind:value={email}
							required />
					</div>
					<Button
						type="button"
						disabled={isPending}
						class="w-full"
						onclick={handleSignIn}>
						Login
					</Button>
				</div>
				<div
					class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span class="relative z-10 bg-background px-2 text-muted-foreground">
						Or
					</span>
				</div>
				<div class="grid gap-4 sm:grid-cols-1">
					<Button
						class="w-full"
						variant="outline"
						onclick={handleGuest}
						disabled={guetPending}>
						<User size="24" />
						Continue with Guest
					</Button>
					<Button
						variant="outline"
						type="button"
						onclick={handleSoccial}
						disabled={socialPending}
						class="w-full">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								fill="currentColor" />
						</svg>
						Continue with Google
					</Button>
				</div>
			</div>
			<div
				class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our
				<a href="#signin">Terms of Service</a>
				{' '} and
				<a href="#singin">Privacy Policy</a>.
			</div>
		</div>
	</div>
</div>
