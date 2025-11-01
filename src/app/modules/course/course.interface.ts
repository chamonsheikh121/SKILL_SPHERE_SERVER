
export type TCourse = {
  title: string;
  description: string;
  Workshop_URL:string;
  thumbnail?: string;
  price: number;
  mentor_name: string;
  mentor_photo?: string;
  mentor_rating?: number;
  mentor_description:string;
  course_rating:number;
  total_students:number
  // category: string; 
  // level: "beginner" | "intermediate" | "advanced";
  // discountPrice?: number;
  // created_by: Types.ObjectId; 
  // tags?: string[];
  // videos?: Types.ObjectId[]; 
  // lessons?: Types.ObjectId[]; 
  // reviews?: Types.ObjectId[];
  // totalDuration?: number; 
};
