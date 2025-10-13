import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";


const create_course_into_db = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const update_course_into_db = async(id:string,payload:Partial<TCourse>)=>{

const course = await CourseModel.findById(id);
if(!course){
  throw new Error('no course found')
}
  const result = await CourseModel.findByIdAndUpdate(id,payload, {new:true})
  console.log(result);
return result;
}

const get_single_course_from_db = async (id: string) => {
  const result = await CourseModel.findById(id);
  if (!result) {
    throw new Error("No course found");
  }

  return result;
};
const get_all_course_from_db = async () => {
  const result = await CourseModel.find();
  if (!result.length) {
    throw new Error("No courses found");
  }

  return result;
};


export const course_services = {
  create_course_into_db,
  update_course_into_db,
  get_single_course_from_db,
  get_all_course_from_db
};
