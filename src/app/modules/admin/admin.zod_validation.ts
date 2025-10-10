import { z } from "zod";
import { admin_roles } from "./admin.constance";

export const create_admin_zod_validation_schema = z.object({
  body: z.object({
    user_id: z.string().optional(),
    permissions: z
      .array(z.enum(admin_roles))
      .optional()
      .default([]),
  }),
});

export const updateAdminZodSchema = z.object({
  body: z.object({
    permissions: z.array(z.string()).optional(),
  }),
});
