<script lang="ts">
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ClientTableActions from './client-table-actions.svelte';
	import CreateClient from './create-client.svelte';
	import { type SelectClient, type SelectProcurer } from '../../../database/schema';

	export let clients: { client: SelectClient; procurer: SelectProcurer | null }[];
	export let form;

	const table = createTable(readable(clients), {
		page: addPagination({ initialPageSize: 5 })
	});

	const columns = table.createColumns([
		table.column({
			accessor: ({ client }) => client.type,
			header: 'Client Type'
		}),
		table.column({
			accessor: ({ client }) => client.name,
			header: 'Name'
		}),
		table.column({
			accessor: ({ client }) => client.email,
			header: 'Email'
		}),
		table.column({
			accessor: ({ client }) => client.address,
			header: 'Address'
		}),
		table.column({
			accessor: ({ client }) => client.phoneNumber,
			header: 'Phone Number'
		}),
		table.column({
			accessor: ({ procurer }) => procurer?.name,
			header: 'Procurer',
			cell: ({ value }) => {
				return value ?? 'None';
			}
		}),
		table.column({
			accessor: ({ client }) => client.id,
			header: '',
			cell: ({ value }) => {
				return createRender(ClientTableActions, { id: value });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;
</script>

<div class="">
	<CreateClient formSchema={form} />
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs}>
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-center space-x-4 py-4">
		<Button
			variant="default"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<p>Page {$pageIndex + 1} of {$pageCount == 0 ? 1 : $pageCount}</p>
		<Button
			variant="default"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
