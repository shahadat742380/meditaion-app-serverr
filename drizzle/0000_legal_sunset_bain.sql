CREATE TABLE IF NOT EXISTS "tbl_test" (
	"id" varchar PRIMARY KEY NOT NULL,
	"test_name" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
