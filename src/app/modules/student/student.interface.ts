import { Types } from "mongoose";

export type TStudent = {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  registration_number?: string
  enrolled_courses?: Types.ObjectId[];
  certificates?: Types.ObjectId[];
  progress?: Types.ObjectId;
};
