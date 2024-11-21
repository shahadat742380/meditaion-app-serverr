import { pgEnum } from "drizzle-orm/pg-core";

import { database_prefix } from "@/lib/constants";

export const genderEnum = pgEnum(`${database_prefix}_gender`, [
  "MALE",
  "FEMALE",
  "OTHER",
]);

export const categoryEnum = pgEnum(`${database_prefix}_category`, [
  "BUG REPORT",
  "CHANGE REQUEST",
  "FEATURE REQUEST",
]);

export const reminderTypeEnum = pgEnum(`${database_prefix}_reminder_type`, [
  "MEDITATION",
  "QUOTE",
  "STORY",
]);

export const notificationTypeEnum = pgEnum(
  `${database_prefix}_notification_type`,
  ["MEDITATION", "QUOTE", "STORY"]
);

export const experienceTypeEnum = pgEnum(
  `${database_prefix}_experience_type`,
  ["BEGINNER", "INTERMEDIATE", "ADVANCED", "PRO"]
);

export const preferredTimeDayEnum = pgEnum(
  `${database_prefix}_preferred_day_type`,
  ["MORNING", "AFTERNOON", "EVENING", "NO", "PREFERENCE"]
);

export const badgeTypeEnum = pgEnum(
  `${database_prefix}_badge_type`,
  ["DAYS", "MONTHS", "YEARS"]
);
