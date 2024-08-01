ALTER TABLE "client" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "money_transaction" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "procurer" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "time_transaction" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" DROP IDENTITY;