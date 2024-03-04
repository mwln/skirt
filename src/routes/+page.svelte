<script lang="ts">
	import type { PageData } from './$types';
	import Google from '$lib/components/icons/Google.svelte';

	export let data: PageData;
</script>

<div class="w-full flex flex-col justify-center items-center h-screen gap-2">
	<h1 class="text-xl">Skirt!</h1>

	{#if data.authenticated}
		<p>
			You are logged in as <span class="font-bold">{data.user?.email}</span>
		</p>
		<a
			class="rounded-md border-gray-300 hover:bg-gray-300 border-2 px-4 py-2"
			href="/auth/logout">Logout</a
		>
	{:else}
		<a
			class="rounded-md grayscale-[30%] hover:grayscale-0 border-gray-300 hover:bg-gray-100 text-gray-600 hover:text-black border-2 flex items-center gap-2 px-4 py-2"
			href="/auth/google"><Google class="" /> Login</a
		>
	{/if}
</div>
