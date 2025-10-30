// src/models/CourseOffer.ts
import { Schema, model } from "mongoose";
import {
  batch_enrollment_status_const,
  batch_status_const,
} from "./batch.constance";
import { TBatch } from "./batch.interface";
import { Lesson_Model } from "../lesson/lesson.model";

const batch_Schema = new Schema<TBatch>(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    title: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    enrollment_start_date: { type: String, required: true },
    enrollment_end_date: { type: String, required: true },
    max_participants: { type: Number, required: true },
    enrolled_students: { type: Number, default: 0 },
    status: {
      type: String,
      enum: batch_status_const,
      default: "upcoming",
    },
    enrollmentStatus: {
      type: String,
      enum: batch_enrollment_status_const,
      default: "not_started",
    },
    lessons: [
      {
        lesson_id: {
          type: Schema.Types.ObjectId,
          ref: "Lessons",
          required: true,
        },
        video_url: { type: String, default: "" }, // Batch-specific video
        video_id: { type: Schema.Types.ObjectId, ref: "Videos" },
      },
    ],
    // instructor_admin_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    // language: { type: String, required: true },
    // tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

batch_Schema.virtual("Lessons_status").get(function () {
  const totalLessons = this.lessons.filter((l) => l.lesson_id).length;
  const lessonsWithVideo = this.lessons.filter((l) => l.video_id).length;
  return `${lessonsWithVideo} / ${totalLessons}`;
});
batch_Schema.virtual("Lessons_progress").get(function () {
  const totalLessons = this.lessons.filter((l) => l.lesson_id).length;
  const lessonsWithVideo = this.lessons.filter((l) => l.video_id).length;
  const progress = (lessonsWithVideo / totalLessons) * 100;
  return `${progress}`;
});

// 👇 Ensure virtuals show up in JSON responses
batch_Schema.set("toJSON", { virtuals: true });
batch_Schema.set("toObject", { virtuals: true });

const Batch_Model = model<TBatch>("Batches", batch_Schema);

export default Batch_Model;
