import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import {
	integer,
	text,
	timestamp,
	pgTable,
	pgEnum,
	boolean,
	date,
	real,
	primaryKey
} from 'drizzle-orm/pg-core';
import db from './drizzle';

export const workerDepartmentEnum = pgEnum('worker_department', [
	'architecture',
	'civil_engineer',
	'drawing',
	'interior_design',
	'technician'
]);

export const clientTypeEnum = pgEnum('client_type', ['customer', 'business', 'government']);

export const civilStateEnum = pgEnum('civil_state', [
	'single',
	'married',
	'divorced',
	'separated',
	'widowed'
]);

// TODO: Redefine and maybe simplify with father
export const projectStageEnum = pgEnum('project_stage', [
	'contract_signature_tentative_study',
	'tentative_study_presentation',
	'council_delivery',
	'project_approval',
	'contract_signature_licensing',
	'tentative_study_licensing',
	'architectural_project',
	'specialties_project',
	'contract_signature_execution',
	'project_development',
	'final_works'
]);

export const projectCouncilTypeEnum = pgEnum('project_council_location', ['rustic', 'urban']);

export const userTable = pgTable('user', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	department: workerDepartmentEnum('department'),
	isAdmin: boolean('is_admin').default(false).notNull()
});

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const clientTable = pgTable('client', {
	id: text('id').primaryKey().unique(),
	type: clientTypeEnum('client_type').notNull(),
	name: text('name').notNull(),
	address: text('address').notNull(),
	email: text('email').notNull().unique(),
	phoneNumber: text('phone_number'), // NOTE: Maybe make it not null, if relevant
	citizenID: integer('citizen_id').notNull().unique(),
	citizenIDExpirationDate: date('citizes_expiration_date').notNull(),
	taxID: integer('tax_id').notNull().unique(), // NOTE: Check if actually an int in every country (billing is tricky)
	civilState: civilStateEnum('civil_state').notNull(),
	procurerID: text('procurer_id').references(() => procurerTable.id)
});

export const projectTable = pgTable('project', {
	id: text('id').primaryKey().unique(),
	address: text('address').notNull(),
	typeID: text('type_id')
		.notNull()
		.references(() => projectTypeTable.id),
	expectedHours: integer('expected_hours').notNull(),
	stage: projectStageEnum('stage').notNull(),
	councilType: projectCouncilTypeEnum('council_type').notNull(),
	councilArticleNumber: integer('council_article_number'),
	councilRegistrationNumber: integer('council_registration_number'),
	conservatory: text('conservatory'),
	projectArea: real('project_area').notNull(),
	topographyArea: real('topography_area').notNull(),
	conservatoryAccessCode: text('conservatory_access_code'),
	clientID: text('client_id')
		.references(() => clientTable.id, { onDelete: 'cascade' })
		.notNull()
});

export const projectTypeTable = pgTable('project_type', {
	id: text('id').primaryKey().unique(),
	type: text('type').notNull().unique()
});

export const projectUserTable = pgTable(
	'project_user',
	{
		projectID: text('project_id')
			.notNull()
			.references(() => projectTable.id),
		clientID: text('client_id')
			.notNull()
			.references(() => clientTable.id)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.clientID, table.projectID] })
		};
	}
);

export const procurerTable = pgTable('procurer', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	address: text('address').notNull(),
	taxID: integer('tax_id').notNull().unique(),
	phoneNumber: text('phone_number'), // NOTE: Maybe make not null, if relevant
	email: text('email').notNull().unique(),
	citizenID: integer('citizen_id').notNull().unique(),
	citizenIDExpirationDate: date('citizes_expiration_date').notNull()
});

export const moneyTransaction = pgTable('money_transaction', {
	id: text('id').primaryKey().unique(),
	amount: real('amount').notNull(),
	description: text('description').notNull(),
	projectID: text('project_id')
		.notNull()
		.references(() => projectTable.id),
	userID: text('user_id')
		.notNull()
		.references(() => userTable.id)
});

export const timeTransaction = pgTable('time_transaction', {
	id: text('id').primaryKey().unique(),
	amount: real('amount').notNull(),
	description: text('description').notNull(),
	projectID: text('project_id')
		.notNull()
		.references(() => projectTable.id),
	userID: text('user_id')
		.notNull()
		.references(() => userTable.id)
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
