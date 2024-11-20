import { z } from "zod";

export const genderEnum = z.enum(["Male", "Female", "Other"]);

export const userSchema = z.object({
  full_name: z
    .string()
    .max(256, "Full name must be at most 256 characters")
    .min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile_number: z
    .string()
    .regex(/^\d+$/, "Mobile number must contain only digits")
    .optional(),
  profile_image: z.string().url("Invalid profile image URL").optional(),
  date_of_birth: z.string().datetime({ offset: true }).optional(),
  gender: genderEnum.optional(),
});
