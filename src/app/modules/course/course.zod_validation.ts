import z from "zod";

export const course_zod_validation_schema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),

    thumbnail: z
      .string().optional(),

    category: z
      .string()
      .min(2, "Category must be at least 2 characters long"),

    level: z.enum(["beginner", "intermediate", "advanced"], {
      message: "Invalid level. Choose beginner, intermediate, or advanced.",
    }),

    price: z
      .number()
      .positive("Price must be a positive number"),

    discountPrice: z
      .number()
      .positive("Discount price must be positive")
      .optional(),

    instructor_or_admin_Id: z
      .string()
      .min(1, "Instructor or Admin ID cannot be empty"),

    videos: z.array(z.string()).optional(),
    lessons: z.array(z.string()).optional(),
    reviews: z.array(z.string()).optional(),

    totalDuration: z
      .number()
      .positive("Duration must be positive")
      .optional(),

    tags: z.array(z.string()).optional(),
  }),
});



