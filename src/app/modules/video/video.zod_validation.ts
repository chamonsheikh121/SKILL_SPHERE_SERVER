import {z} from 'zod'
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const video_zod_validation_schema = z.object({
  body: z.object({
    courseId: z.string(),
    courseTitle: z.string(),
    lessonId: z.string(),
    lessonTitle:  z.string(),
    title: z.string().min(1, "title cannot be empty"),
    url: z.string().url("url must be a valid URL"),
    duration: z.number().positive("duration must be positive"),
    qualityOptions: z.array(z.string()).optional().default([]),
  }),
});

export const video_update_zod_validation_schema = z.object({
  body: z.object({
    title: z.string().min(1, "title cannot be empty").optional(),
  }),
});
export const video_delete_zod_validation_schema = z.object({
  body: z.object({
    courseId:z.string().regex(objectIdRegex, "Invalid courseId")
  }),
});
