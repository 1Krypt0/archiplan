import { relations } from "drizzle-orm/relations";
import { user, moneyTransaction, project, client, projectType, projectUser, session, timeTransaction } from "./schema";

export const moneyTransactionRelations = relations(moneyTransaction, ({one}) => ({
	user: one(user, {
		fields: [moneyTransaction.userId],
		references: [user.id]
	}),
	project: one(project, {
		fields: [moneyTransaction.projectId],
		references: [project.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	moneyTransactions: many(moneyTransaction),
	sessions: many(session),
	timeTransactions: many(timeTransaction),
}));

export const projectRelations = relations(project, ({one, many}) => ({
	moneyTransactions: many(moneyTransaction),
	client: one(client, {
		fields: [project.clientId],
		references: [client.id]
	}),
	projectType: one(projectType, {
		fields: [project.typeId],
		references: [projectType.id]
	}),
	projectUsers: many(projectUser),
	timeTransactions: many(timeTransaction),
}));

export const clientRelations = relations(client, ({many}) => ({
	projects: many(project),
	projectUsers: many(projectUser),
}));

export const projectTypeRelations = relations(projectType, ({many}) => ({
	projects: many(project),
}));

export const projectUserRelations = relations(projectUser, ({one}) => ({
	client: one(client, {
		fields: [projectUser.clientId],
		references: [client.id]
	}),
	project: one(project, {
		fields: [projectUser.projectId],
		references: [project.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const timeTransactionRelations = relations(timeTransaction, ({one}) => ({
	user: one(user, {
		fields: [timeTransaction.userId],
		references: [user.id]
	}),
	project: one(project, {
		fields: [timeTransaction.projectId],
		references: [project.id]
	}),
}));