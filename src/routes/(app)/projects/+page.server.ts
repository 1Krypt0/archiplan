import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import db from '../../../database/drizzle';
import { projectTable } from '../../../database/schema';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const projects = await db.select().from(projectTable);

	return { projects: projects.reverse() };
};
