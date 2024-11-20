import { relations } from "drizzle-orm";
import { text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { favorite_quotes } from "./tbl_favorite_quotes";

export const quotes = pgTable("quotes", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  content: text("content").notNull(),
  author: varchar("author", { length: 256 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type Quote = typeof quotes.$inferSelect;
export type NewQuote = typeof quotes.$inferInsert;

// ** __________ Quotes RELATIONS __________ ** //

export const quotes_relations = relations(quotes, ({ many }) => ({
  favorite_quotes: many(favorite_quotes),
}));
