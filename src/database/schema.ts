import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import db from './drizzle';
import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core';

// export const workerDepartmentEnum = pgEnum('worker_department', [
// 	'architecture',
// 	'civil_engineer',
// 	'drawing',
// 	'interior_design',
// 	'technician'
// ]);
//
// export const clientTypeEnum = pgEnum('client_type', ['customer', 'business', 'government']);
//
// export const civilStateEnum = pgEnum('civil_state', [
// 	'single',
// 	'married',
// 	'divorced',
// 	'separated',
// 	'widowed'
// ]);
//
// // TODO: Redefine and maybe simplify with father
// export const projectStageEnum = pgEnum('project_stage', [
// 	'contract_signature_tentative_study',
// 	'tentative_study_presentation',
// 	'council_delivery',
// 	'project_approval',
// 	'contract_signature_licensing',
// 	'tentative_study_licensing',
// 	'architectural_project',
// 	'specialties_project',
// 	'contract_signature_execution',
// 	'project_development',
// 	'final_works'
// ]);
//
// export const projectCouncilTypeEnum = pgEnum('project_council_location', ['rustic', 'urban']);
//
// export const userTable = pgTable('user', {
// 	id: text('id').primaryKey().unique(),
// 	name: text('name').notNull(),
// 	email: text('email').notNull().unique(),
// 	password: text('password').notNull(),
// 	department: workerDepartmentEnum('department'),
// 	isAdmin: boolean('is_admin').default(false).notNull()
// });

export const userTable = sqliteTable('user', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	department: text('department', {
		enum: ['architecture', 'civil_engineer', 'drawing', 'interior_design', 'technician']
	}),
	isAdmin: integer('is_admin', { mode: 'boolean' }).default(false).notNull()
});

export type SelectUser = typeof userTable.$inferSelect;
export type InsertUser = typeof userTable.$inferInsert;

// export const sessionTable = pgTable('session', {
// 	id: text('id').primaryKey().unique(),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => userTable.id),
// 	expiresAt: timestamp('expires_at', {
// 		withTimezone: true,
// 		mode: 'date'
// 	}).notNull()
// });

export const sessionTable = sqliteTable('session', {
	id: text('id').primaryKey().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

// export const clientTable = pgTable('client', {
// 	id: text('id').primaryKey().unique(),
// 	type: clientTypeEnum('client_type').notNull(),
// 	name: text('name').notNull(),
// 	address: text('address').notNull(),
// 	email: text('email').notNull().unique(),
// 	phoneNumber: text('phone_number'), // NOTE: Maybe make it not null, if relevant
// 	citizenID: integer('citizen_id').notNull().unique(),
// 	citizenIDExpirationDate: date('citizes_expiration_date').notNull(),
// 	taxID: integer('tax_id').notNull().unique(), // NOTE: Check if actually an int in every country (billing is tricky)
// 	civilState: civilStateEnum('civil_state').notNull(),
// 	procurerID: text('procurer_id').references(() => procurerTable.id)
// });

export const clientTable = sqliteTable('client', {
	id: text('id').primaryKey().unique(),
	type: text('client_type', { enum: ['Customer', 'Business', 'Government'] }).notNull(),
	name: text('name').notNull(),
	address: text('address').notNull(),
	email: text('email').notNull().unique(),
	phoneNumber: text('phone_number'), // NOTE: Maybe make it not null, if relevant
	citizenId: integer('citizen_id').unique(),
	citizenIdExpirationDate: integer('citizen_id_expiration_date', { mode: 'timestamp' }),
	taxId: integer('tax_id').notNull().unique(), // NOTE: Check if actually an int in every country (billing is tricky)
	civilState: text('civil_state', {
		enum: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed']
	}),
	procurerId: text('procurer_id').references(() => procurerTable.id)
});


// export const projectTable = pgTable('project', {
// 	id: text('id').primaryKey().unique(),
// 	address: text('address').notNull(),
// 	typeID: text('type_id')
// 		.notNull()
// 		.references(() => projectTypeTable.id),
// 	expectedHours: integer('expected_hours').notNull(),
// 	stage: projectStageEnum('stage').notNull(),
// 	councilType: projectCouncilTypeEnum('council_type').notNull(),
// 	councilArticleNumber: integer('council_article_number'),
// 	councilRegistrationNumber: integer('council_registration_number'),
// 	conservatory: text('conservatory'),
// 	projectArea: real('project_area').notNull(),
// 	topographyArea: real('topography_area').notNull(),
// 	conservatoryAccessCode: text('conservatory_access_code'),
// 	clientID: text('client_id')
// 		.references(() => clientTable.id, { onDelete: 'cascade' })
// 		.notNull()
// });

export const projectTable = sqliteTable('project', {
	id: text('id').primaryKey().unique(),
	address: text('address').notNull(),
	typeId: text('type_id')
		.notNull()
		.references(() => projectTypeTable.id),
	expectedHours: integer('expected_hours').notNull(),
	stage: text('stage', {
		enum: [
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
		]
	})
		.notNull()
		.default('contract_signature_tentative_study'),
	councilType: text('council_type', { enum: ['rustic', 'urban'] }).notNull(),
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

export type projectSelect = typeof projectTable.$inferSelect;
export type projectInsert = typeof projectTable.$inferInsert;

// export const projectTypeTable = pgTable('project_type', {
// 	id: text('id').primaryKey().unique(),
// 	type: text('type').notNull().unique()
// });

export const projectTypeTable = sqliteTable('project_type', {
	id: text('id').primaryKey().unique(),
	type: text('type').notNull().unique()
});

// export const projectUserTable = pgTable(
// 	'project_user',
// 	{
// 		projectID: text('project_id')
// 			.notNull()
// 			.references(() => projectTable.id),
// 		clientID: text('client_id')
// 			.notNull()
// 			.references(() => clientTable.id)
// 	},
// 	(table) => {
// 		return {
// 			pk: primaryKey({ columns: [table.clientID, table.projectID] })
// 		};
// 	}
// );

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

// export const procurerTable = pgTable('procurer', {
// 	id: text('id').primaryKey().unique(),
// 	name: text('name').notNull(),
// 	address: text('address').notNull(),
// 	taxID: integer('tax_id').notNull().unique(),
// 	phoneNumber: text('phone_number'), // NOTE: Maybe make not null, if relevant
// 	email: text('email').notNull().unique(),
// 	citizenID: integer('citizen_id').notNull().unique(),
// 	citizenIDExpirationDate: date('citizes_expiration_date').notNull()
// });

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

// export const moneyTransaction = pgTable('money_transaction', {
// 	id: text('id').primaryKey().unique(),
// 	amount: real('amount').notNull(),
// 	description: text('description').notNull(),
// 	projectID: text('project_id')
// 		.notNull()
// 		.references(() => projectTable.id),
// 	userID: text('user_id')
// 		.notNull()
// 		.references(() => userTable.id)
// });

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

// export const timeTransaction = pgTable('time_transaction', {
// 	id: text('id').primaryKey().unique(),
// 	amount: real('amount').notNull(),
// 	description: text('description').notNull(),
// 	projectID: text('project_id')
// 		.notNull()
// 		.references(() => projectTable.id),
// 	userID: text('user_id')
// 		.notNull()
// 		.references(() => userTable.id)
// });

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

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
