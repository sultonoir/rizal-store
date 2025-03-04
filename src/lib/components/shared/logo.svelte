<script>
	import { Image } from '@unpic/svelte';
	import logo from '$lib/images/logo.png?enhanced';
</script>

<a href="/" class="flex-none" aria-label="logo">
	<enhanced:img src={logo} alt="logo" sizes="40px" class="size-10"
	></enhanced:img>
</a>
