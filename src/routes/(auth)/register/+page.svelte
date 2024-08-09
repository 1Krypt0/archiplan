<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Select from '$lib/components/ui/select/index';
	import { Input } from '$lib/components/ui/input/index';

	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const form = superForm(data.form, {
		taintedMessage:
			'Are you sure you want to leave? You have not completed the registration process. All information will be lost.'
	});
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
					<Form.Field {form} name="name" class="grid gap-2">
						<Form.Control let:attrs>
							<Form.Label>First Name</Form.Label>
							<Input {...attrs} placeholder="John" required bind:value={$formData.name} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
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
									v && ($formData.department = v.value);
								}}
							>
								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Choose your Department"></Select.Value>
								</Select.Trigger>
								<Select.Content>
									{#each data.departments as department}
										<Select.Item value={department} label={department} />
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.department} name={attrs.name} />
						</Form.Control>
					</Form.Field>
					<Form.Button>Create an Account</Form.Button>
				</div>
				<div class="mt-4 text-center text-sm">
					Already have an account?
					<a href="/login" class="underline"> Sign in </a>
				</div>
				<SuperDebug data={$formData} />
			</form>
		</Card.Content>
	</Card.Root>
</main>
