import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(150, "Username must be less than 150 characters")
    .regex(
      /^[\w.@+-]+$/,
      "Username can only contain letters, numbers, and @/./+/-/_ characters"
    ),
  first_name: z
    .string()
    .max(150, "First name must be less than 150 characters")
    .optional(),
  last_name: z
    .string()
    .max(150, "Last name must be less than 150 characters")
    .optional(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .optional(),
  is_active: z.boolean().optional(),
});

export const createUserSchema = userSchema.extend({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const updateUserSchema = userSchema;
