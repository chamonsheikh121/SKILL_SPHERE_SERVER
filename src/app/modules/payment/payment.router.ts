import express from "express";
import { validate_request } from "../../middle_wires/validate_request";
import { payment_zod_validation_schema } from "./payment.zod_validation";
import { payment_controllers } from "./payment.controller";

const router = express.Router();

router.post(
  "/create-sslcommerz-payment",
  validate_request(payment_zod_validation_schema),
  payment_controllers.initialize_SSLCOMMERZ_payment
);
router.post(
  "/ssl_payment/success/:transactionId",
  payment_controllers.success_SSLCOMMERZ_payment
);
router.post(
  "/ssl_payment/fail/:transactionId",
  payment_controllers.fail_SSLCOMMERZ_payment
);
router.post(
  "/ssl_payment/cancel/:transactionId",
  payment_controllers.cancel_SSLCOMMERZ_payment
);

export const payment_router = router;
