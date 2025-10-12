import { Model, Types } from "mongoose";

export type TStudent = {
  user_id: Types.ObjectId;
  registration_number?: string;
};

export interface IStudent extends Model<TStudent> {
  is_student_exist(user_id: string | Types.ObjectId): Promise<TStudent | null>;
}
