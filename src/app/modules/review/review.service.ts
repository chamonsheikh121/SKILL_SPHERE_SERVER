import { TReview } from "./review.interface";
import Review_Model from "./review.model";

const create_review_into_db = async (payload: TReview) => {
  const result = await Review_Model.create(payload);
  return result;
};




export const review_services = {
  create_review_into_db,
};
