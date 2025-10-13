// src/validations/courseOffer.validation.ts
import { z } from "zod";
import { batch_enrollment_status_const, batch_status_const } from "./batch.constance";



export const batch_zod_validation_schema = z.object({
  body: z.object({
    instructor_admin_id: z.string().min(1, "Instructor/Admin ID is required"),
    title: z.string().min(1, "Title is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    enrollment_start_date: z.string().min(1, "Enrollment start date is required"),
    enrollment_end_date: z.string().min(1, "Enrollment end date is required"),
    max_participants: z.number().int().positive("Max participants must be positive"),
    status: z.enum(batch_status_const),
    enrollmentStatus: z.enum(batch_enrollment_status_const),
    language: z.string().min(1, "Language is required"),
    tags: z.array(z.string()).optional(),
  }),
});





export const update_batch_zod_validation_schema = z.object({
  body: z.object({
    instructor_admin_id: z
      .string()
      .min(1, "Instructor/Admin ID is required")
      .optional(),

    title: z
      .string()
      .min(1, "Title is required")
      .optional(),

    start_date: z
      .string()
      .min(1, "Start date is required")
      .optional(),

    end_date: z
      .string()
      .min(1, "End date is required")
      .optional(),

    enrollment_start_date: z
      .string()
      .min(1, "Enrollment start date is required")
      .optional(),

    enrollment_end_date: z
      .string()
      .min(1, "Enrollment end date is required")
      .optional(),

    max_participants: z
      .number()
      .int()
      .positive("Max participants must be positive")
      .optional(),

    status: z
      .enum(batch_status_const)
      .optional(),

    enrollmentStatus: z
      .enum(batch_enrollment_status_const)
      .optional(),

    language: z
      .string()
      .min(1, "Language is required")
      .optional(),

    tags: z
      .array(z.string())
      .optional(),
  }),
});

