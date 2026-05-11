<script lang="ts">
	import { projects } from '$lib/projects';
	import "iconify-icon";
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
						><iconify-icon icon="mdi:github" class="text-current mr-1 text-2xl"></iconify-icon>source</a
					>
				{/if}
			</div>

			{#if project.icons}
			<div class="flex flex-row items-center self-start gap-1 pb-2">
				{#each project.icons as icon}
					<iconify-icon icon={icon} class="text-3xl text-current" noobserver></iconify-icon>
				{/each}
			</div>
			{/if}

			<p class="text-pretty">{project.description}</p>
		</div>
	{/each}
</div>
