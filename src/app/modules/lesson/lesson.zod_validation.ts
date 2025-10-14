import z from "zod";

export const lesson_zod_validation_schema = z.object({
  body: z.object({
    courseId: z.string().min(1, "courseId is required"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
  }),
});
export const update_lesson_zod_validation_schema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .optional(),
  }),
});
