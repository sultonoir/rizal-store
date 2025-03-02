<script>
	import { Image } from '@unpic/svelte';
	import logo from '$lib/images/logo.png';
</script>

<a href="/" class="flex-none">
	<Image src={logo} alt="logo" width={40} height={40} priority={true} />
</a>
