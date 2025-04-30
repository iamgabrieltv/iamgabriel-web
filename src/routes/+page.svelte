<script lang="ts">
	import ProjectsSmall from '$lib/components/projectsSmall.svelte';
	import Icon from '@iconify/svelte';
	import { typewriter } from '$lib/customTransitions';
	import { onMount, onDestroy } from 'svelte';

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	let blink = $state(false);
	let interval: NodeJS.Timeout | undefined;
	function startInterval() {
		interval = setInterval(() => {
			blink = !blink;
		}, 500);
	}

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<main>
	<h1 class="text-2xl font-bold">
		{#key mounted}
			<span in:typewriter={{ speed: 0.8 }} onintroend={startInterval}>Hi! I'm Gabriel.</span>{blink
				? '_'
				: ''}
		{/key}
	</h1>
	<p class="text-pretty">
		I'm a self-taught developer from Germany. In my free time I'm coding, playing games or watching
		shows/movies.
	</p>

	<h1 class="pt-4 text-2xl font-bold">Projects</h1>
	<ProjectsSmall />

	<a href="/projects" class="link flex w-fit flex-row items-center gap-1 border-b"
		>all projects<Icon icon="mdi:arrow-right" /></a
	>
</main>
