<script lang="ts">
	import type { LayoutProps } from './$types';
	import '../app.css';
	import { page } from '$app/state';
	const path = $derived(page.url.pathname);
	const title = $derived(page.data.title);
	import { blur } from 'svelte/transition';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{path === '/' ? 'IamGabriel' : `IamGabriel • ${title}`}</title>
	<meta name="description" content="Developer from Germany" />
	<meta name="author" content="IamGabriel" />
	<meta name="creator" content="IamGabriel" />
	<meta name="og:title" content="IamGabriel" />
	<meta name="og:description" content="Hi! I'm Gabriel." />
	<meta name="og:type" content="website" />
	<meta name="og:url" content="https://iamgabriel.dev" />
	<meta name="og:image" content="https://iamgabriel.dev/og.png" />
	<meta name="og:image:type" content="image/png" />
	<meta name="og:image:width" content="1200" />
	<meta name="og:image:height" content="630" />
	<meta name="og:image:alt" content="IamGabriel_" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:width" content="1200" />
	<meta name="twitter:height" content="630" />
	<meta name="twitter:image" content="https://iamgabriel.dev/og.png" />
	<meta name="twitter:image:alt" content="IamGabriel_" />
	<meta name="twitter:title" content="IamGabriel" />
	<meta name="twitter:url" content="https://iamgabriel.dev" />
	<meta name="twitter:description" content="Hi! I'm Gabriel." />
	<meta name="theme-color" content="#05b805" />
</svelte:head>

<div class="flex h-screen w-screen flex-col px-2 py-5 md:items-center lg:px-0 lg:py-10">
	<div class="h-full w-full lg:w-1/2 xl:w-1/3">
		<nav class="mb-4 flex flex-row gap-2">
			<a href="/" class="{path === '/' ? 'underlined' : ''} link">home</a>
			<a href="/guestbook" class="{path === '/guestbook' ? 'underlined' : ''} link">guestbook</a>
		</nav>
		{#key path}
			<div transition:blur class="max-h-0">
				{@render children()}
			</div>
		{/key}
	</div>
</div>
