import { Schema, model } from "mongoose";
import { TAdmin } from "./admin.interface";
import { admin_roles } from "./admin.constance";

const adminSchema = new Schema<TAdmin>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true, // one admin per user
    },
    permissions: {
      type: [String],
      default: [],
      enum: admin_roles,
    }
  },
  {
    timestamps: true,
  },
);

export const AdminModel = model<TAdmin>("Admin", adminSchema);
