import express from "express";
import { validate_request } from "../../middle_wires/validate_request";
import {
  change_pass_zod_validation_schema,
  forget_pass_zod_validation_schema,
  login_zod_validation_schema,
  reset_pass_zod_validation_schema,
} from "./auth.zod_validation";
import { auth_controllers } from "./auth.controller";
import { authorizer } from "../../utils/authorization";


const router = express.Router();


router.post(
  "/login",
  validate_request(login_zod_validation_schema),
  auth_controllers.login
);
router.get(
  "/verify-email",
  auth_controllers.verify_email
);
router.post(
  "/change-password",
  authorizer(),
  validate_request(change_pass_zod_validation_schema),
  auth_controllers.change_password
);
router.post(
  "/forget-password",
  validate_request(forget_pass_zod_validation_schema),
  auth_controllers.forgot_password
);
router.post(
  "/reset-password",
  validate_request(reset_pass_zod_validation_schema),
  auth_controllers.reset_password
);

export const auth_router = router;
