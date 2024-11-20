import { pgEnum } from "drizzle-orm/pg-core";

import { database_prefix } from "@/lib/constants";

export const genderEnum = pgEnum(`${database_prefix}_gender`, [
  "Male",
  "Female",
  "Other",
]);

export const categoryEnum = pgEnum(`${database_prefix}_category`, [
  "E.G",
  "Bug",
  "Feature",
]);

export const reminderTypeEnum = pgEnum(`${database_prefix}_reminder_type`, [
  "Meditation",
  "Quote",
  "Story",
]);

export const notificationTypeEnum = pgEnum(
  `${database_prefix}_notification_type`,
  ["Meditation", "Quote", "Story"]
);
