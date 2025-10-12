import { ErrorRequestHandler } from "express";

export const global_error_handler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(400).send({
    success: false,
    message: error.message,
    error
  });
};
