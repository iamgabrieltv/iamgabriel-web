<script lang="ts">
	import type { UserData } from '$lib/server/fetchUser';

	interface Props {
		messages: Promise<{ user: UserData; id: number; message: string | null }[]>;
	}

	let { messages }: Props = $props();
</script>

{#await messages}
	<p>Loading...</p>
{:then messages}
	{#each messages as message}
		<div class="flex items-center py-2">
			<img
				src={message.user.avatar}
				alt="{message.user.name}s Avatar"
				class="mr-2 h-8 w-8 rounded-full"
			/>
			<p><a href={message.user.url} class="link">{message.user.name}</a>: {message.message}</p>
		</div>
	{/each}
{/await}
