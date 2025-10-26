import express from "express";
import { validate_request } from "../../middle_wires/validate_request";
import {
  blog_zod_validation_schema,
  update_blog_zod_validation_schema,
} from "./blog.zod_validation";
import { blog_controllers } from "./blog.controller";
import { upload_image } from "../../utils/upload_image";
import { catch_async } from "../../utils/catch_async";
import { request_data_parser } from "../../middle_wires/data_parser";
import { authorizer } from "../../utils/authorization";
import { user_roles } from "../user/user.constance";
const router = express.Router();

router.post(
  "/create-blog",
  upload_image.single("image_file"),
  catch_async(request_data_parser),
  validate_request(blog_zod_validation_schema),
  authorizer(user_roles.admin),
  blog_controllers.create_blog
);

router.patch(
  "/update-blog/:blog_id",
  upload_image.single("image_file"),
  catch_async(request_data_parser),
  validate_request(update_blog_zod_validation_schema),
  authorizer(user_roles.admin),
  blog_controllers.update_blog
);
router.get(
  "/:blog_id",
  authorizer(user_roles.admin),
  blog_controllers.get_single_blog
);
router.get("/", authorizer(user_roles.admin), blog_controllers.get_all_blog);

export const blog_router = router;
