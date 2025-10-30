import { Lesson_Model } from "../lesson/lesson.model";
import { TBatch } from "./batch.interface";
import Batch_Model from "./batch.model";


const create_batch_into_db = async (payload: TBatch) => {
  const lessons = await Lesson_Model.find({ courseId: payload?.course_id });

  const batchLessons = lessons.map((lesson) => ({
    lesson_id: lesson._id,
    video_url: "",
  }));

  payload.lessons = batchLessons;
  const result = await Batch_Model.create(payload);
  return result;
};

const update_batch_into_db = async (id: string, payload: Partial<TBatch>) => {
  const course = await Batch_Model.findById(id);
  if (!course) {
    throw new Error("no batch found");
  }
  const result = await Batch_Model.findByIdAndUpdate(id, payload, {
    new: true,
  });
  console.log(result);
  return result;
};

const get_single_batch_from_db = async (id: string) => {
  const result = await Batch_Model.findById(id);
  if (!result) {
    throw new Error("No batch found");
  }

  return result;
};
const get_all_batch_from_db = async () => {
  const result = await Batch_Model.find();
  if (!result.length) {
    throw new Error("No batchs found");
  }

  return result;
};

export const batch_services = {
  create_batch_into_db,
  update_batch_into_db,
  get_all_batch_from_db,
  get_single_batch_from_db,
};
