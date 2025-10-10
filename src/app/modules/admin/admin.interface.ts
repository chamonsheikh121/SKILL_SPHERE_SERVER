import { Types } from "mongoose";

export type TAdmin = {
  user_id: Types.ObjectId;
  permissions: string[]; 
};
