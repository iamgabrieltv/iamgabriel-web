<script lang="ts">
	import ProjectsSmall from '$lib/components/projectsSmall.svelte';
	import Icon from '@iconify/svelte';
</script>

<main>
	<h1 class="text-2xl font-bold">Hi! I'm Gabriel.</h1>
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
