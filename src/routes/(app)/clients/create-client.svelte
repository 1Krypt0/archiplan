<script lang="ts">
	import { CalendarIcon } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { superForm } from 'sveltekit-superforms';
	import MonthYearCalendar from './month-year-calendar.svelte';

	import {
		DateFormatter,
		today,
		getLocalTimeZone,
		type DateValue,
		CalendarDate,
		parseDate
	} from '@internationalized/date';

	export let formSchema;

	const customerTypes = ['Customer', 'Business', 'Government'];
	const civilStates = ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'];

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined;

	$: value = $formData.citizenIdExpirationDate
		? parseDate($formData.citizenIdExpirationDate)
		: undefined;

	let placeholder: DateValue = today(getLocalTimeZone());

	const form = superForm(formSchema);
	const { form: formData } = form;
</script>

<div class="flex pb-4">
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create New Client</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<form method="post">
				<Dialog.Header>
					<Dialog.Title>Create New Client</Dialog.Title>
					<Dialog.Description
						>Add a new client here. Click Save Changes when you are done.</Dialog.Description
					>
				</Dialog.Header>
				<Form.Field {form} name="name" class="grid gap-2 pt-4">
					<Form.Control let:attrs>
						<Form.Label>Name</Form.Label>
						<Input {...attrs} placeholder="John Doe" required bind:value={$formData.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="type" class="grid gap-2">
					<Form.Control let:attrs>
						<Form.Label>Type</Form.Label>
						<Select.Root
							onSelectedChange={(v) => {
								v && ($formData.type = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Choose a Client Type"></Select.Value>
							</Select.Trigger>
							<Select.Content>
								{#each customerTypes as type}
									<Select.Item value={type} label={type} />
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.type} name={attrs.name} />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="address" class="grid gap-2 pt-4">
					<Form.Control let:attrs>
						<Form.Label>Address</Form.Label>
						<Input
							{...attrs}
							placeholder="10 Downing Street"
							required
							bind:value={$formData.address}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<div class="grid grid-cols-2 gap-4">
					<Form.Field {form} name="email" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input
								{...attrs}
								type="email"
								placeholder="johndoe@example.com"
								required
								bind:value={$formData.email}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="phoneNumber" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>Phone Number</Form.Label>
							<Input {...attrs} required bind:value={$formData.phoneNumber} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>

				{#if $formData.type === 'Customer'}
					<div class="grid grid-cols-2 gap-4">
						<Form.Field {form} name="citizenId" class="grid gap-2">
							<Form.Control let:attrs>
								<Form.Label>Citized ID</Form.Label>
								<Input {...attrs} required bind:value={$formData.citizenId} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="citizenIdExpirationDate" class="grid gap-2">
							<Form.Control let:attrs>
								<Form.Label>Expiration Date</Form.Label>
								<Popover.Root>
									<Popover.Trigger
										{...attrs}
										class={cn(
											buttonVariants({ variant: 'outline' }),
											' justify-start pl-4 text-left font-normal',
											!value && 'text-muted-foreground'
										)}
									>
										{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
										<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
									</Popover.Trigger>
									<Popover.Content class="w-auto p-0" side="top">
										<MonthYearCalendar
											{value}
											bind:placeholder
											minValue={today(getLocalTimeZone())}
											maxValue={new CalendarDate(2100, 1, 1)}
											calendarLabel="Expiration Date"
											onValueChange={(v) => {
												if (v) {
													$formData.citizenIdExpirationDate = v.toString();
												} else {
													$formData.citizenIdExpirationDate = '';
												}
											}}
										/>
									</Popover.Content>
								</Popover.Root>
								<Form.FieldErrors />
								<input hidden value={$formData.citizenIdExpirationDate} name={attrs.name} />
							</Form.Control>
						</Form.Field>
					</div>
				{/if}
				<Form.Field {form} name="taxId" class="grid gap-2">
					<Form.Control let:attrs>
						<Form.Label>Tax ID</Form.Label>
						<Input {...attrs} required bind:value={$formData.taxId} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				{#if $formData.type === 'Customer'}
					<Form.Field {form} name="civilState" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>Civil State</Form.Label>
							<Select.Root
								onSelectedChange={(v) => {
									v && ($formData.civilState = v.value);
								}}
							>
								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Choose a Civil State"></Select.Value>
								</Select.Trigger>
								<Select.Content>
									{#each civilStates as civilState}
										<Select.Item value={civilState} label={civilState} />
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.civilState} name={attrs.name} />
						</Form.Control>
					</Form.Field>
				{/if}
				<Dialog.Footer class="pt-4">
					<Button type="submit">Save changes</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</div>
