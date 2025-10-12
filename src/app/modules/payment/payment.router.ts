import express from "express";
import { validate_request } from "../../middle_wires/validate_request";
import { payment_zod_validation_schema } from "./payment.zod_validation";
import { payment_controllers } from "./payment.controller";

const router = express.Router();

router.post(
  "/create-payment",
  validate_request(payment_zod_validation_schema),
  payment_controllers.create_payment
);

export const payment_router = router;
