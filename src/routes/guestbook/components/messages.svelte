<script lang="ts">
	import type { UserData } from '$lib/server/fetchUser';

	interface Props {
		messages: { user: UserData; id: number; message: string | null }[];
	}

	let { messages }: Props = $props();
</script>

{#each messages as message}
	<div class="flex items-center py-2">
		<img
			src={message.user.avatar}
			alt="{message.user.name}s Avatar"
			class="mr-2 h-8 w-8 rounded-full"
		/>
		<p>{message.user.name}: {message.message}</p>
	</div>
{/each}
