import { text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import third party
import { v4 as uuidv4 } from "uuid";

// ** import db utils
import { pgTable } from "@/db/utils";

// ** import table
import { categoryEnum } from "./common";
import { users } from "./tbl_users";
import { relations } from "drizzle-orm";

export const feedbacks = pgTable("feedbacks", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  category: categoryEnum("category").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  submitted_at: timestamp("submitted_at").defaultNow().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type Feedback = typeof feedbacks.$inferSelect;
export type NewFeedback = typeof feedbacks.$inferInsert;

// ** __________ Feedback RELATIONS __________ ** //

export const feedbacks_relations = relations(feedbacks, ({ one }) => ({
  user: one(users, {
    fields: [feedbacks.user_id],
    references: [users.id],
  }),
}));
