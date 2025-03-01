import { createAuthClient } from 'better-auth/svelte';
import { adminClient } from 'better-auth/client/plugins';
import { magicLinkClient } from 'better-auth/client/plugins';
import { PUBLIC_BETTER_URL } from '$env/static/public';
export const authClient = createAuthClient({
	baseURL: PUBLIC_BETTER_URL,
	plugins: [adminClient(), magicLinkClient()]
});

export const { useSession, signOut, signIn } = authClient;
