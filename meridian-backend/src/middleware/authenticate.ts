import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyAccessToken } from "../lib/token";
import { User } from "../features/auth/auth.model";
import jwt from "jsonwebtoken";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw ApiError.unauthorized("No token provided");
    }
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw ApiError.unauthorized("Invalid authorization header");
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw ApiError.unauthorized("Access token expired");
      }
      if (err instanceof jwt.JsonWebTokenError) {
        throw ApiError.unauthorized("Invalid access token");
      }
      throw err;
    }

    const user = await User.findById(payload?.userId).select("-password");

    if (!user) {
      throw ApiError.unauthorized("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
