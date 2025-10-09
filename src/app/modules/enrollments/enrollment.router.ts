import express from "express";
import { validate_request } from "../../middle_wires/validate_request";
import { enrollment_zod_validation_schema } from "./enrollment.zod_validation";
import { enrollment_controllers } from "./enrollment.controller";
const router = express.Router();

router.post(
  "/create-enrollment",
  validate_request(enrollment_zod_validation_schema),
  enrollment_controllers.create_enrollment
);

export const enrollment_router = router;
