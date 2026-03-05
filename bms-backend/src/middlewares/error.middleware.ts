// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod"; // ✅ ye import missing tha

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default Response
  let statusCode = 500;
  let message = "Something went wrong!";
  let error: { field?: string; message: string }[] = [];

  // ✅ Zod Error Handling
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    error = err.errors.map((e: any) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  } else if (err instanceof Error) {
    message = err.message;
  }

  // ✅ Always send a proper JSON response
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
