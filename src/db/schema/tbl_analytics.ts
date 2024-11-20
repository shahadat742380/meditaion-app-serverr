import { relations, sql } from "drizzle-orm";
import {
  integer,
  date,
  json,
  timestamp,
  text,
  varchar,
} from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";

export const analytics = pgTable("analytics", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: varchar("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  streak_count: integer("streak_count").notNull(),
  last_active_date: date("last_active_date").notNull(),
  weekly_progress: json("weekly_progress").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Analytic = typeof analytics.$inferSelect;
export type NewAnalytic = typeof analytics.$inferInsert;

// ** __________ Analytics RELATIONS __________ ** //

export const analytics_relations = relations(analytics, ({ one }) => ({
  user: one(users, {
    fields: [analytics.user_id],
    references: [users.id],
  }),
}));
