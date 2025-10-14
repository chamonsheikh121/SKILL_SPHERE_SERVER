import jwt, { SignOptions } from "jsonwebtoken";
import { compare_bcrypt_pass } from "../../utils/compare_bcrypt_pass";
import UserModel from "../user/user.model";
import { TAuth } from "./auth.interface";
import { userInfo } from "os";
import config from "../../config";
import { send_reset_password_mail } from "../../utils/send_reset_mail";

const login_with_email_and_password = async (payload: TAuth) => {
  const user = await UserModel.is_user_exist_by_email(payload.email);
  if (!user) {
    throw new Error("No user found with this email");
  }

  if (user?.status === "blocked") {
    throw new Error("Your account has been blocked. Please contact support");
  }
  if (user?.is_email_verified === false) {
    throw new Error("You are not verified . Please verify your email");
  }

  const is_pass_matched = await compare_bcrypt_pass(
    user?.password,
    payload.password
  );
  if (!is_pass_matched) {
    throw new Error("Incorrect password");
  }

  const user_info = {
    email: user.email,
    role: user.role,
    registration_number: user?.registration_number,
  };

  const access_token = jwt.sign(
    user_info,
    config.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: config.ACCESS_TOKEN_TIME,
    } as SignOptions
  );
  const refresh_token = jwt.sign(
    user_info,
    config.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: config.REFRESH_TOKEN_TIME,
    } as SignOptions
  );

  return {
    access_token,
    refresh_token,
  };
};

const create_reset_link = async (payload: Partial<TAuth>) => {
  const user = await UserModel.is_user_exist_by_email(payload.email as string);
  if (!user) {
    throw new Error("No user found with this email");
  }

  if (user?.status === "blocked") {
    throw new Error("Your account has been blocked. Please contact support");
  }
  if (user?.is_email_verified === false) {
    throw new Error("You are not verified . Please verify your email");
  }

  const user_info = {
    email: user.email,
    role: user.role,
    registration_number: user?.registration_number,
  };

  const reset_token = jwt.sign(
    user_info,
    config.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "4s",
    }
  );

  const reset_link = `${config.RESET_PASSWORD_UI_DOMAIN}?email=${user?.email}&&token=${reset_token}`;

 await send_reset_password_mail(reset_link,user?.email);
};

export const auth_services = {
  login_with_email_and_password,
  create_reset_link,
};
