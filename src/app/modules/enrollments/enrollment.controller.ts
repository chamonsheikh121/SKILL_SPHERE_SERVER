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

export const enrollment_controllers = {
  create_enrollment,
};
