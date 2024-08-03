<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import { Bell, Search } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input';
</script>

<header class="flex min-h-10 items-center justify-between border-b border-b-black px-12 py-7">
	<img src={logo} alt="Company Logo" class="h-10 object-contain" />
	<form class="w-1/3">
		<div class="relative">
			<Search class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground" />
			<Input placeholder="Search" class="border-black pl-8" />
		</div>
	</form>

	<section class="flex items-center justify-between gap-6">
		<Avatar.Root>
			<Avatar.Image
				src="https://www.tiagopbrodrigues.com/_astro/profile.61940341_1B40Po.webp"
				alt="profile image"
			/>
			<Avatar.Fallback>TR</Avatar.Fallback>
		</Avatar.Root>
		<Bell class="h-6 w-6" />
	</section>
</header>
