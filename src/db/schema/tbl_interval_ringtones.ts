import { sql } from "drizzle-orm";
import { varchar, text, timestamp, integer } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

export const interval_ringtones = pgTable("interval_ringtones", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  file_url: text("file_url").notNull(),
  ico_url: text("cover_image_url").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type IntervalRingtones = typeof interval_ringtones.$inferSelect;
export type NewIntervalRingtones = typeof interval_ringtones.$inferInsert;
