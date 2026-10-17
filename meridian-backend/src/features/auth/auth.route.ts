import { Router } from "express";
import { validate } from "../../middleware/validate";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyOtpSchema,
} from "./auth.validator";
import { authController } from "./auth.controller";
import { rateLimit } from "../../middleware/rateLimit";

const router = Router();

router.post("/signup", validate(signupSchema), authController.signup);

router.post("/verify-otp", rateLimit({ name: "verify", limit: 10, windowSec: 600 }), validate(verifyOtpSchema), authController.verifyOtp);

router.post("/resend-otp", rateLimit({ name: "verify", limit: 10, windowSec: 600 }), authController.resendOtp);

router.post(
  "/login",
  rateLimit({
    name: "login",
    limit: 5,
    windowSec: 900,
    keyFn: (req) => `${req.ip}:${String(req.body?.email ?? "").toLowerCase()}`,
  }),
  validate(loginSchema),
  authController.login,
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword,
);

router.post(
  "/verify-reset-otp",
  rateLimit({ name: "verify", limit: 10, windowSec: 600 }),
  validate(verifyOtpSchema),
  authController.verifyResetOtp,
);

router.post("/resend-reset-otp", rateLimit({ name: "verify", limit: 10, windowSec: 600 }),  authController.resendResetOtp);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword,
);

router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

export default router;
