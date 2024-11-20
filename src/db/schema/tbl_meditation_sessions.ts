import { relations, sql } from "drizzle-orm";
import { integer, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";

export const meditation_sessions = pgTable("meditation_sessions", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  duration: integer("duration").notNull(),
  date: timestamp("date").notNull(),
  feedback: varchar("feedback").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type MeditationSessions = typeof meditation_sessions.$inferSelect;
export type NewMeditationSessions = typeof meditation_sessions.$inferInsert;

// ** __________ Meditation Sessions RELATIONS __________ ** //

export const meditation_sessions_relations = relations(
  meditation_sessions,
  ({ one }) => ({
    user: one(users, {
      fields: [meditation_sessions.user_id],
      references: [users.id],
    }),
  })
);
