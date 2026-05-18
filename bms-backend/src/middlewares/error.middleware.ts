import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log("GLOBAL ERROR:", err);

  let statusCode = err.status || err.statusCode || 500;

  let message = err.message || "Something went wrong!";

  let error: { field?: string; message: string }[] = [];

  // Zod Error
  if (err instanceof ZodError) {
    statusCode = 400;

    message = "Validation Error";

    error = err.errors.map((e: any) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: err.stack,
  });
};