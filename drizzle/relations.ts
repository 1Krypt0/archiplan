import { relations } from "drizzle-orm/relations";
import { procurer, client, project, projectType, moneyTransaction, user, session, timeTransaction, projectUser } from "./schema";

export const clientRelations = relations(client, ({one, many}) => ({
	procurer: one(procurer, {
		fields: [client.procurerId],
		references: [procurer.id]
	}),
	projects: many(project),
	projectUsers: many(projectUser),
}));

export const procurerRelations = relations(procurer, ({many}) => ({
	clients: many(client),
}));

export const projectRelations = relations(project, ({one, many}) => ({
	client: one(client, {
		fields: [project.clientId],
		references: [client.id]
	}),
	projectType: one(projectType, {
		fields: [project.typeId],
		references: [projectType.id]
	}),
	moneyTransactions: many(moneyTransaction),
	timeTransactions: many(timeTransaction),
	projectUsers: many(projectUser),
}));

export const projectTypeRelations = relations(projectType, ({many}) => ({
	projects: many(project),
}));

export const moneyTransactionRelations = relations(moneyTransaction, ({one}) => ({
	project: one(project, {
		fields: [moneyTransaction.projectId],
		references: [project.id]
	}),
	user: one(user, {
		fields: [moneyTransaction.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	moneyTransactions: many(moneyTransaction),
	sessions: many(session),
	timeTransactions: many(timeTransaction),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const timeTransactionRelations = relations(timeTransaction, ({one}) => ({
	project: one(project, {
		fields: [timeTransaction.projectId],
		references: [project.id]
	}),
	user: one(user, {
		fields: [timeTransaction.userId],
		references: [user.id]
	}),
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