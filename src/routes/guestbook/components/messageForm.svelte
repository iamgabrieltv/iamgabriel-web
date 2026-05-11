<script lang="ts">
	import "iconify-icon";

	interface Props {
		existingMessage: Promise<string | null> | undefined;
	}

	let { existingMessage }: Props = $props();
</script>

{#await existingMessage}
	<p>Loading...</p>
{:then existingMessage}
	<form method="POST" class="flex w-1/2 flex-col gap-2">
		<div class="flex flex-row">
			<input
				type="text"
				placeholder="say something"
				name="message"
				class="border-b border-dotted"
				value={existingMessage}
			/>
			<button type="submit" class="link" formaction="?/post"
				>{existingMessage ? 'edit' : 'post'}</button
			>
		</div>

		<div class="flex flex-row gap-3">
			<button class="link flex flex-row items-center gap-1 text-sm" formaction="?/signout"
				><iconify-icon icon="prime:sign-out"></iconify-icon> out</button
			>
			<button aria-label="Delete data" class="link flex flex-row items-center gap-1 text-sm" formaction="?/delete"
				><iconify-icon icon="tabler:trash"></iconify-icon></button
			>
		</div>
	</form>
{/await}
