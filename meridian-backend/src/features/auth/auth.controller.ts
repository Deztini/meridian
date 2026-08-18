import type { Request, Response, NextFunction, CookieOptions } from "express";
import { authService } from "./auth.service";
import { env } from "../../config/env";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";

const VERIFY_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax",
  maxAge: 10 * 60 * 1000,
};

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.signup(req.body);

      if (result?.token) {
        res.cookie("verificationToken", result.token, VERIFY_COOKIE_OPTIONS);
      }

      return new ApiResponse(
        201,
        "If this email is valid, a verification code has been sent",
      ).send(res);
    } catch (err) {
      next(err);
    }
  },

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.verificationToken;

      if (!token) {
        throw ApiError.unauthorized("Verification session expired");
      }
      const { user } = await authService.verifyOtp(req.body, token);

      res.clearCookie("verificationToken", {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: "lax",
      });

      return new ApiResponse(200, "Email verified successfully", {
        user: {
          id: user?._id,
          email: user?.email,
          fullName: user?.fullName,
        },
      }).send(res);
    } catch (err) {
      next(err);
    }
  },
};
