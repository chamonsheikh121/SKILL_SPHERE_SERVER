// validation/blog_zod_validation_schema.ts
import { z } from "zod";

export const blog_zod_validation_schema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    userId: z.string(),
    tags: z.array(z.string()).optional(),
    views: z.number().optional(),
    is_published: z.boolean().default(false),
    is_deleted: z.boolean().default(false),
  })
});


