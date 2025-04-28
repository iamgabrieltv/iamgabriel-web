<script lang="ts">
	import { projects } from '$lib/projects';
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
	{#each projects.sort((a, b) => a.id - b.id).slice(0, 6) as project}
		<div class="h-full w-full border p-2">
			<a href={project.url} class="underlined {project.url ? 'link' : ''}">{project.title}</a>
			<p class="text-pretty">{project.descriptionShort ?? project.description}</p>
		</div>
	{/each}
</div>
