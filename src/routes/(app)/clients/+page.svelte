<script lang="ts">
	import type { PageServerData } from './$types';
	import ClientTable from './client-table.svelte';

	export let data: PageServerData;
	const clients = data.clients;
	const form = data.form;
</script>

<main class="px-20 py-14">
	<h1 class="text-5xl font-extrabold">Client Management</h1>

	<section class="flex justify-center pt-14">
		<ClientTable {clients} {form} />
	</section>
</main>
