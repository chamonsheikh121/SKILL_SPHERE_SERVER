// models/Review.ts
import mongoose, { Schema, Document, Model, model } from "mongoose";
import { TReview } from "./review.interface";
import { review_status_cons } from "./review.constance";

const ReviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      required: true,
      maxLength: 2000,
    },
    status: {
      type: String,
      enum: review_status_cons,
      default: "pending",
    },
    review_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Review_Model = model<TReview>("Reviews", ReviewSchema);
export default Review_Model;
