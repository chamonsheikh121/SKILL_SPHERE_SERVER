import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { compare_bcrypt_pass } from "../../utils/compare_bcrypt_pass";
import UserModel from "../user/user.model";
import {
  TAuth,
  TAuthPayload,
  TChange_password,
  TReset_password,
} from "./auth.interface";
import config from "../../config";
import { send_reset_password_mail } from "../../utils/send_reset_mail";
import { verify_token_and_user } from "../../utils/verify_token";
import { bcrypt_pass } from "../../utils/bcrypt_password";
import { TUser } from "../user/user.interface";
import bcrypt from "bcrypt";
import { create_token_and_verify_email } from "../../utils/create_token_and_send_email_verification";

const login_with_email_and_password = async (payload: TAuth, base_url: string) => {
  const user = await UserModel.is_user_exist_by_email(payload.email);
  if (!user) {
    throw new Error("No user found with this email");
  }

  if (user?.status === "blocked") {
    throw new Error("Your account has been blocked. Please contact support");
  }
  if (user?.is_email_verified === false) {

    await create_token_and_verify_email(user?.email, base_url);
    throw new Error("You are not verified. We have sent a verification to your email. Please verify your email")

  }

  const is_pass_matched = await compare_bcrypt_pass(
    payload.password,
    user?.password
  );
  if (!is_pass_matched) {
    throw new Error("Incorrect password");
  }

  const auth_payload: TAuthPayload = {
    email: user?.email as string,
    role: user?.role as "student" | "admin" | "user",
    registration_number: user?.registration_number,
  };

  const access_token = jwt.sign(
    auth_payload,
    config.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: config.ACCESS_TOKEN_TIME,
    } as SignOptions
  );
  const refresh_token = jwt.sign(
    auth_payload,
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
const verify_email_into_db = async (email: string, token: string) => {
  const user = await UserModel.is_user_exist_by_email(email);
  if (!user) {
    throw new Error("No user found with this email");
  }

  if (user?.status === "blocked") {
    throw new Error("Your account has been blocked. Please contact support");
  }

  const decode = jwt.verify(
    token,
    config.VERIFICATION_TOKEN_SECRET as string
  ) as JwtPayload;

  if (!decode) {
    throw new Error("You are not Authorized user");
  }
  if (decode.email !== email) {
    throw new Error("You are not Authorized");
  }

  const result = await UserModel.findOneAndUpdate(
    {
      email,
    },
    {
      is_email_verified: true,
    },
    {
      new: true,
    }
  );
  return result;
};

const change_password_into_db = async (
  decode_user: TUser,
  payload: TChange_password
) => {
  console.log(decode_user);

  const is_pass_matched = await compare_bcrypt_pass(
    payload.old_password,
    decode_user.password
  );
  if (!is_pass_matched) {
    throw new Error("Incorrect password");
  }
  if (payload?.old_password == payload?.new_password) {
    throw new Error("Old password and new password can't be same ");
  }

  const bcrypt_new_password = await bcrypt.hash(
    payload?.new_password,
    Number(config.BCRYPT_SALT_ROUND)
  );

  console.log(bcrypt_new_password);

  const result = await UserModel.findOneAndUpdate(
    {
      email: decode_user?.email,
    },
    {
      password: bcrypt_new_password,
    },
    {
      new: true,
    }
  );
  return result;
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
      expiresIn: "10m",
    }
  );

  const reset_link = `${config.FRONTEND_UI_DOMAIN}?email=${user?.email}&&token=${reset_token}`;

  await send_reset_password_mail(reset_link, user?.email);

  return reset_link;
};
const reset_password_into_db = async (
  token: string,
  payload: TReset_password
) => {
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

  console.log(token);
  if (!verify_token_and_user(token, payload)) {
    throw new Error("Invalid user or expired token");
  }

  const bcrypt_password = await bcrypt_pass(payload.new_password);

  const result = await UserModel.findOneAndUpdate(
    { email: payload?.email },
    { password: bcrypt_password },
    { new: true }
  );

  return result;
};

export const auth_services = {
  login_with_email_and_password,
  change_password_into_db,
  create_reset_link,
  reset_password_into_db,
  verify_email_into_db,
};
