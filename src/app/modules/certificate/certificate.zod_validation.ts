// validation/certificate_zod_validation_schema.ts
import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const certificate_zod_validation_schema = z.object({
  body: z.object({
    userId: z.string().regex(objectIdRegex, "Invalid userId"),
    courseId: z.string().regex(objectIdRegex, "Invalid courseId"),
  }),
});
export const update_certificate_zod_validation_schema = z.object({
  body: z.object({
    userId: z.string().regex(objectIdRegex, "Invalid userId").optional(),
    courseId: z.string().regex(objectIdRegex, "Invalid courseId").optional(),
  }),
});
