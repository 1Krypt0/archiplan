import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/database/schema.ts',
	out: './src/database/drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.NEON_DATABASE_URL!
	}
} satisfies Config;
