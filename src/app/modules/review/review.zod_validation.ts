// validation/review.ts
import { z } from "zod";

export const review_zod_validation_schema = z.object({
  body: z.object({
    courseId: z.string(),
    userId: z.string(),
    rating: z
      .number()
      .int("rating must be an integer")
      .min(1, "rating must be at least 1")
      .max(5, "rating must be at most 5"),
    comment: z.string().max(2000).optional(),
  }),
});
export const update_review_zod_validation_schema = z.object({
  body: z.object({
    rating: z
      .number()
      .int("rating must be an integer")
      .min(1, "rating must be at least 1")
      .max(5, "rating must be at most 5").optional(),
    comment: z.string().max(2000).optional().optional(),
  }),
});
