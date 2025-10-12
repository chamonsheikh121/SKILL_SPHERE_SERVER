// types/payment.ts
import { Types } from "mongoose";

export type TPaymentStatus = "success" | "failed" | "pending"|"canceled";
export type TPaymentMethods = "ssl_commerz" | "stripe" | "surjopay";

export type TPayment = {
  courseId: Types.ObjectId;
  paymentStatus?: TPaymentStatus;
  userId: Types.ObjectId;
  transactionId: string;
  paymentMethod: TPaymentMethods;
  is_deleted?: boolean;
};
