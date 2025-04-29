<script lang="ts">
	import { projects } from '$lib/projects';
	import Icon from '@iconify/svelte';
</script>

<h1 class="text-2xl font-bold">projects</h1>
<p>a collection of my projects</p>

<div class="grid gap-4 py-4">
	{#each projects as project}
		<div class="flex flex-col border p-2">
			<img src={project.image} alt="{project.title} image" class="self-center" />
			<div class="flex h-fit w-full flex-row items-center justify-between">
				<a href={project.url} class="underlined mb-2 text-2xl font-bold {project.url ? 'link' : ''}"
					>{project.title}</a
				>
				{#if project.repo}
					<a href={project.repo} class="link flex flex-row items-center"
						><Icon icon="mdi:github" class="mr-1" />source</a
					>
				{/if}
			</div>
			<p class="text-pretty">{project.description}</p>
		</div>
	{/each}
</div>
