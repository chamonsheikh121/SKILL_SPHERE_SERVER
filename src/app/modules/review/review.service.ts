import { AppError } from "../../errors/AppError";
import { TReview } from "./review.interface";
import Review_Model from "./review.model";
import HttpStatus from "http-status";

// 1️⃣ Create review
const create_review_into_db = async (payload: TReview) => {
  const result = await Review_Model.create(payload);
  return result;
};

// 2️⃣ Get all reviews
const get_all_reviews_from_db = async () => {
  const reviews = await Review_Model.find();
  return reviews;
};

// 3️⃣ Get single review by ID
const get_single_review_from_db = async (id: string) => {
  const review = await Review_Model.findById(id);
  if (!review) {
    throw new AppError("Review not found", HttpStatus.NOT_FOUND);
  }
  return review;
};

// 4️⃣ Update review by ID
const update_review_into_db = async (id: string, payload: Partial<TReview>) => {

  const existing_review = await Review_Model.findById(id);
   if (!existing_review) {
    throw new AppError("Review not found", HttpStatus.NOT_FOUND);
  }
  const updated_review = await Review_Model.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updated_review;
};

// 5️⃣ Delete review by ID
const delete_review_from_db = async (id: string) => {
  const deleted_review = await Review_Model.findByIdAndDelete(id);
  if (!deleted_review) {
    throw new AppError("Review not found", HttpStatus.NOT_FOUND);
  }
  return deleted_review;
};

// 6️⃣ Change review status (existing)
const change_review_status_into_db = async (id: string) => {
  const is_exist_review = await Review_Model.findById(id);
  if (!is_exist_review) {
    throw new AppError("Review not found", HttpStatus.NOT_FOUND);
  }

  let result;
  if (is_exist_review.status === "approved") {
    result = await Review_Model.findByIdAndUpdate(
      id,
      { status: "pending" },
      { new: true }
    );
  } else if (is_exist_review.status === "pending") {
    result = await Review_Model.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
  }

  return result;
};

export const review_services = {
  create_review_into_db,
  get_all_reviews_from_db,
  get_single_review_from_db,
  update_review_into_db,
  delete_review_from_db,
  change_review_status_into_db,
};
