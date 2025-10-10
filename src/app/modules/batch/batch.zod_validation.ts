// src/validations/courseOffer.validation.ts
import { z } from "zod";
import { batch_enrollment_status_const, batch_status_const } from "./batch.constance";



export const batch_zod_validation_schema = z.object({
  body: z.object({
    course_id: z.string().min(1, "Course ID is required"),
    instructor_admin_id: z.string().min(1, "Instructor/Admin ID is required"),
    title: z.string().min(1, "Title is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    enrollment_start_date: z.string().min(1, "Enrollment start date is required"),
    enrollment_end_date: z.string().min(1, "Enrollment end date is required"),
    max_participants: z.number().int().positive("Max participants must be positive"),
    price: z.number().positive("Price must be positive"),
    discount: z.number().optional(),
    status: z.enum(batch_status_const),
    enrollmentStatus: z.enum(batch_enrollment_status_const),
    enrolled_students: z.array(z.string()).optional(),
    language: z.string().min(1, "Language is required"),
    tags: z.array(z.string()).optional(),
    created_by: z.string().min(1, "Creator ID is required"),
  }),
});
