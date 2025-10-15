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
    email: z.string().email("Invalid email address"),
    password:z.string().min(6, "Password must be at least 6 characters long"),
    phone_number: z.string().optional(),
  }),
});


const update_userNameSchema = z.object({
  first_name: z.string().min(1, "First name is required").optional(),
  mid_name: z.string().optional().optional(),
  last_name: z.string().min(1, "Last name is required").optional(),
});



export const update_user_zod_validation_schema = z.object({
  body: z.object({
    name: update_userNameSchema,
    phone_number: z.string().optional(),
  }),
});
