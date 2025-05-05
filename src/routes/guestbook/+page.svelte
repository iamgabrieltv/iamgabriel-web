<script lang="ts">
	import type { PageProps } from './$types';
	import Messages from './components/messages.svelte';
	import SignInGitHub from './components/signInGitHub.svelte';
	import SignInDiscord from './components/signInDiscord.svelte';
	import MessageForm from './components/messageForm.svelte';

	let { data }: PageProps = $props();
</script>

<h1 class="text-2xl font-bold">guestbook</h1>
<p>leave a message</p>

{#if data.user}
	<p class="mt-2 mb-1 text-sm">signed in as <span class="font-bold">{data.user!.name}</span></p>
	<MessageForm existingMessage={data.user.existingMessage} />
{:else}
	<div class="flex flex-row">
		<SignInGitHub />
		<SignInDiscord />
	</div>
{/if}

<Messages messages={data.messages} />
