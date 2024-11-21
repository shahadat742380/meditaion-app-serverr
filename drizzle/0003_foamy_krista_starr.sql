CREATE TABLE IF NOT EXISTS "tbl_user_preferences" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"reminder_time" timestamp,
	"meditation_reminders" boolean DEFAULT false,
	"quote_reminders" boolean DEFAULT false,
	"story_reminders" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_meditation_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"duration" integer NOT NULL,
	"date" timestamp NOT NULL,
	"feedback" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_quotes" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_favorite_quotes" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"quote_id" text NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_stories" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"content" text[],
	"sub_title" varchar(255),
	"thumbnail_image" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_favorite_stories" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"story_id" text NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_feedbacks" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"category" "tbl_category" NOT NULL,
	"content" text NOT NULL,
	"image" text,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_reminders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "tbl_reminder_type" NOT NULL,
	"time" time NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_analytics" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"streak_count" integer NOT NULL,
	"last_active_date" date NOT NULL,
	"weekly_progress" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_user_notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"meditation_reminders" "tbl_notification_type" NOT NULL,
	"time" timestamp NOT NULL,
	"is_enabled" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_user_preferences" ADD CONSTRAINT "tbl_user_preferences_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_meditation_sessions" ADD CONSTRAINT "tbl_meditation_sessions_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_favorite_quotes" ADD CONSTRAINT "tbl_favorite_quotes_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_favorite_quotes" ADD CONSTRAINT "tbl_favorite_quotes_quote_id_tbl_quotes_id_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."tbl_quotes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_favorite_stories" ADD CONSTRAINT "tbl_favorite_stories_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_favorite_stories" ADD CONSTRAINT "tbl_favorite_stories_story_id_tbl_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."tbl_stories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_feedbacks" ADD CONSTRAINT "tbl_feedbacks_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_reminders" ADD CONSTRAINT "tbl_reminders_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_analytics" ADD CONSTRAINT "tbl_analytics_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_user_notifications" ADD CONSTRAINT "tbl_user_notifications_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
