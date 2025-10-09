import { catch_async } from "../../utils/catch_async";
import { course_services } from "./course.service";


const create_course = catch_async(async (req, res, next) => {
  const result = await course_services.create_course_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "course created successfully",
    data: result,
  });
});

export const course_controllers = {
  create_course,
};
