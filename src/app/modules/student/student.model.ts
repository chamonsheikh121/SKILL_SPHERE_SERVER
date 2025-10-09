// src/models/Student.ts
import mongoose, { Schema, model, Types, Document } from "mongoose";
import { TStudent } from "./student.interface";

const studentSchema = new Schema<TStudent>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    registration_number: {
      type: String,
    },
    enrolled_courses: [{ type: Schema.Types.ObjectId, ref: "Courses" }],

    // array of Certificate ObjectIds
    certificates: [{ type: Schema.Types.ObjectId, ref: "Certificates" }],

    // progress could reference a separate progress document (or course progress)
    progress: { type: Schema.Types.ObjectId, ref: "Progress" },
  },
  {
    timestamps: true,
  }
);

const StudentModel = model<TStudent>("Students", studentSchema);

export default StudentModel;
