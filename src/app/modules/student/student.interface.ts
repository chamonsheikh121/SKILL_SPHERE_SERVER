import { Model, Types } from "mongoose";

export type TStudent = {
  user_id: Types.ObjectId;
  registration_number?: string;
  enrolled_courses?: Types.ObjectId[];
  certificates?: Types.ObjectId[];
  progress?: Types.ObjectId;
};

export interface IStudent extends Model<TStudent> {
  is_student_exist(user_id: string | Types.ObjectId): Promise<TStudent | null>;
}
