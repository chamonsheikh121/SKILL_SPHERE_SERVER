import { Types } from "mongoose";


type TProgress_Status = 'in_progress'|'completed'

export type TProgress = {
    userId: Types.ObjectId;
courseId: Types.ObjectId;
enrollmentId: Types.ObjectId;
completedLessons: number; 
totalLessons: number; 
percentage: number;
status: TProgress_Status;
}