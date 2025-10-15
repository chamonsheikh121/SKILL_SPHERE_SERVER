// types/certificate.ts
import { Types } from "mongoose";

export type TCertificate = {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  certificateUrl?: string;
};
