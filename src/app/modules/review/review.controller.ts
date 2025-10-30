import { catch_async } from "../../utils/catch_async";
import { review_services } from "./review.service";

// 1️⃣ Create review
const create_review = catch_async(async (req, res, next) => {
  const result = await review_services.create_review_into_db(req.body);
  res.status(200).send({
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

// 2️⃣ Change review status
const change_status = catch_async(async (req, res, next) => {
  const { _id } = req.params;
  const result = await review_services.change_review_status_into_db(_id as string);
  res.status(200).send({
    success: true,
    message: "Review status changed successfully",
    data: result,
  });
});

// 3️⃣ Get all reviews
const get_all_reviews = catch_async(async (req, res, next) => {
  const result = await review_services.get_all_reviews_from_db();
  res.status(200).send({
    success: true,
    message: "All reviews fetched successfully",
    data: result,
  });
});

// 4️⃣ Get single review
const get_single_review = catch_async(async (req, res, next) => {
  const { _id } = req.params;
  const result = await review_services.get_single_review_from_db(_id as string);
  res.status(200).send({
    success: true,
    message: "Review fetched successfully",
    data: result,
  });
});

// 5️⃣ Update review
const update_review = catch_async(async (req, res, next) => {
  const { _id } = req.params;
  const result = await review_services.update_review_into_db(_id as string, req.body);
  res.status(200).send({
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

// 6️⃣ Delete review
const delete_review = catch_async(async (req, res, next) => {
  const { _id } = req.params;
  const result = await review_services.delete_review_from_db(_id as string);
  res.status(200).send({
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

export const review_controllers = {
  create_review,
  change_status,
  get_all_reviews,
  get_single_review,
  update_review,
  delete_review,
};
