import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { generateIdFromEntropySize } from 'lucia';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { hash } from '@node-rs/argon2';
import db from '../../database/drizzle';
import { userTable } from '../../database/schema';
import { lucia } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

const formSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string(),
	department: z.enum(['architecture', 'interior_design'])
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form, incorrect: true, message: 'Invalid registration data' });
		}

		const data = form.data;

		const email = data.email;
		// 32 character ID (128 bits)
		const emailID = generateIdFromEntropySize(20);
		const name = `${data.firstName} ${data.lastName}`;
		const department = data.department;
		const password = data.password;

		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		const alreadyExists = await db
			.select({ email: userTable.email })
			.from(userTable)
			.where(eq(userTable.email, email));

		if (alreadyExists.length !== 0) {
			return fail(400, { form, alreadyExists: true, message: 'Email already in use' });
		}

		await db.insert(userTable).values({
			id: emailID,
			name: name,
			email: email,
			password: passwordHash,
			department: department
		});

		const session = await lucia.createSession(emailID, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/clients');
	}
} satisfies Actions;
