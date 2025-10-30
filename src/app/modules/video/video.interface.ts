import { Types } from "mongoose";

export type TVideo = {
  courseId: Types.ObjectId;
  lessonId: Types.ObjectId;
  batchId: Types.ObjectId;
  url?: string; 
  duration: number; 
  // qualityOptions: string[]; 
    
};
