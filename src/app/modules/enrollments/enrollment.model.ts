// src/models/Enrollment.ts
import { Schema, model } from "mongoose";
import { TEnrollment } from "./enrollment.interface";
import { enrolled_user_status_const } from './enrollment.constance';


const enrollmentSchema = new Schema<TEnrollment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    offered_course: { type: Schema.Types.ObjectId, ref: "Offered_Courses" },
    purchaseDate: { type: String, required: true }, 
    progressPercent: { type: Number, default: 0 },
    completedLessons: [{ type: Schema.Types.ObjectId, ref: "Lessons" }],
    certificateId: { type: Schema.Types.ObjectId, ref: "Certificates" },
    status: { type: String, enum: enrolled_user_status_const, default: "active" },
  },
  {
    timestamps: true,
  }
);

const Enrollment_Model = model<TEnrollment>("Enrollments", enrollmentSchema);

export default Enrollment_Model;
