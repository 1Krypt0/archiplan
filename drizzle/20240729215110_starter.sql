DO $$ BEGIN
 CREATE TYPE "public"."civil_state" AS ENUM('single', 'married', 'divorced', 'widowed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."client_type" AS ENUM('customer', 'business', 'government');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."project_type" AS ENUM('new_terrain', 'terrain_change', 'single_family_housing', 'multi_family_housing', 'warehouse', 'industry', 'garage');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."project_stage" AS ENUM('contract_signature_tentative_study', 'tentative_study_presentation', 'council_delivery', 'project_approval', 'contract_signature_licensing', 'tentative_study_licensing', 'architectural_project', 'specialties_project', 'contract_signature_execution', 'project_development', 'final_works');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."worker_department" AS ENUM('architecture', 'civil_engineer', 'drawing', 'interior_design', 'technician');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "client_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"client_type" "client_type" NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"citizen_id" integer NOT NULL,
	"citizes_expiration_date" date NOT NULL,
	"tax_id" integer NOT NULL,
	"civil_state" "civil_state" NOT NULL,
	"procurer_id" integer,
	CONSTRAINT "client_id_unique" UNIQUE("id"),
	CONSTRAINT "client_email_unique" UNIQUE("email"),
	CONSTRAINT "client_citizen_id_unique" UNIQUE("citizen_id"),
	CONSTRAINT "client_tax_id_unique" UNIQUE("tax_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "procurer" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "procurer_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"address" text NOT NULL,
	"tax_id" integer NOT NULL,
	"phone_number" text,
	"email" text NOT NULL,
	"citizen_id" integer NOT NULL,
	"citizes_expiration_date" date NOT NULL,
	CONSTRAINT "procurer_id_unique" UNIQUE("id"),
	CONSTRAINT "procurer_tax_id_unique" UNIQUE("tax_id"),
	CONSTRAINT "procurer_email_unique" UNIQUE("email"),
	CONSTRAINT "procurer_citizen_id_unique" UNIQUE("citizen_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" integer NOT NULL,
	"address" text NOT NULL,
	"type" "project_type" NOT NULL,
	"expected_hours" integer NOT NULL,
	"stage" "project_stage" NOT NULL,
	"council_type" "project_type" NOT NULL,
	"council_article_number" integer,
	"council_registration_number" integer,
	"conservatory" text,
	"project_area" real NOT NULL,
	"topography_area" real NOT NULL,
	"conservatory_access_code" text,
	CONSTRAINT "project_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_user" (
	"project_id" integer NOT NULL,
	"client_id" integer NOT NULL,
	CONSTRAINT "project_user_client_id_project_id_pk" PRIMARY KEY("client_id","project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "session_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "session_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"department" "worker_department",
	"is_admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_procurer_id_procurer_id_fk" FOREIGN KEY ("procurer_id") REFERENCES "public"."procurer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_id_client_id_fk" FOREIGN KEY ("id") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_user" ADD CONSTRAINT "project_user_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_user" ADD CONSTRAINT "project_user_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
