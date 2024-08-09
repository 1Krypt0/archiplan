import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { generateIdFromEntropySize } from 'lucia';
import db from '../../../database/drizzle';
import { clientTable } from '../../../database/schema';

const createClientSchema = z.object({
	type: z.enum(['Customer', 'Business', 'Government']),
	name: z.string().min(1),
	address: z.string().min(1),
	email: z.string().email(),
	phoneNumber: z.string().min(1),
	taxId: z.string().min(1),
	citizenId: z.string().min(1).optional(),
	citizenIdExpirationDate: z.date().optional(),
	civilState: z.enum(['Single', 'Married', 'Divorced', 'Separated', 'Widowed']).optional()
});

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const form = await superValidate(zod(createClientSchema));

	const clients = await db.select().from(clientTable);

	return { clients: clients.reverse(), form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(createClientSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const clientData = form.data;

		const clientId = generateIdFromEntropySize(20);

		await db.insert(clientTable).values({
			id: clientId,
			...clientData
		});
	}
};
