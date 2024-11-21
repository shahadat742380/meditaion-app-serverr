import { relations } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";
import { badges } from "./tbl_badges";

export const achievement = pgTable("achievement", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  badge_id: text("badge_id")
    .notNull()
    .references(() => badges.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type Achievement = typeof achievement.$inferSelect;
export type NewAchievement = typeof achievement.$inferInsert;

// ** __________ Achievement RELATIONS __________ ** //

export const achievement_relations = relations(achievement, ({ one }) => ({
  user: one(users, {
    fields: [achievement.user_id],
    references: [users.id],
  }),
  badges: one(badges, {
    fields: [achievement.badge_id],
    references: [badges.id],
  }),
}));
