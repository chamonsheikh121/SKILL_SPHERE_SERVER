// src/models/CourseOffer.ts
import { Schema, model} from "mongoose";
import { TOffered_Course } from "./offered_course.interface";
import { offered_course_enrollment_status_const, offered_course_status_const } from './offered_course.constance';



const courseOfferSchema = new Schema<TOffered_Course>(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    instructor_admin_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    title: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    enrollment_start_date: { type: String, required: true },
    enrollment_end_date: { type: String, required: true },
    max_participants: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum:offered_course_status_const, 
      default: "upcoming" 
    },
    enrollmentStatus: {
      type: String,
      enum: offered_course_enrollment_status_const,
      default: "not_started"
    },
    enrolled_students: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    language: { type: String, required: true },
    tags: [{ type: String }],
    created_by: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  {
    timestamps: true,
  }
);

const Offered_Course_Model = model<TOffered_Course>("Offered_Courses", courseOfferSchema);

export default Offered_Course_Model;
