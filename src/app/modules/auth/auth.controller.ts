
import { catch_async } from "../../utils/catch_async";
import { auth_services } from "./auth.service";
import config from "../../config";

const login = catch_async(async (req, res, next) => {

  const base_url = `${req.protocol}://${req.get("host")}`
  const result = await auth_services.login_with_email_and_password(req.body, base_url);
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
const verify_email = catch_async(async (req, res, next) => {

  const {email, token} = req?.query

  const result = await auth_services.verify_email_into_db(email as string, token as string);


  if(result){
    res.redirect(`${config.FRONTEND_UI_DOMAIN}/login`)
  }
});
const change_password = catch_async(async (req, res, next) => {

  const result = await auth_services.change_password_into_db(req?.user,req.body);
  res.status(200).send({
    success: true,
    message: "password changed successfully",
    data: result,
  });
});
const reset_password = catch_async(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] as string;

  const result = await auth_services.reset_password_into_db(token, req.body);

  res.status(200).send({
    success: true,
    message: "password updated successfully",
    data: result,
  });
});
const forgot_password = catch_async(async (req, res, next) => {
  const result = await auth_services.create_reset_link(req.body);

  res.status(200).send({
    success: true,
    message: "reset link sent successfully",
    data: result,
  });
});

export const auth_controllers = {
  login,
  change_password,
  forgot_password,
  reset_password,
  verify_email
  
};
