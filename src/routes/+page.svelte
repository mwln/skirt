<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Skirt!</h1>

{#if data.authenticated}
	<p>
		You are logged in as {data.user?.email}
	</p>
	<p>
		<a href="/auth/logout">Logout</a>
	</p>
{:else}
	<p>
		<a href="/auth/google">Login with Google</a>
	</p>
{/if}
