import { relations, sql } from "drizzle-orm";
import { varchar, text, timestamp } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import tables
import { favorite_stories } from "./tbl_favorite_stories";

export const stories = pgTable("stories", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").array().notNull(),
  sub_title: varchar("sub_title", { length: 255 }).notNull(),
  thumbnail_image: varchar("thumbnail_image", { length: 255 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type Story = typeof stories.$inferSelect;
export type NewStory = typeof stories.$inferInsert;

// ** __________ Favorite Quotes RELATIONS __________ ** //

export const stories_relations = relations(stories, ({ many }) => ({
  favorite_stories: many(favorite_stories),
}));
