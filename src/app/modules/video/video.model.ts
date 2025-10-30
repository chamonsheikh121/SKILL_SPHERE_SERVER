import { Schema, model } from "mongoose";
import { TVideo } from "./video.interface";

const videoSchema = new Schema<TVideo>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },

    lessonId: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "Batches",
      required: true,
    },
    url: {
      type: String,
    },
    // duration: {
    //   type: Number,
    //   required: true,
    // },
    // qualityOptions: {
    //   type: [String],
    //   default: [],
    // },
  },
  { timestamps: true }
);

export const Video_Model = model<TVideo>("Videos", videoSchema);
