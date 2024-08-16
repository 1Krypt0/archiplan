<script lang="ts">
	import ProjectTableActions from './project-table-actions.svelte';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';

	import { type SelectProject } from '../../../database/schema';

	import { createRender, createTable, Subscribe, Render } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';

	export let projects: SelectProject[];

	const table = createTable(readable(projects), {
		page: addPagination({ initialPageSize: 5 })
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'address',
			header: 'Address'
		}),
		table.column({
			accessor: 'stage',
			header: 'Stage'
		}),
		table.column({
			accessor: 'expectedHours',
			header: 'Expected Hours'
		}),
		table.column({
			accessor: 'typeId',
			header: 'Project Type'
		}),
		table.column({
			accessor: 'clientID',
			header: 'Client'
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(ProjectTableActions, { id: value });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;
</script>

<div class="">
	<div class="">Create Project Button</div>

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
