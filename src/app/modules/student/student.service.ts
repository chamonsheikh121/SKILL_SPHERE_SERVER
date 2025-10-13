import { TStudent } from "./student.interface";
import StudentModel from "./student.model";

const get_single_student_from_db = async (id: string) => {
  const result = await StudentModel.findById(id);
  if (!result) {
    throw new Error("No student found");
  }

  return result;
};
const get_all_student_from_db = async () => {
  const result = await StudentModel.find();
  if (!result.length) {
    throw new Error("No student found");
  }

  return result;
};

export const student_services = {
  get_single_student_from_db,
  get_all_student_from_db
};
