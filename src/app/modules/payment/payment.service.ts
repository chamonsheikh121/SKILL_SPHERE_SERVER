import config from "../../config";
import { CourseModel } from "../course/course.model";
import UserModel from "../user/user.model";
import { TPayment } from "./payment.interface";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";
import Payment_model from "./payment.model";

const initialize_sslcommerz_into_db = async (payload: TPayment) => {
  const is_live = false; //true for live, false for sandbox
  const transactionId = uuidv4();

  const course = await CourseModel.findById(payload?.courseId);
  const user = await UserModel.findById(payload?.userId);

  let payment_data: Partial<TPayment> = {};

  if (user && course) {
    payment_data.courseId = course?._id;
    payment_data.paymentMethod = payload?.paymentMethod;
    payment_data.transactionId = transactionId;
    payment_data.userId = user?._id;
  }

  await Payment_model.create(payment_data);

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
    product_category: course?.category,
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

  return {
    gatewway_page_url: api_response.GatewayPageURL,
  };
};

const success_sslcommerz_into_db = async (tran_id: string | undefined) => {
  const result = await Payment_model.findOneAndUpdate(
    { transactionId: tran_id },
    {
      paymentStatus: "success",
    }
  );

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
  cancel_sslcommerz_into_db
};
