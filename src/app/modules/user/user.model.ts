// src/models/User.ts
import mongoose, { Schema, model } from "mongoose";
import { IUser, TUser } from "./user.interface";
import { userRoleConstance, userStatusConstance } from "./user.constance";
import bcrypt from "bcrypt";
import config from "../../config";
import { date } from "zod";

const userSchema = new Schema<TUser, IUser>(
  {
    name: {
      first_name: { type: String, required: true },
      mid_name: { type: String },
      last_name: { type: String, required: true },
    },
    registration_number: {
      type: String,
      default: "",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: userRoleConstance, default: "user" },
    profile_image: { type: String },
    phone_number: { type: String, required: true },
    is_email_verified: { type: Boolean, default: false },
    status: { type: String, enum: userStatusConstance, default: "in_progress" },
    isDeleted: { type: Boolean, default: false },
    last_pass_changed_at: { type: Date, default: Date.now },
    wishlist: [{ type: String, default: "" }],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.is_user_exist_by_email = async function (email) {
  const user = await this.findOne({ email });
  return user;
};
userSchema.statics.last_login_and_pass_update_comparision = function (
  last_pass_update_time: Date,
  last_login_time: number,
) {
  const time_as_like_last_login =
    new Date(last_pass_update_time).getTime() / 1000;
  return time_as_like_last_login > last_login_time;
};

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYPT_SALT_ROUND)
  );
});

const UserModel = model<TUser, IUser>("Users", userSchema);

export default UserModel;
