<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
</script>

<main class="flex min-h-screen items-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="example@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="/nowhere" class="ml-auto inline-block text-sm underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" class="w-full">Login</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="/register" class="underline">Sign up</a>
			</div>
		</Card.Content>
	</Card.Root>
</main>
