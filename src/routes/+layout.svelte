<script lang="ts">
	import type { LayoutProps } from './$types';
	import '../app.css';
	import { page } from '$app/state';
	const path = $derived(page.url.pathname);
	const title = $derived(page.data.title);

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{path === '/' ? 'IamGabriel' : `IamGabriel • ${title}`}</title>
</svelte:head>

<div class="flex h-screen w-screen flex-col px-2 py-5 md:items-center md:px-0 md:py-10">
	<div class="h-full w-full md:w-1/3">
		<nav class="mb-4 flex flex-row gap-2">
			<a href="/" class="{path === '/' ? 'underlined' : ''} link">home</a>
			<a href="/guestbook" class="{path === '/guestbook' ? 'underlined' : ''} link">guestbook</a>
		</nav>
		{@render children()}
	</div>
</div>
