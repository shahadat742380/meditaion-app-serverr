import { relations, sql } from "drizzle-orm";
import { boolean, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";

export const user_preferences = pgTable("user_preferences", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: varchar("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  reminder_time: timestamp("reminder_time"),
  meditation_reminders: boolean("meditation_reminders").default(false),
  quote_reminders: boolean("quote_reminders").default(false),
  story_reminders: boolean("story_reminders").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type UserPreference = typeof user_preferences.$inferSelect;
export type NewUserPreference = typeof user_preferences.$inferInsert;

// ** __________ User Preferences RELATIONS __________ ** //

export const user_preferences_relations = relations(
  user_preferences,
  ({ one }) => ({
    user: one(users, {
      fields: [user_preferences.user_id],
      references: [users.id],
    }),
  })
);
