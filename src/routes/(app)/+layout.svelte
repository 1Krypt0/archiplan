<script lang="ts">
	import Header from './header.svelte';
	import Sidebar from './sidebar.svelte';
</script>

<div class="flex min-h-screen flex-col bg-background">
	<Header />
	<main class="flex flex-1 px-12">
		<Sidebar />
		<section>
			<slot />
		</section>
	</main>
</div>
