import { pgTable, unique, pgEnum, text, integer, date, foreignKey, real, boolean, timestamp, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const civilState = pgEnum("civil_state", ['single', 'married', 'divorced', 'separated', 'widowed'])
export const clientType = pgEnum("client_type", ['customer', 'business', 'government'])
export const projectCouncilLocation = pgEnum("project_council_location", ['rustic', 'urban'])
export const projectStage = pgEnum("project_stage", ['contract_signature_tentative_study', 'tentative_study_presentation', 'council_delivery', 'project_approval', 'contract_signature_licensing', 'tentative_study_licensing', 'architectural_project', 'specialties_project', 'contract_signature_execution', 'project_development', 'final_works'])
export const workerDepartment = pgEnum("worker_department", ['architecture', 'civil_engineer', 'drawing', 'interior_design', 'technician'])


export const procurer = pgTable("procurer", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	address: text("address").notNull(),
	taxId: integer("tax_id").notNull(),
	phoneNumber: text("phone_number"),
	email: text("email").notNull(),
	citizenId: integer("citizen_id").notNull(),
	citizesExpirationDate: date("citizes_expiration_date").notNull(),
},
(table) => {
	return {
		procurerTaxIdUnique: unique("procurer_tax_id_unique").on(table.taxId),
		procurerEmailUnique: unique("procurer_email_unique").on(table.email),
		procurerCitizenIdUnique: unique("procurer_citizen_id_unique").on(table.citizenId),
	}
});

export const client = pgTable("client", {
	id: text("id").primaryKey().notNull(),
	clientType: clientType("client_type").notNull(),
	name: text("name").notNull(),
	address: text("address").notNull(),
	email: text("email").notNull(),
	phoneNumber: text("phone_number"),
	citizenId: integer("citizen_id").notNull(),
	citizesExpirationDate: date("citizes_expiration_date").notNull(),
	taxId: integer("tax_id").notNull(),
	civilState: civilState("civil_state").notNull(),
	procurerId: text("procurer_id").references(() => procurer.id),
},
(table) => {
	return {
		clientEmailUnique: unique("client_email_unique").on(table.email),
		clientCitizenIdUnique: unique("client_citizen_id_unique").on(table.citizenId),
		clientTaxIdUnique: unique("client_tax_id_unique").on(table.taxId),
	}
});

export const project = pgTable("project", {
	id: text("id").primaryKey().notNull(),
	address: text("address").notNull(),
	typeId: text("type_id").notNull().references(() => projectType.id),
	expectedHours: integer("expected_hours").notNull(),
	stage: projectStage("stage").notNull(),
	councilType: projectCouncilLocation("council_type").notNull(),
	councilArticleNumber: integer("council_article_number"),
	councilRegistrationNumber: integer("council_registration_number"),
	conservatory: text("conservatory"),
	projectArea: real("project_area").notNull(),
	topographyArea: real("topography_area").notNull(),
	conservatoryAccessCode: text("conservatory_access_code"),
	clientId: text("client_id").notNull().references(() => client.id, { onDelete: "cascade" } ),
});

export const moneyTransaction = pgTable("money_transaction", {
	id: text("id").primaryKey().notNull(),
	amount: real("amount").notNull(),
	description: text("description").notNull(),
	projectId: text("project_id").notNull().references(() => project.id),
	userId: text("user_id").notNull().references(() => user.id),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	department: workerDepartment("department"),
	isAdmin: boolean("is_admin").default(false).notNull(),
},
(table) => {
	return {
		userEmailUnique: unique("user_email_unique").on(table.email),
	}
});

export const projectType = pgTable("project_type", {
	id: text("id").primaryKey().notNull(),
	type: text("type").notNull(),
},
(table) => {
	return {
		projectTypeTypeUnique: unique("project_type_type_unique").on(table.type),
	}
});

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const timeTransaction = pgTable("time_transaction", {
	id: text("id").primaryKey().notNull(),
	amount: real("amount").notNull(),
	description: text("description").notNull(),
	projectId: text("project_id").notNull().references(() => project.id),
	userId: text("user_id").notNull().references(() => user.id),
});

export const projectUser = pgTable("project_user", {
	projectId: text("project_id").notNull().references(() => project.id),
	clientId: text("client_id").notNull().references(() => client.id),
},
(table) => {
	return {
		projectUserClientIdProjectIdPk: primaryKey({ columns: [table.projectId, table.clientId], name: "project_user_client_id_project_id_pk"}),
	}
});