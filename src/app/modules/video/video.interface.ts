import { Types } from "mongoose";

export type TVideo = {
  courseId: Types.ObjectId;
  lessonId: Types.ObjectId;
  title: string;
  url: string; 
  duration: number; 
  qualityOptions: string[]; 
  courseTitle: string;        
};
