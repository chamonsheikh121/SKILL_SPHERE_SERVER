import z from "zod";

export const course_zod_validation_schema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
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
    tags: z.array(z.string()).optional(),
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

    category: z
      .string()
      .min(2, "Category must be at least 2 characters long")
      .max(50, "Category cannot exceed 50 characters")
      .optional(),

    level: z.enum(["beginner", "intermediate", "advanced"], {
      message: "Invalid level. Choose beginner, intermediate, or advanced.",
    }).optional(),

    price: z
      .number()
      .positive("Price must be a positive number")
      .optional(),

    discountPrice: z
      .number()
      .positive("Discount price must be positive")
      .optional(),

    instructor_or_admin_Id: z
      .string()
      .min(1, "Instructor or Admin ID cannot be empty")
      .optional(),

    totalDuration: z
      .number()
      .positive("Duration must be positive")
      .optional(),

    tags: z.array(z.string()).optional(),
  }),
});




