// src/models/Student.ts
import mongoose, { Schema, model, Types, Document } from "mongoose";
import { IStudent, TStudent } from "./student.interface";

const studentSchema = new Schema<TStudent, IStudent>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    registration_number: {
      type: String,
    },
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
