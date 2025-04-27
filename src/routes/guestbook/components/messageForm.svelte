<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<form method="POST" class="flex w-1/2 flex-col gap-2">
	<div class="flex flex-row">
		<input type="text" placeholder="say something" name="message" class="border-b border-dotted" />
		<button type="submit" class="link" formaction="?/post">post</button>
	</div>

	<div class="flex flex-row gap-3">
		<button class="link flex flex-row items-center gap-1 text-sm" formaction="?/signout"
			><Icon icon="prime:sign-out" />sign out</button
		>
		<button class="link flex flex-row items-center gap-1 text-sm" formaction="?/delete"
			><Icon icon="tabler:trash" />delete</button
		>
	</div>
</form>
