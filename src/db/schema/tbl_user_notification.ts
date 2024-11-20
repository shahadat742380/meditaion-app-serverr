import { relations, sql } from "drizzle-orm";
import { boolean, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";
import { notificationTypeEnum } from "./common";

export const user_notifications = pgTable("user_notifications", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  notification_type: notificationTypeEnum("meditation_reminders").notNull(),
  time: timestamp("time").notNull(),
  is_enabled: boolean("is_enabled").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type UserNotification = typeof user_notifications.$inferSelect;
export type NewUserNotification = typeof user_notifications.$inferInsert;

// ** __________ User Notification RELATIONS __________ ** //

export const user_notifications_relations = relations(
  user_notifications,
  ({ one }) => ({
    user: one(users, {
      fields: [user_notifications.user_id],
      references: [users.id],
    }),
  })
);
