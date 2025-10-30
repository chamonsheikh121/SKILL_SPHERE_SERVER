import { z } from "zod";
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const video_zod_validation_schema = z.object({
  body: z.object({
    courseId: z.string().regex(objectIdRegex),
    lessonId: z.string().regex(objectIdRegex),
    batchId: z.string().regex(objectIdRegex),
    // duration: z.number().positive("duration must be positive"),
    // qualityOptions: z.array(z.string()).optional().default([]),
  }),
});

export const video_update_zod_validation_schema = z.object({
  body: z.object({
    title: z.string().min(1, "title cannot be empty").optional(),
  }),
});
