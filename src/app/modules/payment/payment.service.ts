import config from "../../config";
import { CourseModel } from "../course/course.model";
import UserModel from "../user/user.model";
import { TPayment } from "./payment.interface";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";

const create_payment_into_db = async (payload: TPayment) => {
  const store_id = config.SSLCOMMERZ_STORE_ID;
  const store_passwd = config.SSLCOMMERZ_PASSWORD;
  const is_live = false; //true for live, false for sandbox

  const course = await CourseModel.findById(payload?.courseId);
  const user = await UserModel.findById(payload?.userId);

  const transactionId = uuidv4();
  const customer_name = `${user?.name?.first_name} ${user?.name?.mid_name} ${user?.name?.last_name}`;

  const data = {
    total_amount: course?.price,
    currency: "BDT",
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: "http://localhost:3030/success",
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
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

  console.log(data);

  //   const result = await Payment_model.create(payload);
  //   return result;
};

export const payment_services = {
  create_payment_into_db,
};
