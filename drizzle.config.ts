import { type Config } from "drizzle-kit";
import { database_prefix } from "@/lib/constants";

import { env } from "@/config/env";

// export default {
//   schema: "./src/db/schema/index.ts",
//   dialect: "postgresql",
//   out: "./drizzle",

//   dbCredentials: {
//     host: "localhost",
//     user: "postgres",
//     password: "742380",
//     database: "meditation-app",
//     ssl: false,
//   },

//   tablesFilter: [`${database_prefix}_*`],
//   verbose: true,
//   strict: true,
// } satisfies Config;


export default {
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: [`${database_prefix}_*`],
  verbose: true,
  strict: true,
} satisfies Config;
