import { relations, sql } from "drizzle-orm";
import { text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { genderEnum } from "./common";
import { user_meditation_preferences } from "./tbl_user_meditation_preferences";
import { user_notifications } from "./tbl_user_notification";
import { favorite_quotes } from "./tbl_favorite_quotes";
import { favorite_stories } from "./tbl_favorite_stories";
import { feedbacks } from "./tbl_feedbacks";
import { meditation_sessions } from "./tbl_meditation_sessions";

export const users = pgTable("users", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  full_name: varchar("full_name", { length: 256 }).notNull(),
  email: text("email").unique().notNull(),
  mobile_number: text("mobile_number"),
  profile_image: text("profile_image"),
  date_of_birth: timestamp("date_of_birth"),
  gender: genderEnum("gender"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// ** __________ User Preferences RELATIONS __________ ** //

export const users_relations = relations(users, ({ many }) => ({
  user_preferences: many(user_meditation_preferences),
  user_notifications: many(user_notifications),
  favorite_quotes: many(favorite_quotes),
  favorite_stories: many(favorite_stories),
  feedback: many(feedbacks),
  meditation_sessions: many(meditation_sessions),
}));
