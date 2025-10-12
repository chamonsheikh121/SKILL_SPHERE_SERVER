import  express  from "express";
import { review_controllers } from "./review.controller";
import { validate_request } from "../../middle_wires/validate_request";
import { review_zod_validation_schema } from "./review.zod_validation";
const router = express.Router();

router.post(
  "/create-review",
  validate_request(review_zod_validation_schema),
  review_controllers.create_review
);

export const review_router = router;
