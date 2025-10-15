import { Request, RequestHandler, Response } from "express";
import { user_services } from "./user.service";
import { catch_async } from "../../utils/catch_async";

const create_user = catch_async(async (req, res, next) => {

  const file = req.file;
  const file_name = file?.filename
  const file_full_name = file?.originalname

  const base_url = `${req.protocol}://${req.get("host")}`
  const result = await user_services.create_user_into_db(req.body, base_url, file_name, file_full_name);
  res.status(200).send({
    success: true,
    message: "user created successfully. Please verify your email first !!!",
    data: result,
  });
});
const update_user = catch_async(async (req, res, next) => {

  const user_id = req?.params?.user_id

  const result = await user_services.update_user_into_db(user_id as string,req.body);
  res.status(200).send({
    success: true,
    message: "user updated successfully",
    data: result,
  });
});
const get_single_user = catch_async(async (req, res, next) => {

  const user_id = req?.params?.user_id

  const result = await user_services.get_single_user_from_db(user_id as string);
  res.status(200).send({
    success: true,
    message: "user retrieved successfully",
    data: result,
  });
});
const get_all_user = catch_async(async (req, res, next) => {
  const result = await user_services.get_all_user_from_db();
  res.status(200).send({
    success: true,
    message: "users retrieved successfully",
    data: result,
  });
});

export const user_controllers = {
  create_user,
  update_user,
  get_single_user,
  get_all_user
};
