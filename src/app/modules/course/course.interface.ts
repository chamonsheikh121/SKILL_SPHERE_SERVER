import { Types } from "mongoose";

export type TCourse = {
  title: string;
  description: string;
  thumbnail: string;
  category: string; 
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  discountPrice?: number;
  instructor_or_admin_Id: Types.ObjectId; 
  tags?: string[];
  // videos?: Types.ObjectId[]; 
  // lessons?: Types.ObjectId[]; 
  // reviews?: Types.ObjectId[];
  // totalDuration?: number; 
};
