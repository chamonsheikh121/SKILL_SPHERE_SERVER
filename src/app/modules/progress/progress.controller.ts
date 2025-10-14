import { catch_async } from "../../utils/catch_async";
import { progress_services } from "./progress.service";


// const update_user = catch_async(async (req, res, next) => {

//   const progress_id = req?.params?.progress_id

//   const result = await progress_services.update_user_into_db(progress_id as string,req.body);
//   res.status(200).send({
//     success: true,
//     message: "user updated successfully",
//     data: result,
//   });
// });


const get_single_progress = catch_async(async (req, res, next) => {

  const progress_id = req?.params?.progress_id

  const result = await progress_services.get_single_progress_from_db(progress_id as string);
  res.status(200).send({
    success: true,
    message: "progress retrieved successfully",
    data: result,
  });
});
const get_all_progress = catch_async(async (req, res, next) => {
  const result = await progress_services.get_all_progress_from_db();
  res.status(200).send({
    success: true,
    message: "progress retrieved successfully",
    data: result,
  });
});

export const progress_controllers = {
 
  get_single_progress,
  get_all_progress
};
