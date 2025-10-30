import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";
import { course_level_const } from "./course.constance";

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    Workshop_URL: { type: String, required: true },
    thumbnail: { type: String },
    price: { type: Number, required: true },
    mentor_name: {
      type: String,
      required: true,
      trim: true,
    },
    mentor_photo: {
      type: String,
      default: "",
    },
    mentor_rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    mentor_description: {
      type: String,
      required: true,
    },
    // category: { type: String, required: true },
    // level: {
    //   type: String,
    //   enum: course_level_const,
    //   required: true,
    // },
    // discountPrice: { type: Number },
    // created_by: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Users",
    //   required: true,
    // },
    // tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const CourseModel = model<TCourse>("Courses", courseSchema);
