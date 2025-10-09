import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";
import { course_level_const } from "./course.constance";

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: course_level_const,
      required: true,
    },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    instructor_or_admin_Id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    videos: [{ type: Schema.Types.ObjectId, ref: "Videos" }],
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lessons" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
    totalDuration: { type: Number },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const CourseModel = model<TCourse>("Courses", courseSchema);
