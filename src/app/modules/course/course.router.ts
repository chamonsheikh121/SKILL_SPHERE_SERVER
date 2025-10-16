import express from "express";
import { validate_request } from "../../middle_wires/validate_request";
import {
  course_zod_validation_schema,
  update_course_zod_validation_schema,
} from "./course.zod_validation";
import { course_controllers } from "./course.controller";
import { upload_image } from "../../utils/upload_image";
import { catch_async } from "../../utils/catch_async";
import { request_data_parser } from "../../middle_wires/data_parser";
const router = express.Router();

router.post(
  "/create-course",
  upload_image.single("image_file"),
  catch_async(request_data_parser),
  validate_request(course_zod_validation_schema),
  course_controllers.create_course
);
router.patch(
  "/update-course/:course_id",
  upload_image.single("image_file"),
  catch_async(request_data_parser),
  validate_request(update_course_zod_validation_schema),
  course_controllers.update_course
);
router.get("/:course_id", course_controllers.get_single_course);
router.get("/", course_controllers.get_all_course);
router.delete("/delete-course/:course_id", course_controllers.delete_course);

export const course_router = router;
