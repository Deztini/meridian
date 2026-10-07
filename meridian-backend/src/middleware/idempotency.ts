import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function requireIdempotencyKey(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const key = req.headers["idempotency-key"];
  console.log("hello");
  console.log("key", key);

  if (!key || typeof key !== "string") {
    throw ApiError.badRequest("Idempotency-key header is required");
  }

  req.idempotencyKey = key;
  next();
}
