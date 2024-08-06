<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let id: string;
</script>

<Button variant="default" href={`clients/${id}`}>Open</Button>
