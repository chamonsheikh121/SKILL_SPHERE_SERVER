import { NextFunction, Request, Response } from "express";
import { catch_async } from "./catch_async";
import { verify } from "crypto";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../modules/user/user.model";
import { TUser } from "../modules/user/user.interface";

export const authorizer = () => {
  return catch_async(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1] as string;
      if (!token) {
        throw new Error("You are not authorized user");
      }

      const decode = jwt.verify(
        token,
        config.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      if (!decode) {
        throw new Error("You are not Authorized user");
      }
    //   console.log(decode);

      const user = await UserModel.is_user_exist_by_email(
        decode.email as string
      );
     
      if (!user) {
        throw new Error("No user found with this email");
      }

      if (user?.status === "blocked") {
        throw new Error(
          "Your account has been blocked. Please contact support"
        );
      }
      if (user?.is_email_verified === false) {
        throw new Error("You are not verified . Please verify your email");
      }

      req.user = user as TUser

      next()

    }
  );
};
