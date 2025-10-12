// validation/payment_zod_validation_schema.ts
import { z } from "zod";
import { payment_methods_const, payment_status_const } from "./payment.constance";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const payment_zod_validation_schema = z.object({
    body:z.object({
  courseId: z.string().regex(objectIdRegex, "Invalid courseId"),
  paymentStatus: z.enum(payment_status_const).default("pending").optional(),
  userId: z.string().regex(objectIdRegex, "Invalid userId"),
  transactionId: z.string().min(1, "Transaction ID is required").optional(),
  paymentMethod: z.enum(payment_methods_const).default("ssl_commerz"),
  is_deleted: z.boolean().default(false),
})
});

export type PaymentInput = z.infer<typeof payment_zod_validation_schema>;
