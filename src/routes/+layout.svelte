<script lang="ts">
	import type { LayoutProps } from './$types';
	import '../app.css';
	import { page } from '$app/state';
	const path = $derived(page.url.pathname);
	const title = $derived(page.data.title);
	import { blur } from 'svelte/transition';
	import Head from '$lib/components/head.svelte';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{path === '/' ? 'IamGabriel' : `IamGabriel • ${title}`}</title>
	<Head />
</svelte:head>

<div class="flex h-screen w-screen flex-col px-2 py-5 md:items-center lg:px-0 lg:py-10">
	<div class="h-full w-full lg:w-1/2 xl:w-1/3">
		<nav class="mb-4 flex flex-row gap-2">
			<a href="/" class="{path === '/' ? 'underlined' : ''} link">home</a>
			<a href="/projects" class="{path === '/projects' ? 'underlined' : ''} link">projects</a>
			<a href="/guestbook" class="{path === '/guestbook' ? 'underlined' : ''} link">guestbook</a>
		</nav>
		{#key path}
			<div transition:blur class="max-h-0">
				{@render children()}
			</div>
		{/key}
	</div>
</div>
