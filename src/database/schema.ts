import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core';

export const userDepartment: [string, ...string[]] = [
	'Architecture',
	'Civil Engineering',
	'Drawing',
	'Interior Design',
	'Technician'
];

export const clientType: [string, ...string[]] = ['Customer', 'Business', 'Government'];

export const clientCivilState: [string, ...string[]] = [
	'Single',
	'Married',
	'Divorced',
	'Separated',
	'Widowed'
];

export const projectStage: [string, ...string[]] = [
	'Contract Signature - Tentative Study',
	'Tentative Study Presentation',
	'Council Delivery',
	'Project Approval',
	'Contract Signature - Licensing',
	'Tentative Study - Licensing',
	'Architectural Project',
	'Specialties Project',
	'Contract Signature - Execution',
	'Project Development',
	'Final Works'
];

export const projectCouncilType: [string, ...string[]] = ['Rustic', 'Urban'];

export const userTable = sqliteTable('user', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	department: text('department', {
		enum: userDepartment
	}),
	isAdmin: integer('is_admin', { mode: 'boolean' }).default(false).notNull()
});

export const sessionTable = sqliteTable('session', {
	id: text('id').primaryKey().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const clientTable = sqliteTable('client', {
	id: text('id').primaryKey().unique(),
	type: text('client_type', { enum: clientType }).notNull(),
	name: text('name').notNull(),
	address: text('address').notNull(),
	email: text('email').notNull().unique(),
	phoneNumber: text('phone_number'), // NOTE: Maybe make it not null, if relevant
	citizenId: integer('citizen_id').unique(),
	citizenIdExpirationDate: integer('citizen_id_expiration_date', { mode: 'timestamp' }),
	taxId: integer('tax_id').notNull().unique(), // NOTE: Check if actually an int in every country (billing is tricky)
	civilState: text('civil_state', {
		enum: clientCivilState
	}),
	procurerId: text('procurer_id').references(() => procurerTable.id)
});

export const projectTable = sqliteTable('project', {
	id: text('id').primaryKey().unique(),
	address: text('address').notNull(),
	typeId: text('type_id')
		.notNull()
		.references(() => projectTypeTable.id),
	expectedHours: integer('expected_hours').notNull(),
	stage: text('stage', {
		enum: projectStage
	})
		.notNull()
		.default('contract_signature_tentative_study'),
	councilType: text('council_type', { enum: projectCouncilType }).notNull(),
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

export const projectTypeTable = sqliteTable('project_type', {
	id: text('id').primaryKey().unique(),
	type: text('type').notNull().unique()
});

export const projectUserTable = sqliteTable(
	'project_user',
	{
		projectId: text('project_id')
			.notNull()
			.references(() => projectTable.id),
		clientId: text('client_id')
			.notNull()
			.references(() => clientTable.id)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.clientId, table.projectId] })
		};
	}
);

export const procurerTable = sqliteTable('procurer', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	address: text('address').notNull(),
	taxID: integer('tax_id').notNull().unique(),
	phoneNumber: text('phone_number'), // NOTE: Maybe make not null, if relevant
	email: text('email').notNull().unique(),
	citizenID: integer('citizen_id').notNull().unique(),
	citizenIDExpirationDate: integer('citizes_expiration_date', { mode: 'timestamp' }).notNull()
});

export const moneyTransaction = sqliteTable('money_transaction', {
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

export const timeTransaction = sqliteTable('time_transaction', {
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
