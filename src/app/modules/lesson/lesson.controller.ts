import { catch_async } from "../../utils/catch_async";
import { lesson_services } from "./lesson.service";

const create_lesson = catch_async(async (req, res, next) => {
  const result = await lesson_services.create_lesson_into_db(req.body);
  res.status(200).send({
    success: true,
    message: "lesson created successfully",
    data: result,
  });
});
const update_lesson = catch_async(async (req, res, next) => {

  const lesson_id = req?.params?.lesson_id
  const result = await lesson_services.update_lesson_into_db(lesson_id as string,req.body);
  res.status(200).send({
    success: true,
    message: "lesson updated successfully",
    data: result,
  });
});
const get_single_lesson = catch_async(async (req, res, next) => {

  const lesson_id = req?.params?.lesson_id

  const result = await lesson_services.get_single_lesson_from_db(lesson_id as string);
  res.status(200).send({
    success: true,
    message: "lesson retrieved successfully",
    data: result,
  });
});
const get_all_lesson = catch_async(async (req, res, next) => {
  const result = await lesson_services.get_all_lesson_from_db();
  res.status(200).send({
    success: true,
    message: "lessons retrieved successfully",
    data: result,
  });
});

export const lesson_controllers = {
  create_lesson,
  update_lesson,
  get_single_lesson,
  get_all_lesson
};
