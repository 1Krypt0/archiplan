<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const userId = data.userId;
</script>

<main>Hello, user with ID {userId}</main>

<form action="/logout" method="post">
	<button type="submit">Logout</button>
</form>
