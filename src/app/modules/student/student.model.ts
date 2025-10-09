// src/models/Student.ts
import mongoose, { Schema, model, Types, Document } from "mongoose";
import { IStudent, TStudent } from "./student.interface";

const studentSchema = new Schema<TStudent, IStudent>(
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

studentSchema.statics.is_student_exist = async function (user_id) {
  const student = await this.findOne({ user_id });
  return student;
};

const StudentModel = model<TStudent, IStudent>("Students", studentSchema);

export default StudentModel;
