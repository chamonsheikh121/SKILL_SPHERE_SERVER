import { Types } from "mongoose";

export type TEnrollment = {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  batch_id?: Types.ObjectId;
  purchaseDate: Date;
  status: "active" | "completed";
};  
