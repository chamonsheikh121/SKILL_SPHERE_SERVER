import { TBatch } from "./batch.interface";
import Batch_Model from "./batch.model";
import Offered_Course_Model from "./batch.model";



const create_batch_into_db = async (payload: TBatch) => {
  const result = await Batch_Model.create(payload);
  return result;
};

export const batch_services = {
  create_batch_into_db,
};
