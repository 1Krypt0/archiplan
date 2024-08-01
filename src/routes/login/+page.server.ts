import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { lucia } from '$lib/server/auth';
import { verify } from '@node-rs/argon2';

import db from '../../database/drizzle';
import { userTable } from '../../database/schema';
import { eq } from 'drizzle-orm';

import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form, invalid: true, message: 'Invalid Login data' });
		}

		const email = form.data.email;
		const password = form.data.password;

		const user = await db.select().from(userTable).where(eq(userTable.email, email));

		// No user exists
		if (user.length === 0) {
			// Compare against dummy password to protect against side-channels
			await verify('ashdfnth', password);

			return fail(400, { form, incorrect: true, message: 'Incorrect email or password' });
		}

		const validPassword = await verify(user[0].password, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return fail(400, { form, incorrect: true, message: 'Incorrect email or password' });
		}

		const session = await lucia.createSession(user[0].id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		// TODO: Maybe change the redirection
		return redirect(302, '/clients');
	}
};
