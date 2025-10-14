import { success } from "zod";
import { catch_async } from "../../utils/catch_async";
import { auth_services } from "./auth.service";
import config from "../../config";

const login = catch_async(async (req, res, next) => {
  const result = await auth_services.login_with_email_and_password(req.body);

  res.cookie("refresh_token", result?.refresh_token, {
    httpOnly: true,
    secure: config.NODE_DEV === "development" ? false : true,
  });

  res.status(200).send({
    success: true,
    message: "user logged in successfully",
    data: result.access_token,
  });
});
const forgot_password = catch_async(async (req, res, next) => {

  const result = await auth_services.create_reset_link(req.body);
 
  res.status(200).send({
    success: true,
    message: "reset link sent successfully",
    data:result,
  });
});

export const auth_controllers = {
  login,
  forgot_password
};
