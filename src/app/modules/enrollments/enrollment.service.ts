import mongoose from "mongoose";
import UserModel from "../user/user.model";
import { TEnrollment } from "./enrollment.interface";
import Enrollment_Model from "./enrollment.model";
import StudentModel from "../student/student.model";
import { generate_student_reg_numb } from "../user/generate_registration_number";
import { TStudent } from "../student/student.interface";

const create_enrollment_into_db = async (payload: TEnrollment) => {
  const user = await UserModel.is_user_exist_by_email(payload?.userId);
  const student = await StudentModel.is_student_exist(payload?.userId);

  if (student) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
    } catch (error) {}
  }



  const session = await mongoose.startSession();
  try {
    const student_registration_number = await generate_student_reg_numb();
    // stage 1
      await UserModel.findByIdAndUpdate(
      payload?.userId,
      { registration_number: student_registration_number },
      { new: true, session }
    );

    //stage 2
  const enrollment = await Enrollment_Model.create([payload], { session });
// stage 3
    const student_data:TStudent={};
student_data.user_id= payload?.userId;
student_data.registration_number= student_registration_number;
student_data.certificates=[];
student_data.enrolled_courses=[]
student_data.enrolled_courses.push(enrollment[0]?._id);
student_data.progress=[]

 await StudentModel.create(student_data)
 return enrollment
    }

    


    await StudentModel.create()

    session.startTransaction();
  } catch (error) {}

  //   const result = await Enrollment_Model.create(payload);
  //   return result;
};

export const enrollment_services = {
  create_enrollment_into_db,
};
