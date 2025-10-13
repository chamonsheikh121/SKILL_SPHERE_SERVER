import { Types } from "mongoose";

export type TBatch = {
  course_id: Types.ObjectId;            
  instructor_admin_id: Types.ObjectId;        
  title: string;
  start_date: string;
  end_date: string;
  enrollment_start_date: string;
  enrollment_end_date: string;
  max_participants: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  enrollmentStatus: "not_started" | "open" | "all_booked" | "closed";
  language: string;
  tags?: string[];    
};
