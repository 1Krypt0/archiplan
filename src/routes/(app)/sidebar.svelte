<script lang="ts">
	import { ChartLine, ClipboardList, Folders, Icon, User } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import type { ComponentType } from 'svelte';
	import { page } from '$app/stores';

	type Route = {
		title: string;
		icon: ComponentType<Icon>;
		href: string;
	};

	$: currentURL = $page.url.pathname;

	const routes: Route[] = [
		{
			title: 'Clients',
			icon: User,
			href: '/clients'
		},
		{
			title: 'Projects',
			icon: Folders,
			href: '/projects'
		},
		{
			title: 'Transactions',
			icon: ClipboardList,
			href: '/transactions'
		},
		{
			title: 'Reports',
			icon: ChartLine,
			href: '/reports'
		}
	];
</script>

<aside class="flex flex-col gap-8 border-r border-r-black pr-12 pt-14">
	{#each routes as route}
		<Button
			href={route.href}
			variant={currentURL === route.href ? 'default' : 'ghost'}
			class="flex items-center justify-start gap-3"
		>
			<svelte:component this={route.icon} class="size-6" aria-hidden="true" />
			<span>{route.title}</span>
		</Button>
	{/each}
</aside>
