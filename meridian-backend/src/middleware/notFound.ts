import type { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export function notFound(req: Request, res: Response) {
  const error = ApiError.notFound(`Route not found: ${req.originalUrl}`);
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
}
