<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Select from '$lib/components/ui/select/index';
	import { Input } from '$lib/components/ui/input/index';

	import { superForm } from 'sveltekit-superforms';
	import type { PageServerData } from '../$types';

	export let data: PageServerData;

	const departments = [
		{
			value: 'architecture',
			label: 'Architecture'
		},
		{
			value: 'interior_design',
			label: 'Interior Designer'
		}
	];

	const form = superForm(data.form);
	const { form: formData, enhance } = form;
</script>

<main class="flex min-h-screen items-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Sign Up</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="post" use:enhance>
				<div class="mt-4 grid gap-4">
					<div class="grid grid-cols-2 gap-4">
						<Form.Field {form} name="firstName" class="grid gap-2">
							<Form.Control let:attrs>
								<Form.Label>First Name</Form.Label>
								<Input {...attrs} placeholder="John" required bind:value={$formData.firstName} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="lastName" class="grid gap-2">
							<Form.Control let:attrs>
								<Form.Label>Last Name</Form.Label>
								<Input {...attrs} placeholder="Doe" required bind:value={$formData.lastName} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<Form.Field {form} name="email" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input
								{...attrs}
								placeholder="johndoe@example.com"
								type="email"
								required
								bind:value={$formData.email}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input
								{...attrs}
								type="password"
								placeholder="Password"
								required
								bind:value={$formData.password}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="department" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>Department</Form.Label>
							<Select.Root
								onSelectedChange={(v) => {
									v && ($formData.department = { label: v.label, value: v.value });
								}}
							>
								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Choose your Department"></Select.Value>
								</Select.Trigger>
								<Select.Content>
									{#each departments as department}
										<Select.Item value={department.value} label={department.label} />
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.department.value} name={attrs.name} />
						</Form.Control>
					</Form.Field>
					<Form.Button>Create an Account</Form.Button>
				</div>
				<div class="mt-4 text-center text-sm">
					Already have an account?
					<a href="/login" class="underline"> Sign in </a>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</main>
