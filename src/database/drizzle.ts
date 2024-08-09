import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { TURSO_ACCESS_TOKEN, TURSO_DATABASE_URL } from '$env/static/private';

const client = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_ACCESS_TOKEN
});

const db = drizzle(client);

export default db;
