import { createAuthClient } from 'better-auth/svelte';
import { adminClient } from 'better-auth/client/plugins';
import { magicLinkClient } from 'better-auth/client/plugins';
import { PUBLIC_BETTER_URL } from '$env/static/public';
import { anonymousClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: PUBLIC_BETTER_URL,
	plugins: [adminClient(), magicLinkClient(), anonymousClient()]
});

export const { useSession, signOut, signIn } = authClient;
