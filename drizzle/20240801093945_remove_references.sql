ALTER TABLE "client" DROP CONSTRAINT "client_procurer_id_procurer_id_fk";
--> statement-breakpoint
ALTER TABLE "money_transaction" DROP CONSTRAINT "money_transaction_project_id_project_id_fk";
--> statement-breakpoint
ALTER TABLE "money_transaction" DROP CONSTRAINT "money_transaction_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_id_client_id_fk";
--> statement-breakpoint
ALTER TABLE "project_user" DROP CONSTRAINT "project_user_project_id_project_id_fk";
--> statement-breakpoint
ALTER TABLE "project_user" DROP CONSTRAINT "project_user_client_id_client_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "time_transaction" DROP CONSTRAINT "time_transaction_project_id_project_id_fk";
--> statement-breakpoint
ALTER TABLE "time_transaction" DROP CONSTRAINT "time_transaction_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "client" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "client" ALTER COLUMN "procurer_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "money_transaction" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "money_transaction" ALTER COLUMN "project_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "money_transaction" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "procurer" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "project_user" ALTER COLUMN "project_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "project_user" ALTER COLUMN "client_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "time_transaction" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "time_transaction" ALTER COLUMN "project_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "time_transaction" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;