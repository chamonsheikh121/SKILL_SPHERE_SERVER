import { Request, RequestHandler, Response } from "express";
import { user_services } from "./user.service";
import { catch_async } from "../../utils/catch_async";

const create_user = catch_async(async (req, res, next) => {
  const result = await user_services.create_user_into_db(req.body);
  res.status(200).send({
    success: true,
    message: "user created successfully",
    data: result,
  });
});

export const user_controllers = {
  create_user,
};
