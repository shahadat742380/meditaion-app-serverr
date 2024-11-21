import { z } from "zod";

export const genderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

export const userSchema = z.object({
  full_name: z
    .string()
    .max(256, "Full name must be at most 256 characters")
    .min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile_number: z
    .string()
    .regex(/^\d{10,}$/, "Mobile number must contain at least 10 digits")
    .optional(),
  profile_image: z.string().url("Invalid profile image URL").optional(),
  date_of_birth: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Invalid date format")
    .optional(),
  gender: genderEnum.optional(),
});

export const getProfileSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const updateProfileSchema = z.object({
  mobile_number: z
    .string()
    .regex(/^\d{10,}$/, "Mobile number must contain at least 10 digits"),

  profile_image: z.string().url("Invalid profile image URL"),
  date_of_birth: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Invalid date format"),
  gender: genderEnum,
});
