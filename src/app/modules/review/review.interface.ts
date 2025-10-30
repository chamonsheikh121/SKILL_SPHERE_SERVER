// types/review.ts
import { Types } from "mongoose";

type TReviews_Status = "approved" | "pending";

export type TReview = {
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  status: TReviews_Status;
  review_date: Date;
};
