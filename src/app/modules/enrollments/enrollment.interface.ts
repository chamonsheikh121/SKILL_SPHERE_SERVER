import { Types } from "mongoose";

export type TEnrollment = {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  offered_course?: Types.ObjectId;
  purchaseDate: string;
  progressPercent?: number;
  completedLessons?: Types.ObjectId[];
  certificateId?: Types.ObjectId;
  status: "active" | "completed";
};
