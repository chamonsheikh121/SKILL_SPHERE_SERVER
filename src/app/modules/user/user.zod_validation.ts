import z from "zod";
import { userRoleConstance, userStatusConstance } from "./user.constance";
// Nested name schema
const userNameSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  mid_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
});
export const user_zod_validation_schema = z.object({
  body: z.object({
    name: userNameSchema,
    registration_number: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password_hash: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(userRoleConstance).default("student"),
    profile_image: z.string().url().optional(),
    phone_number: z.string().optional(),
    is_email_verified: z.boolean().optional().default(false),
    status: z.enum(userStatusConstance).default("in_progress"),
    isDeleted: z.boolean().optional().default(false),
    wishlist: z.array(z.string()).optional(),
    last_login: z.string().optional(),
  }),
});
