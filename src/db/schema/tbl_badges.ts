import { relations } from "drizzle-orm";
import { integer, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { badgeTypeEnum } from "./common";
import { achievement } from "./tbl_achievement";

export const badges = pgTable("badges", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  days: integer("days").notNull(),
  type: badgeTypeEnum("type").notNull(),
  icon_url: text("icon_url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type Badge = typeof badges.$inferSelect;
export type NewBadge = typeof badges.$inferInsert;

// ** __________ Badge RELATIONS __________ ** //

export const badges_relations = relations(badges, ({ many }) => ({
  achievement: many(achievement),
}));
