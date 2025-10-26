import { Model, Types } from "mongoose";
import { user_roles } from "./user.constance";

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
  status: "in_progress" | "blocked";
  isDeleted: boolean;
  wishlist?: string[];
  last_pass_changed_at: Date;
};

export interface IUser extends Model<TUser> {
  is_user_exist_by_email(email: string): Promise<TUser | null>;
   last_login_and_pass_update_comparision(
    last_pass_update_time: Date,
    last_login_time: number,
  ): boolean;
}

export type TUser_Role = keyof typeof user_roles;
