import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyAccessToken } from "../lib/token";
import { User } from "../features/auth/auth.model";


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

    const payload = verifyAccessToken(token) 

    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      throw ApiError.unauthorized("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
