import express from "express";
import { validate_request } from "../../middle_wires/validate_request";
import { certificate_controllers } from "./certificate.controller";
import {
  certificate_zod_validation_schema,
  update_certificate_zod_validation_schema,
} from "./certificate.zod_validation";
import { upload_image } from "../../utils/upload_image";
import { catch_async } from "../../utils/catch_async";
import { request_data_parser } from "../../middle_wires/data_parser";

const router = express.Router();

router.post(
  "/create-certificate",
  upload_image.single("image_file"),
  catch_async(request_data_parser),
  validate_request(certificate_zod_validation_schema),
  certificate_controllers.create_certificate
);
router.patch(
  "/update-certificate/:certificate_id",
  upload_image.single("image_file"),
  catch_async(request_data_parser),
  validate_request(update_certificate_zod_validation_schema),
  certificate_controllers.update_certificate
);
  
export const certificate_router = router;
