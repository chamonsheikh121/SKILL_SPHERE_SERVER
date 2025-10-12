import { Types } from "mongoose";

export type TAdmin = {
  user_id: Types.ObjectId;
  registration_number:string;
  // permissions: string[]; 
};
