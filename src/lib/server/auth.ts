import { Lucia } from 'lucia';
import { adapter } from '../../database/schema';
import { dev } from '$app/environment';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
