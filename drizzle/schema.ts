import { sqliteTable, AnySQLiteColumn, uniqueIndex, foreignKey, text, real, integer, primaryKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const moneyTransaction = sqliteTable("money_transaction", {
	id: text("id").primaryKey().notNull(),
	amount: real("amount").notNull(),
	description: text("description").notNull(),
	projectId: text("project_id").notNull().references(() => project.id),
	userId: text("user_id").notNull().references(() => user.id),
},
(table) => {
	return {
		idUnique: uniqueIndex("money_transaction_id_unique").on(table.id),
	}
});

export const procurer = sqliteTable("procurer", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	address: text("address").notNull(),
	taxId: integer("tax_id").notNull(),
	phoneNumber: text("phone_number"),
	email: text("email").notNull(),
	citizenId: integer("citizen_id").notNull(),
	citizesExpirationDate: integer("citizes_expiration_date").notNull(),
},
(table) => {
	return {
		citizenIdUnique: uniqueIndex("procurer_citizen_id_unique").on(table.citizenId),
		emailUnique: uniqueIndex("procurer_email_unique").on(table.email),
		taxIdUnique: uniqueIndex("procurer_tax_id_unique").on(table.taxId),
		idUnique: uniqueIndex("procurer_id_unique").on(table.id),
	}
});

export const project = sqliteTable("project", {
	id: text("id").primaryKey().notNull(),
	address: text("address").notNull(),
	typeId: text("type_id").notNull().references(() => projectType.id),
	expectedHours: integer("expected_hours").notNull(),
	stage: text("stage").default("contract_signature_tentative_study").notNull(),
	councilType: text("council_type").notNull(),
	councilArticleNumber: integer("council_article_number"),
	councilRegistrationNumber: integer("council_registration_number"),
	conservatory: text("conservatory"),
	projectArea: real("project_area").notNull(),
	topographyArea: real("topography_area").notNull(),
	conservatoryAccessCode: text("conservatory_access_code"),
	clientId: text("client_id").notNull().references(() => client.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		idUnique: uniqueIndex("project_id_unique").on(table.id),
	}
});

export const projectType = sqliteTable("project_type", {
	id: text("id").primaryKey().notNull(),
	type: text("type").notNull(),
},
(table) => {
	return {
		typeUnique: uniqueIndex("project_type_type_unique").on(table.type),
		idUnique: uniqueIndex("project_type_id_unique").on(table.id),
	}
});

export const projectUser = sqliteTable("project_user", {
	projectId: text("project_id").notNull().references(() => project.id),
	clientId: text("client_id").notNull().references(() => client.id),
},
(table) => {
	return {
		pk0: primaryKey({ columns: [table.clientId, table.projectId], name: "project_user_client_id_project_id_pk"})
	}
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	expiresAt: integer("expires_at").notNull(),
},
(table) => {
	return {
		idUnique: uniqueIndex("session_id_unique").on(table.id),
	}
});

export const timeTransaction = sqliteTable("time_transaction", {
	id: text("id").primaryKey().notNull(),
	amount: real("amount").notNull(),
	description: text("description").notNull(),
	projectId: text("project_id").notNull().references(() => project.id),
	userId: text("user_id").notNull().references(() => user.id),
},
(table) => {
	return {
		idUnique: uniqueIndex("time_transaction_id_unique").on(table.id),
	}
});

export const user = sqliteTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	department: text("department"),
	isAdmin: integer("is_admin").default(false).notNull(),
},
(table) => {
	return {
		idUnique: uniqueIndex("user_id_unique").on(table.id),
	}
});