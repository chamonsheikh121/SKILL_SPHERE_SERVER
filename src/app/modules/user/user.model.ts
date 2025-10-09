// src/models/User.ts
import mongoose, { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { userRoleConstance, userStatusConstance } from "./user.constance";

const userSchema = new Schema<TUser>(
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
    role: { type: String, enum: userRoleConstance, default: "student" },
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

const UserModel = model<TUser>("Users", userSchema);

export default UserModel;
