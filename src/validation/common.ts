import { z } from "zod";

export const routerParamSchema = (title?: string) => {
  return z.object({
    id: z.string({
      required_error: `${title ?? 'Unique'} ID is missing!`,
      invalid_type_error: `${title ?? 'Unique'} ID must be a string`,
    }).min(20, `${title ?? "Unique "} ID must be 20 characters minimum`).
      max(100, `${title ?? "Unique "} ID must be 100 characters minimum`),
  });
} 
