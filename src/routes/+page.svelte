<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full flex flex-col justify-center items-center h-screen gap-2">
	<h1 class="text-xl">Skirt!</h1>

	{#if data.authenticated}
		<p>
			You are logged in as <span class="font-bold">{data.user?.email}</span>
		</p>
		<button class="rounded-md border-gray-300 hover:bg-gray-300 border-2 px-4 py-2">
			<a href="/auth/logout">Logout</a>
		</button>
	{:else}
		<button class="rounded-md border-gray-300 hover:bg-gray-300 border-2 px-4 py-2">
			<a href="/auth/google">Login with Google</a>
		</button>
	{/if}
</div>
