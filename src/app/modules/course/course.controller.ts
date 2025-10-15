import { catch_async } from "../../utils/catch_async";
import { course_services } from "./course.service";

const create_course = catch_async(async (req, res, next) => {
  const file_name = req?.file?.filename;
  const file_original_name = req?.file?.originalname;

  const base_url = `${req.protocol}://${req.get("host")}`;
  const result = await course_services.create_course_into_db(
    req.body,
    file_name,
    file_original_name,
    base_url
  );
  res.status(200).send({
    success: true,
    message: "course created successfully",
    data: result,
  });
});

const update_course = catch_async(async (req, res, next) => {
  const course_id = req?.params?.course_id;

  const result = await course_services.update_course_into_db(
    course_id as string,
    req.body
  );
  res.status(200).send({
    success: true,
    message: "course updated successfully",
    data: result,
  });
});

const get_single_course = catch_async(async (req, res, next) => {
  const course_id = req?.params?.course_id;

  const result = await course_services.get_single_course_from_db(
    course_id as string
  );
  res.status(200).send({
    success: true,
    message: "course retrieved successfully",
    data: result,
  });
});
const get_all_course = catch_async(async (req, res, next) => {
  const result = await course_services.get_all_course_from_db();
  res.status(200).send({
    success: true,
    message: "courses retrieved successfully",
    data: result,
  });
});
const delete_course = catch_async(async (req, res, next) => {
  const course_id = req?.params?.course_id;
  const result = await course_services.delete_course_from_db(
    course_id as string
  );
  res.status(200).send({
    success: true,
    message: "courses deleted successfully",
    data: result,
  });
});

export const course_controllers = {
  create_course,
  update_course,
  get_single_course,
  get_all_course,
  delete_course,
};
