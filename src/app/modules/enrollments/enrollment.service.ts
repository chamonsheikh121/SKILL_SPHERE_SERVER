import mongoose, { Types } from "mongoose";
import { TEnrollment } from "./enrollment.interface";
import UserModel from "../user/user.model";
import StudentModel from "../student/student.model";
import { generate_student_reg_numb } from "../user/generate_registration_number";
import Enrollment_Model from "./enrollment.model";
import { TStudent } from "../student/student.interface";
import { Progress_Model } from "../progress/progress.model";
import { TProgress } from "../progress/progress.interface";

export const create_enrollment_into_db = async (payload: TEnrollment) => {
  const user = await UserModel.findById(payload?.userId)
  if(!user){
    throw new Error("No user found. Please create an account first")
  }
};

// const complete_enrollment_into_db = async(id:string,payload:Partial<TCourse>)=>{

// const course = await CourseModel.findById(id);
// if(!course){
//   throw new Error('no course found')
// }
//   const result = await CourseModel.findByIdAndUpdate(id,payload, {new:true})
//   console.log(result);
// return result;
// }

const get_single_enrollment_from_db = async (id: string) => {
  const result = await Enrollment_Model.findById(id);
  if (!result) {
    throw new Error("No enrollment found");
  }

  return result;
};
const get_all_enrollment_from_db = async () => {
  const result = await Enrollment_Model.find();
  if (!result.length) {
    throw new Error("No enrollments found");
  }

  return result;
};

export const enrollment_services = {
  create_enrollment_into_db,
  get_all_enrollment_from_db,
  get_single_enrollment_from_db,
};
//Skill_Sphere
//LrhTxHJwDZ7BzlUo
