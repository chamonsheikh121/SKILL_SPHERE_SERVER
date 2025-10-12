import { Model, Types } from "mongoose";

export type TUserName = {
  first_name: string;
  mid_name?: string;
  last_name: string;
};

export type TUser = {
  name: TUserName;
  email: string;
  registration_number?: string;
  password: string;
  role: "student" | "admin" | "user";
  profile_image?: string;
  phone_number: string;
  is_email_verified: boolean;
  status: "in_progress" | "blocked" | "active";
  isDeleted: boolean;
  wishlist?: string[];
};

export interface IUser extends Model<TUser> {
  is_user_exist_by_email(email: string| Types.ObjectId): Promise<TUser | null>;
}


