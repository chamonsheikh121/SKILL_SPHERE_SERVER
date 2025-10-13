

import { Request, RequestHandler, Response } from "express";
import { catch_async } from "../../utils/catch_async";
import { student_services } from "./student.service";


const get_single_student = catch_async(async (req, res, next) => {

  const student_id = req?.params?.student_id

  const result = await student_services.get_single_student_from_db(student_id as string);
  res.status(200).send({
    success: true,
    message: "student retrieved successfully",
    data: result,
  });
});
const get_all_student = catch_async(async (req, res, next) => {
  const result = await student_services.get_all_student_from_db();
  res.status(200).send({
    success: true,
    message: "students retrieved successfully",
    data: result,
  });
});

export const student_controllers = {
  get_single_student,
  get_all_student
};
