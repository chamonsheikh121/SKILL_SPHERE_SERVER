import { catch_async } from "../../utils/catch_async";
import { enrollment_services } from "./enrollment.service";



const create_enrollment = catch_async(async (req, res, next) => {
  const result = await enrollment_services.create_enrollment_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "Enrolled successfully",
    data: result,
  });
});


// const update_course = catch_async(async (req, res, next) => {

//   const course_id = req?.params?.course_id;

//   const result = await enrollment_services.(course_id as string,req.body)
//   res.status(200).send({
//     success: true,
//     message: "course updated successfully",
//     data: result,
//   });
// });

const get_single_enrollment = catch_async(async (req, res, next) => {

  const enrollment_id = req?.params?.enrollment_id

  const result = await enrollment_services.get_single_enrollment_from_db(enrollment_id as string);
  res.status(200).send({
    success: true,
    message: "enrollment retrieved successfully",
    data: result,
  });
});
const get_all_enrollment = catch_async(async (req, res, next) => {
  const result = await enrollment_services.get_all_enrollment_from_db();
  res.status(200).send({
    success: true,
    message: "enrollments retrieved successfully",
    data: result,
  });
});


export const enrollment_controllers = {
  create_enrollment,
  get_single_enrollment,
  get_all_enrollment
};
