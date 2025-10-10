import { catch_async } from "../../utils/catch_async";
import { batch_services } from "./batch.service";




const create_batch_course = catch_async(async (req, res, next) => {
  const result = await batch_services.create_batch_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "New Batch created successfully",
    data: result,
  });
});

export const batch_controllers = {
  create_batch_course,
};
