import { z } from "zod";
import { Types } from "mongoose";
import { enrolled_user_status_const } from './enrollment.constance';



export const enrollment_zod_validation_schema = z.object({
  body: z.object({
    userId: z
      .string()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid userId",
      }),
    courseId: z
      .string()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid courseId",
      }),
    offered_course: z
      .string()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid offered_course",
      })
      .optional(),
    purchaseDate: z.string().datetime().or(z.string()), // Accept ISO string or date string
    progressPercent: z.number().min(0).max(100).optional(),
    completedLessons: z
      .array(
        z.string().refine((val) => Types.ObjectId.isValid(val), {
          message: "Invalid lessonId",
        })
      )
      .optional(),
    certificateId: z
      .string()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid certificateId",
      })
      .optional(),
    status: z.enum(enrolled_user_status_const).optional().default("active"),
  }),
});
