// src/models/Enrollment.ts
import { Schema, model } from "mongoose";
import { TEnrollment } from "./enrollment.interface";
import { enrolled_user_status_const } from './enrollment.constance';


const enrollmentSchema = new Schema<TEnrollment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    batch_id: { type: Schema.Types.ObjectId, ref: "Batches" },
    purchaseDate: { type: Date, required: true ,default: Date.now}, 
    status: { type: String, enum: enrolled_user_status_const, default: "active" },
  },
  {
    timestamps: true,
  }
);

const Enrollment_Model = model<TEnrollment>("Enrollments", enrollmentSchema);

export default Enrollment_Model;
