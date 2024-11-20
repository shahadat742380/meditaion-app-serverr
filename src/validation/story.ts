import { z } from "zod";


export const storySchema = z.object({
  title: z
    .string()
    .min(1, "Title must have at least 1 character")
    .max(255, "Title must be at most 255 characters"),
  content: z
    .array(z.string())
    .min(1, "Content array must have at least one item"),
  sub_title: z
    .string()
    .max(255, "Subtitle must be at most 255 characters")
    .min(1, "Subtitle must have at least 1 character"),
  thumbnail_image: z
    .string()
    .max(255, "Thumbnail image must be at most 255 characters")
    .url()
    .optional(),
});
