import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";


const create_course_into_db = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

export const course_services = {
  create_course_into_db,
};
