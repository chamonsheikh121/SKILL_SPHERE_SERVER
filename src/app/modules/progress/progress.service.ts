
import { Progress_Model } from "./progress.model";

// const update_user_into_db = async (id: string, payload: Partial<TUser>) => {
//   const { name, ...rest_primitive_data } = payload;
//   const new_data: Record<string, unknown> = { ...rest_primitive_data };


//   if (name && Object.keys(name).length) {
//     console.log(Object.keys(name), Object.keys(name).length);
//     for (const [keys, value] of Object.entries(name)) {
//       new_data[`name.${keys}`] = value;
//     }
//   }
//   console.log(new_data);

//   const result = await Progress_Model.findByIdAndUpdate(id, new_data, { new: true });
//   return result;
// };

const get_single_progress_from_db = async (id: string) => {
  const result = await Progress_Model.findById(id);
  if (!result) {
    throw new Error("No progress found");
  }

  return result;
};
const get_all_progress_from_db = async () => {
  const result = await Progress_Model.find();
  if (!result.length) {
    throw new Error("No progress found");
  }

  return result;
};

export const progress_services = {

  get_single_progress_from_db,
  get_all_progress_from_db
};
