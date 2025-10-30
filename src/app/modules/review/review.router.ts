import express from "express";
import { validate_request } from "../../middle_wires/validate_request";
import {
  review_zod_validation_schema,
  update_review_zod_validation_schema,
} from "./review.zod_validation";
import { review_controllers } from "./review.controller";

const router = express.Router();

router.post(
  "/create-review",
  validate_request(review_zod_validation_schema),
  review_controllers.create_review
);

router.patch("/change-status/:_id", review_controllers.change_status);

router.get("/", review_controllers.get_all_reviews);
router.get("/:_id", review_controllers.get_single_review);

router.patch(
  "/update-review/:_id",
  validate_request(update_review_zod_validation_schema),
  review_controllers.update_review
);

router.delete("/delete-review/:_id", review_controllers.delete_review);

export const review_router = router;
