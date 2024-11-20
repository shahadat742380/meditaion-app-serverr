import { pgTableCreator } from "drizzle-orm/pg-core";
import { database_prefix } from "@/lib/constants";

/**
 * This lets us use the multi-project schema feature of Drizzle ORM. So the same
 * database instance can be used for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `${database_prefix}_${name}`);

// @see https://gist.github.com/rphlmr/0d1722a794ed5a16da0fdf6652902b15




