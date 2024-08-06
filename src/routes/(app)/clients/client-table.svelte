<script lang="ts">
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ClientTableActions from './client-table-actions.svelte';

	type Client = {
		id: string;
		type: 'Customer' | 'Business' | 'Goverment';
		name: string;
		address: string;
		email: string;
		phoneNumber: string;
		// NOTE: If he has a procurer looking for him instead, it is a good idea to have him here
		procurerName?: string;
	};

	const data: Client[] = [
		{
			id: 'nthaoeu',
			type: 'Customer',
			name: 'Daniela Cruz',
			address: 'Travessa de Regadios 48',
			email: 'danielacruz2001@gmail.com',
			phoneNumber: '+351938551927'
		},
		{
			id: 'nthaaoeu',
			type: 'Business',
			name: 'ONN',
			address: 'Endereco da ONN em Barcelos Arcozelo',
			email: 'geral@onn.pt',
			phoneNumber: '+351 936 180 299',
			procurerName: 'Jorge Barreto'
		}
	];

	const table = createTable(readable(data), {
		page: addPagination()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'type',
			header: 'Client Type'
		}),
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'address',
			header: 'Address'
		}),
		table.column({
			accessor: 'phoneNumber',
			header: 'Phone Number'
		}),
		table.column({
			accessor: 'procurerName',
			header: 'Procurer',
			cell: ({ value }) => {
				return value ?? 'None';
			}
		}),
		table.column({
			accessor: ({ id }) => id,
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
		<p>Page {$pageIndex + 1} of {$pageCount}</p>
		<Button
			variant="default"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
