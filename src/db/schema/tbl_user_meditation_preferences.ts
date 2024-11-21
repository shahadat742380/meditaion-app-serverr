import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";
import { experienceTypeEnum, preferredTimeDayEnum } from "./common";

export const user_meditation_preferences = pgTable(
  "user_meditation_preferences",
  {
    id: text("id")
      .$defaultFn(() => uuidv4())
      .primaryKey(),
    user_id: varchar("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    experience_level: experienceTypeEnum("experience_level").notNull(),
    primary_goal: text("primary_goal").notNull(),
    meditation_duration: text("meditation_duration").notNull(),
    meditation_duration_mins: integer("meditation_duration_mins").notNull(),
    preferred_time_of_day: preferredTimeDayEnum("preferred_time_of_day").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at")
      .default(sql`current_timestamp`)
      .$onUpdate(() => new Date()),
  }
);

export type UserPreference = typeof user_meditation_preferences.$inferSelect;
export type NewUserPreference = typeof user_meditation_preferences.$inferInsert;

// ** __________ User Preferences RELATIONS __________ ** //

export const user_preferences_relations = relations(
  user_meditation_preferences,
  ({ one }) => ({
    user: one(users, {
      fields: [user_meditation_preferences.user_id],
      references: [users.id],
    }),
  })
);
