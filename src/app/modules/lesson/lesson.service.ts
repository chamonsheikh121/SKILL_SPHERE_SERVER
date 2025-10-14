import { TLesson } from "./lesson.interface";
import { Lesson_Model } from "./lesson.model";

const create_lesson_into_db = async (payload: TLesson) => {
  const result = await Lesson_Model.create(payload);
  return result;
};

const update_lesson_into_db = async (id: string, payload: Partial<TLesson>) => {
  const result = await Lesson_Model.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const get_single_lesson_from_db = async (id: string) => {
  const result = await Lesson_Model.findById(id);
  if (!result) {
    throw new Error("No lesson found");
  }

  return result;
};
const get_all_lesson_from_db = async () => {
  const result = await Lesson_Model.find();
  if (!result.length) {
    throw new Error("No lesson found");
  }

  return result;
};

export const lesson_services = {
  create_lesson_into_db,
  update_lesson_into_db,
  get_single_lesson_from_db,
  get_all_lesson_from_db
};
