import { Types } from "mongoose";

type TLessons = {
  lesson_id: Types.ObjectId;
  video_url: string;
  video_id?: Types.ObjectId;
};

export type TBatch = {
  course_id: Types.ObjectId;
  title: string;
  start_date: string;
  end_date: string;
  enrolled_students:number;
  max_participants: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";


  
  enrollment_start_date: string;
  enrollment_end_date: string;
  enrollmentStatus: "not_started" | "open" | "all_booked" | "closed";
  lessons: TLessons[];
  // instructor_admin_id: Types.ObjectId;
  // language: string;
  // tags?: string[];
};
