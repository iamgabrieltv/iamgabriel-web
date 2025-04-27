<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1>{page.status}</h1>
	<p>{page.error?.message}</p>
	<a href="/" class="btn">Home</a>
</div>
