import { Types } from "mongoose";

export type TCourse = {
  title: string;
  description: string;
  Workshop_URL:string;
  thumbnail?: string;
  mentor_name: string;
  mentor_photo?: string;
  mentor_rating?: number;
  mentor_description:string;
  category: string; 
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  discountPrice?: number;
  created_by: Types.ObjectId; 
  tags?: string[];
  // videos?: Types.ObjectId[]; 
  // lessons?: Types.ObjectId[]; 
  // reviews?: Types.ObjectId[];
  // totalDuration?: number; 
};
