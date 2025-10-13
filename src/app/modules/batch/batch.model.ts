// src/models/CourseOffer.ts
import { Schema, model} from "mongoose";
import { batch_enrollment_status_const, batch_status_const } from "./batch.constance";
import { TBatch } from "./batch.interface";


const batch_Schema = new Schema<TBatch>(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    instructor_admin_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    title: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    enrollment_start_date: { type: String, required: true },
    enrollment_end_date: { type: String, required: true },
    max_participants: { type: Number, required: true },
    status: { 
      type: String, 
      enum:batch_status_const, 
      default: "upcoming" 
    },
    enrollmentStatus: {
      type: String,
      enum: batch_enrollment_status_const,
      default: "not_started"
    },
    language: { type: String, required: true },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Batch_Model = model<TBatch>("Batches", batch_Schema);

export default Batch_Model;
