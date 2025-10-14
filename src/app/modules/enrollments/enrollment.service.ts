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
  const student = await StudentModel.is_student_exist(payload?.userId);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let enrollment;
    // ✅ CASE 1: User exists but Student doesn't
    if (!student) {
      const student_registration_number = await generate_student_reg_numb();

      // 1️⃣ Update user with registration number
      await UserModel.findByIdAndUpdate(
        payload?.userId,
        { registration_number: student_registration_number },
        { new: true, session }
      );

      // 2️⃣ Create enrollment
      const enrollment_result = await Enrollment_Model.create([payload], {
        session,
      });
      enrollment = enrollment_result[0];

      // 3️⃣ Create student with enrollment id
      const student_data: TStudent = {
        user_id: payload?.userId,
        registration_number: student_registration_number,
      };

      const create_student = await StudentModel.create([student_data], {
        session,
      });
    }

    // ✅ CASE 2: Both user and student exist
    else {
      // 1️⃣ Create enrollment
      console.log("student ace");
      const enrollment_result = await Enrollment_Model.create([payload], {
        session,
      });
      enrollment = enrollment_result[0];
    }

    const progress_data: Partial<TProgress> = {};

    progress_data.userId = payload?.userId;
    progress_data.courseId = enrollment?.courseId as Types.ObjectId;
    progress_data.enrollmentId = enrollment?._id as Types.ObjectId;

    await Progress_Model.create([progress_data], { session });

    // ✅ Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return enrollment;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    // throw new Error(error.message);
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
