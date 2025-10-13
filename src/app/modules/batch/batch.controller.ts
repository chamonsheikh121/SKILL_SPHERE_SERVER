import { catch_async } from "../../utils/catch_async";
import { batch_services } from "./batch.service";




const create_batch = catch_async(async (req, res, next) => {
  const result = await batch_services.create_batch_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "New Batch created successfully",
    data: result,
  });
});


const update_batch = catch_async(async (req, res, next) => {

  const batch_id = req?.params?.batch_id;

  const result = await batch_services.update_batch_into_db(batch_id as string,req.body)
  res.status(200).send({
    success: true,
    message: "batch updated successfully",
    data: result,
  });
});

const get_single_batch = catch_async(async (req, res, next) => {

  const batch_id = req?.params?.batch_id

  const result = await batch_services.get_single_batch_from_db(batch_id as string);
  res.status(200).send({
    success: true,
    message: "batch retrieved successfully",
    data: result,
  });
});
const get_all_batch = catch_async(async (req, res, next) => {
  const result = await batch_services.get_all_batch_from_db();
  res.status(200).send({
    success: true,
    message: "batches retrieved successfully",
    data: result,
  });
});


export const batch_controllers = {
  create_batch,
  update_batch,
  get_all_batch,
  get_single_batch

};
