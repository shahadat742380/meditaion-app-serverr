DO $$ BEGIN
 CREATE TYPE "public"."tbl_category" AS ENUM('Bug report', 'Change request', 'Feature request');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."tbl_gender" AS ENUM('Male', 'Female', 'Other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."tbl_notification_type" AS ENUM('Meditation', 'Quote', 'Story');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."tbl_reminder_type" AS ENUM('Meditation', 'Quote', 'Story');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_users" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"email" text NOT NULL,
	"mobile_number" text,
	"profile_image" text,
	"date_of_birth" timestamp,
	"gender" "tbl_gender",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp,
	CONSTRAINT "tbl_users_email_unique" UNIQUE("email")
);
