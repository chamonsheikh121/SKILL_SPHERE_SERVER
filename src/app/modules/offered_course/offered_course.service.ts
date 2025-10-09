import { TOffered_Course } from "./offered_course.interface";
import Offered_Course_Model from "./offered_course.model";



const create_offered_course_into_db = async (payload: TOffered_Course) => {
  const result = await Offered_Course_Model.create(payload);
  return result;
};

export const offered_course_services = {
  create_offered_course_into_db,
};
