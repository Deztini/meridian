import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    const message = err.issues.map((issue) => issue.message).join(",");
    return res.status(400).json({
      success: false,
      message,
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again.",
  });
}
