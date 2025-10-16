import { Schema, model } from "mongoose";
import { TVideo } from "./video.interface";

const videoSchema = new Schema<TVideo>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
     courseTitle: {
      type: String,
      required: true,
      trim: true,
    },
     lessonTitle: {
      type: String,
      required: true,
      trim: true,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    qualityOptions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Video_Model = model<TVideo>("Videos", videoSchema);
