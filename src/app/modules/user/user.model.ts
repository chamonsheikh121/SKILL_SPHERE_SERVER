// src/models/User.ts
import mongoose, { Schema, model } from "mongoose";
import { IUser, TUser } from "./user.interface";
import { userRoleConstance, userStatusConstance } from "./user.constance";
import { error } from "console";

const userSchema = new Schema<TUser, IUser>(
  {
    name: {
      first_name: { type: String, required: true },
      mid_name: { type: String },
      last_name: { type: String, required: true },
    },
    registration_number: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: userRoleConstance, default: "user" },
    profile_image: { type: String },
    phone_number: { type: String },
    is_email_verified: { type: Boolean, default: false },
    status: { type: String, enum: userStatusConstance, default: "in_progress" },
    isDeleted: { type: Boolean, default: false },
    wishlist: [{ type: String }],
    last_login: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.is_user_exist_by_email = async function (id) {
  const user = await this.findById(id)

  if (!user) {
    throw new Error("user doesn't exist");
  }
  return user;
};

const UserModel = model<TUser, IUser>("Users", userSchema);

export default UserModel;
