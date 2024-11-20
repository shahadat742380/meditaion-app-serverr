import { z } from "zod";

export const quoteSchema = z.object({
  author: z.string().max(256, "Author name cannot exceed 256 characters"),
  content: z
    .string()
    .min(1, "Content cannot be empty")
    .max(10000, "Content is too long"),
});
