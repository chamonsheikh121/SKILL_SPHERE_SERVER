import config from "../../config";
import { CourseModel } from "../course/course.model";
import UserModel from "../user/user.model";
import { TPayment } from "./payment.interface";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";
import Payment_model from "./payment.model";
import { generate_student_reg_numb } from "../user/generate_registration_number";
import StudentModel from "../student/student.model";
import mongoose, { Types } from "mongoose";
import { TEnrollment } from "../enrollments/enrollment.interface";
import { TStudent } from "../student/student.interface";
import { TProgress } from "../progress/progress.interface";
import { Progress_Model } from "../progress/progress.model";
import Enrollment_Model from "../enrollments/enrollment.model";
import Batch_Model from "../batch/batch.model";
import { send_payment_confirmation_email } from "../../utils/send_payment_confirmation_email";
import { Lesson_Model } from "../lesson/lesson.model";

const initialize_sslcommerz_into_db = async (payload: TPayment) => {
  const is_live = false; //true for live, false for sandbox
  const transactionId = uuidv4();

  const course = await CourseModel.findById(payload?.courseId);
  const user = await UserModel.findById(payload?.userId);
  const batch = await Batch_Model.findById(payload?.batch_Id);




  if (!(course && batch && user)) {
    throw new Error(`course and batch and user are not matched`);
  }

  payload.transactionId = transactionId;
  await Payment_model.create(payload);

  const customer_name = `${user?.name?.first_name} ${user?.name?.mid_name} ${user?.name?.last_name}`;

  const data = {
    total_amount: course?.price,
    currency: "BDT",
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/v1/payments/ssl_payment/success/${transactionId}`,
    fail_url: `http://localhost:5000/api/v1/payments/ssl_payment/fail/${transactionId}`,
    cancel_url: `http://localhost:5000/api/v1/payments/ssl_payment/cancel/${transactionId}`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: course?.title,
    product_category: course?.title,
    product_profile: course?.thumbnail,
    cus_name: customer_name,
    cus_email: user?.email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(
    config.SSLCOMMERZ_STORE_ID,
    config.SSLCOMMERZ_PASSWORD,
    is_live
  );
  const api_response = await sslcz.init(data);
console.log(api_response);
  return {
    gatewway_page_url: api_response.GatewayPageURL,
  };
};
const success_sslcommerz_into_db = async (tran_id: string | undefined) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const payment_details = await Payment_model.findOneAndUpdate(
      { transactionId: tran_id },
      {
        paymentStatus: "success",
      },
      {
        new: true,
        session,
      }
    );

    if (!payment_details) {
      throw new Error("Failed to update payment status");
    }

    const student = await StudentModel.is_student_exist(
      payment_details?.userId
    );

    let enrollment;
    const enrollment_data: Partial<TEnrollment> = {};
    enrollment_data.userId = payment_details.userId;
    enrollment_data.courseId = payment_details.courseId;
    enrollment_data.batch_id = payment_details.batch_Id;

    if (!student) {
      const student_registration_number = await generate_student_reg_numb();

      const enrollment_result = await Enrollment_Model.create(
        [enrollment_data],
        {
          session,
        }
      );
      enrollment = enrollment_result[0];

      const student_data: TStudent = {
        user_id: payment_details.userId,
        registration_number: student_registration_number,
      };

      const create_student = await StudentModel.create([student_data], {
        session,
      });

      if (create_student) {
        await UserModel.findByIdAndUpdate(
          payment_details?.userId,
          { registration_number: student_registration_number, role: "student" },
          { new: true, session }
        );
      }
    }

    // ✅ CASE 2: Both user and student exist
    else {
      // 1️⃣ Create enrollment
      console.log("student ace");
      const enrollment_result = await Enrollment_Model.create(
        [enrollment_data],
        {
          session,
        }
      );
      enrollment = enrollment_result[0];
    }

    const course_id = enrollment?.courseId;
    const total_lessons = await Lesson_Model.find({ course_id });
    const progress_data: Partial<TProgress> = {};

    progress_data.userId = enrollment?.userId as Types.ObjectId;
    progress_data.courseId = enrollment?.courseId as Types.ObjectId;
    progress_data.enrollmentId = enrollment?._id as Types.ObjectId;
    progress_data.totalLessons = total_lessons?.length;

    await Progress_Model.create([progress_data], { session });
    await Batch_Model.findByIdAndUpdate(payment_details.batch_Id, {
      $inc: { enrolled_students: 1 },
    });

    if (!enrollment) {
      throw new Error("Enrollment failed");
    }
    await send_payment_confirmation_email(enrollment, payment_details);

    // ✅ Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return enrollment;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    // throw new Error(error.message);
  }

  const successful_payment_data = await Payment_model.findOne(
    {
      transactionId: tran_id,
    },
    { new: true }
  );

  if (successful_payment_data) {
    return successful_payment_data;
  }
};
const fail_sslcommerz_into_db = async (tran_id: string | undefined) => {
  const result = await Payment_model.findOneAndUpdate(
    { transactionId: tran_id },
    {
      paymentStatus: "failed",
    }
  );

  const failed_payment_data = await Payment_model.findOne(
    {
      transactionId: tran_id,
    },
    { new: true }
  );

  if (failed_payment_data) {
    return failed_payment_data;
  }
};
const cancel_sslcommerz_into_db = async (tran_id: string | undefined) => {
  const result = await Payment_model.findOneAndUpdate(
    { transactionId: tran_id },
    {
      paymentStatus: "canceled",
    }
  );

  const failed_payment_data = await Payment_model.findOne(
    {
      transactionId: tran_id,
    },
    { new: true }
  );

  if (failed_payment_data) {
    return failed_payment_data;
  }
};

export const payment_services = {
  initialize_sslcommerz_into_db,
  success_sslcommerz_into_db,
  fail_sslcommerz_into_db,
  cancel_sslcommerz_into_db,
};
