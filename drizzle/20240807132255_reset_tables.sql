CREATE TABLE `client` (
	`id` text PRIMARY KEY NOT NULL,
	`client_type` text NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`email` text NOT NULL,
	`phone_number` text,
	`citizen_id` integer,
	`citizen_id_expiration_date` integer,
	`tax_id` integer NOT NULL,
	`civil_state` text,
	`procurer_id` text,
	FOREIGN KEY (`procurer_id`) REFERENCES `procurer`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `money_transaction` (
	`id` text PRIMARY KEY NOT NULL,
	`amount` real NOT NULL,
	`description` text NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `procurer` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`tax_id` integer NOT NULL,
	`phone_number` text,
	`email` text NOT NULL,
	`citizen_id` integer NOT NULL,
	`citizes_expiration_date` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` text PRIMARY KEY NOT NULL,
	`address` text NOT NULL,
	`type_id` text NOT NULL,
	`expected_hours` integer NOT NULL,
	`stage` text DEFAULT 'contract_signature_tentative_study' NOT NULL,
	`council_type` text NOT NULL,
	`council_article_number` integer,
	`council_registration_number` integer,
	`conservatory` text,
	`project_area` real NOT NULL,
	`topography_area` real NOT NULL,
	`conservatory_access_code` text,
	`client_id` text NOT NULL,
	FOREIGN KEY (`type_id`) REFERENCES `project_type`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `project_type` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `project_user` (
	`project_id` text NOT NULL,
	`client_id` text NOT NULL,
	PRIMARY KEY(`client_id`, `project_id`),
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `time_transaction` (
	`id` text PRIMARY KEY NOT NULL,
	`amount` real NOT NULL,
	`description` text NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`department` text,
	`is_admin` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `client_id_unique` ON `client` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `client_email_unique` ON `client` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `client_citizen_id_unique` ON `client` (`citizen_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `client_tax_id_unique` ON `client` (`tax_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `money_transaction_id_unique` ON `money_transaction` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `procurer_id_unique` ON `procurer` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `procurer_tax_id_unique` ON `procurer` (`tax_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `procurer_email_unique` ON `procurer` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `procurer_citizen_id_unique` ON `procurer` (`citizen_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_id_unique` ON `project` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_type_id_unique` ON `project_type` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_type_type_unique` ON `project_type` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `session_id_unique` ON `session` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `time_transaction_id_unique` ON `time_transaction` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);