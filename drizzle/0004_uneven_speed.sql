DO $$ BEGIN
 CREATE TYPE "public"."tbl_badge_type" AS ENUM('DAYS', 'MONTHS', 'YEARS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."tbl_experience_type" AS ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PRO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."tbl_preferred_day_type" AS ENUM('MORNING', 'AFTERNOON', 'EVENING', 'NO', 'PREFERENCE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "tbl_category" ADD VALUE 'BUG REPORT';--> statement-breakpoint
ALTER TYPE "tbl_category" ADD VALUE 'CHANGE REQUEST';--> statement-breakpoint
ALTER TYPE "tbl_category" ADD VALUE 'FEATURE REQUEST';--> statement-breakpoint
ALTER TYPE "tbl_gender" ADD VALUE 'MALE';--> statement-breakpoint
ALTER TYPE "tbl_gender" ADD VALUE 'FEMALE';--> statement-breakpoint
ALTER TYPE "tbl_gender" ADD VALUE 'OTHER';--> statement-breakpoint
ALTER TYPE "tbl_notification_type" ADD VALUE 'MEDITATION';--> statement-breakpoint
ALTER TYPE "tbl_notification_type" ADD VALUE 'QUOTE';--> statement-breakpoint
ALTER TYPE "tbl_notification_type" ADD VALUE 'STORY';--> statement-breakpoint
ALTER TYPE "tbl_reminder_type" ADD VALUE 'MEDITATION';--> statement-breakpoint
ALTER TYPE "tbl_reminder_type" ADD VALUE 'QUOTE';--> statement-breakpoint
ALTER TYPE "tbl_reminder_type" ADD VALUE 'STORY';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_user_meditation_preferences" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"experience_level" "tbl_experience_type" NOT NULL,
	"primary_goal" text NOT NULL,
	"meditation_duration" text NOT NULL,
	"meditation_duration_mins" integer NOT NULL,
	"preferred_time_of_day" "tbl_preferred_day_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_badges" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"days" integer NOT NULL,
	"type" "tbl_badge_type" NOT NULL,
	"icon_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_achievement" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"badge_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_meditation_audios" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"file_url" text NOT NULL,
	"sub_title" varchar(255),
	"cover_image_url" text NOT NULL,
	"duration" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
DROP TABLE "tbl_user_preferences";--> statement-breakpoint
DROP TABLE "tbl_reminders";--> statement-breakpoint
DROP TABLE "tbl_analytics";--> statement-breakpoint
ALTER TABLE "tbl_stories" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tbl_stories" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tbl_stories" ALTER COLUMN "thumbnail_image" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_user_meditation_preferences" ADD CONSTRAINT "tbl_user_meditation_preferences_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_achievement" ADD CONSTRAINT "tbl_achievement_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_achievement" ADD CONSTRAINT "tbl_achievement_badge_id_tbl_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."tbl_badges"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tbl_favorite_quotes" DROP COLUMN IF EXISTS "added_at";--> statement-breakpoint
ALTER TABLE "tbl_favorite_stories" DROP COLUMN IF EXISTS "added_at";