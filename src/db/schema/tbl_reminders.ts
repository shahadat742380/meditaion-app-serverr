import { relations } from "drizzle-orm";
import { time, boolean, timestamp, text } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";
import { reminderTypeEnum } from "./common";

export const reminders = pgTable("reminders", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  type: reminderTypeEnum("type").notNull(),
  time: time("time").notNull(),
  is_active: boolean("is_active").notNull().default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type Reminder = typeof reminders.$inferSelect;
export type NewReminder = typeof reminders.$inferInsert;

// ** __________ Reminders RELATIONS __________ ** //

export const reminders_relations = relations(reminders, ({ one }) => ({
  user: one(users, {
    fields: [reminders.user_id],
    references: [users.id],
  }),
}));
