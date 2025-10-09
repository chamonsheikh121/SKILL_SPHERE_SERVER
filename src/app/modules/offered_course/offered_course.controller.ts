import { catch_async } from "../../utils/catch_async";
import { offered_course_services } from "./offered_course.service";



const create_offered_course = catch_async(async (req, res, next) => {
  const result = await offered_course_services.create_offered_course_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "offered course created successfully",
    data: result,
  });
});

export const offered_course_controllers = {
  create_offered_course,
};
