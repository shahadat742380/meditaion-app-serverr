import { relations, sql } from "drizzle-orm";
import { text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { users } from "./tbl_users";
import { quotes } from "./tbl_quotes";

export const favorite_quotes = pgTable("favorite_quotes", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  quote_id: text("quote_id")
    .notNull()
    .references(() => quotes.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  added_at: timestamp("added_at").defaultNow().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type FavoriteQuotes = typeof favorite_quotes.$inferSelect;
export type NewFavoriteQuotes = typeof favorite_quotes.$inferInsert;

// ** __________ Favorite Quotes RELATIONS __________ ** //

export const favorite_quotes_relations = relations(
  favorite_quotes,
  ({ one }) => ({
    user: one(users, {
      fields: [favorite_quotes.user_id],
      references: [users.id],
    }),
    quote: one(quotes, {
      fields: [favorite_quotes.quote_id],
      references: [quotes.id],
    }),
  })
);
