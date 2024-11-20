import { sql } from "drizzle-orm";
import { timestamp, varchar } from "drizzle-orm/pg-core";

// ** import db utils
import { pgTable } from "@/db/utils";
import { uuid as uuidv4 } from "uuidv4";

export const test = pgTable("test", {
  id: varchar("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  test_name: varchar("test_name", { length: 256 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Test = typeof test.$inferSelect;
export type NewTest = typeof test.$inferInsert;
