import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { integer, text, timestamp, pgTable } from 'drizzle-orm/pg-core';
import db from './drizzle';

const userTable = pgTable('user', {
	id: integer('id').primaryKey()
});

const sessionTable = pgTable('session', {
	id: integer('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
