// types/payment.ts
import { Types } from "mongoose";

export type TPaymentStatus = "success" | "failed" | "pending";

export type TPayment = {
  courseId: Types.ObjectId;
  amount: number;
  paymentStatus: TPaymentStatus;
  userId: Types.ObjectId;
  transactionId: string;
  paymentMethod: string;
  is_published: boolean;
  is_deleted: boolean;
};
