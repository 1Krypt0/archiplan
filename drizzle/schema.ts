import { pgTable, pgEnum, integer, text, boolean, foreignKey, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const worker_department = pgEnum("worker_department", ['architecture', 'civil_engineer', 'drawing', 'interior_design', 'technician'])


export const user = pgTable("user", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	department: worker_department("department"),
	is_admin: boolean("is_admin").default(false).notNull(),
});

export const session = pgTable("session", {
	id: integer("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => user.id),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});