<script lang="ts">
	import type { PageServerData } from './$types';
	import ProjectTable from './project-table.svelte';

	export let data: PageServerData;
	const projects = data.projects;
</script>

<main class="px-20 py-14">
	<h1 class="text-5xl font-extrabold">Project Management</h1>

	<section class="flex justify-center pt-14">
		<ProjectTable {projects} />
	</section>
</main>
