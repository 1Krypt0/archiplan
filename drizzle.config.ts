import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/database/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	driver: 'turso',
	migrations: {
		prefix: 'timestamp'
	},
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_ACCESS_TOKEN!
	},
	verbose: true,
	strict: true
});
