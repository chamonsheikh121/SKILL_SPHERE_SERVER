import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import  HttpStatus  from "http-status";
import config from "../config";


export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const global_error_handler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(" Error caught by global handler:", error);

  let statusCode = HttpStatus.BAD_REQUEST;
  let message = "Something went wrong!";
  let errors: any = [];


  if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    errors = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  else if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid input data";
    errors = Object.values((error as mongoose.Error.ValidationError).errors).map(
      (el: any) => ({
        path: el.path,
        message: el.message,
      })
    );
  }


  else if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
  }

 
  else if (error instanceof AppError) {
    statusCode = HttpStatus.BAD_REQUEST;
    message = error.message;
  }

  else if ((error as any).code === 11000) {
    statusCode = 400;
    const field = Object.keys((error as any).keyValue)[0];
    message = `Duplicate value for field: ${field}`;
  }

 
  else {
    message = error.message || "Internal server error";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length ? errors : undefined,
    stack: config.NODE_DEV === "development" ? error.stack : undefined,
  });
};
