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

const REFRESH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = await authService.signup(req.body);

      if (token) {
        res.cookie("verificationToken", token, VERIFY_COOKIE_OPTIONS);
      }

      return new ApiResponse(
        200,
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

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.verificationToken;

      if (!token) {
        throw ApiError.unauthorized("Verification session expired");
      }

      await authService.resendOtp(token);

      return new ApiResponse(200, "A new verification code has been sent").send(
        res,
      );
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken, user } = await authService.login(
        req.body,
      );

      res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

      return new ApiResponse(200, "Login successful", {
        accessToken,
        user,
      }).send(res);
    } catch (err) {
      next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refreshToken;
      const { accessToken, refreshToken } = await authService.refresh(token);

      res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

      return new ApiResponse(200, "Token refreshed", {
        accessToken,
      }).send(res);
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refreshToken;
      await authService.logout(token);

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: "lax",
      });

      return new ApiResponse(200, "Logged out successfully").send(res);
    } catch (err) {
      next(err);
    }
  },
};
