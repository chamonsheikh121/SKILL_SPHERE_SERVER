import { NextFunction, Request, Response } from "express";

export const request_data_parser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("from data parser and before paring");

  if (req?.body?.data) {
    req.body = JSON.parse(req?.body?.data);

    console.log("from data parser and after paring");
  }
  next();
};
