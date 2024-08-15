import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { generateIdFromEntropySize } from 'lucia';
import db from '../../../database/drizzle';
import { clientCivilState, clientTable, clientType, procurerTable } from '../../../database/schema';
import { createInsertSchema } from 'drizzle-zod';
import { eq } from 'drizzle-orm';

const clientSchema = createInsertSchema(clientTable, {
	email: (schema) => schema.email.email(),
	type: z.enum(clientType),
	civilState: z.enum(clientCivilState)
});

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const form = await superValidate(zod(clientSchema));

	const clients = await db
		.select()
		.from(clientTable)
		.leftJoin(procurerTable, eq(clientTable.procurerId, procurerTable.id));

	return { clients: clients.reverse(), form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(clientSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const clientData = form.data;

		const clientId = generateIdFromEntropySize(20);

		await db.insert(clientTable).values({
			...clientData,
			id: clientId
		});
	}
};
