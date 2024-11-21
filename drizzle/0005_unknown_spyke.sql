CREATE TABLE IF NOT EXISTS "tbl_interval_ringtones" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"file_url" text NOT NULL,
	"cover_image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
ALTER TABLE "tbl_meditation_audios" DROP COLUMN IF EXISTS "sub_title";