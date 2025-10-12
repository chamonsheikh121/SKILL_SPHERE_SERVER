// models/Payment.ts
import mongoose, { Schema, Document, Model, model } from "mongoose";
import { TPayment } from "./payment.interface";
import { payment_status_const } from "./payment.constance";



const PaymentSchema = new Schema<TPayment>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    amount: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: payment_status_const,
      default: "pending",
    },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, required: true },
    is_published: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Payment_model= model<TPayment>("Payments", PaymentSchema);

export default Payment_model;
