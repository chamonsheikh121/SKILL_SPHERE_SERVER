import { model, Schema, Types } from "mongoose";
import { TLesson } from "./lesson.interface";

const lessonSchema = new Schema<TLesson>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Lesson_Model = model<TLesson>("Lessons", lessonSchema);
