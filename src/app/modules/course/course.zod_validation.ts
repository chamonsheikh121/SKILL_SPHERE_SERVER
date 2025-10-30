import z from "zod";

export const course_zod_validation_schema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    Workshop_URL: z.string().min(10, "URL must be at least 5 characters long"),
    price: z.number().positive("Price must be a positive number"),
    mentor_name: z.string().min(2, "Mentor name is required"),
    mentor_rating: z
      .number()
      .min(0, "Rating cannot be less than 0")
      .max(5, "Rating cannot be more than 5")
      .optional(),

    mentor_description: z.string().min(2, "Mentor description is required"),

    // level: z.enum(["beginner", "intermediate", "advanced"], {
    //   message: "Invalid level. Choose beginner, intermediate, or advanced.",
    // }),
    // category: z
    //   .string()
    //   .min(2, "Category must be at least 2 characters long"),
    // discountPrice: z
    //   .number()
    //   .positive("Discount price must be positive")
    //   .optional(),

    // created_by: z
    //   .string()
    //   .min(1, "Instructor or Admin ID cannot be empty"),
    // tags: z.array(z.string()).optional(),
  }),
});

export const update_course_zod_validation_schema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title cannot exceed 100 characters")
      .optional(), // optional for updates

    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),

    price: z.number().positive("Price must be a positive number").optional(),
    mentor_name: z.string().min(2, "Mentor name is required").optional(),
    mentor_rating: z
      .number()
      .min(0, "Rating cannot be less than 0")
      .max(5, "Rating cannot be more than 5")
      .optional(),

    mentor_description: z
      .string()
      .min(2, "Mentor description is required")
      .optional(),

    // category: z
    //   .string()
    //   .min(2, "Category must be at least 2 characters long")
    //   .max(50, "Category cannot exceed 50 characters")
    //   .optional(),

    // level: z
    //   .enum(["beginner", "intermediate", "advanced"], {
    //     message: "Invalid level. Choose beginner, intermediate, or advanced.",
    //   })
    //   .optional(),
    // discountPrice: z
    //   .number()
    //   .positive("Discount price must be positive")
    //   .optional(),

    // created_by: z
    //   .string()
    //   .min(1, "Instructor or Admin ID cannot be empty")
    //   .optional(),

    // totalDuration: z.number().positive("Duration must be positive").optional(),

    // tags: z.array(z.string()).optional(),
  }),
});
