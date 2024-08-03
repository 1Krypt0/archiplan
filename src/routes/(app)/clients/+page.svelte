<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const user = data.user;
</script>

<main>Hello, user with ID {user?.id} and name {user?.name} and email {user?.email}</main>

<form action="/logout" method="post">
	<button type="submit">Logout</button>
</form>
