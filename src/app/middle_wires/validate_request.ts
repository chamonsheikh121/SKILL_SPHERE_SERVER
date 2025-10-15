import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";
import { catch_async } from "../utils/catch_async";

export const validate_request = (schema: ZodTypeAny) => {
  return catch_async(
    async (req: Request, res: Response, next: NextFunction) => {

      console.log(req.body);

      await schema.parseAsync({
        body: req.body,
      });
      next();
    }
  );
};
