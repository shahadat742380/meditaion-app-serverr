import { text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";
import { stories } from "./tbl_stories";
import { relations } from "drizzle-orm";

export const favorite_stories = pgTable("favorite_stories", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  story_id: text("story_id")
    .notNull()
    .references(() => stories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  added_at: timestamp("added_at").defaultNow().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type FavoriteStory = typeof favorite_stories.$inferSelect;
export type NewFavoriteStory = typeof favorite_stories.$inferInsert;

// ** __________ Favorite Quotes RELATIONS __________ ** //

export const favorite_stories_relations = relations(
  favorite_stories,
  ({ one }) => ({
    user: one(users, {
      fields: [favorite_stories.user_id],
      references: [users.id],
    }),
    quote: one(stories, {
      fields: [favorite_stories.story_id],
      references: [stories.id],
    }),
  })
);
