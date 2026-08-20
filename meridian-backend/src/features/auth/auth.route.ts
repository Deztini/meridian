import { Router } from "express";
import { validate } from "../../middleware/validate";
import { forgotPasswordSchema, loginSchema, resetPasswordSchema, signupSchema, verifyOtpSchema } from "./auth.validator";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", validate(signupSchema), authController.signup);

router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);

router.post("/resend-otp",  authController.resendOtp);

router.post("/login", validate(loginSchema), authController.login);

router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);

router.post("/verify-reset-otp", validate(verifyOtpSchema), authController.verifyResetOtp);

router.post("/resend-reset-otp",  authController.resendResetOtp);

router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);

router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

export default router;
