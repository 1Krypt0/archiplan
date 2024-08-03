import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import db from '../../../database/drizzle';
import { userTable } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(302, '/login');
	}

	const userId = event.locals.user.id;
	const users = await db.select().from(userTable).where(eq(userTable.id, userId));

	// sanity check
	if (users.length !== 1) {
		return fail(500, { message: 'More than one user with the same ID' });
	}

	const user = users[0];

	if (!user) {
		return fail(500, { message: 'User appears to be null' });
	}

	return { user };
};
