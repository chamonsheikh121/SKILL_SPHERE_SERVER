import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TAuthPayload, TReset_password } from "../modules/auth/auth.interface";

export const verify_token_and_user = (token: string, payload:TReset_password) => {
  const decoded: string | JwtPayload = jwt.verify(
    token,
    config.ACCESS_TOKEN_SECRET as string
  );

  if (typeof decoded === "string") {
    return false;
  }
  const is_valid =
    decoded.email == payload.email;

  return is_valid;
};
