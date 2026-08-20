import { Router } from "express";
import { validate } from "../../middleware/validate";
import { loginSchema, signupSchema, verifyOtpSchema } from "./auth.validator";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", validate(signupSchema), authController.signup);

router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);

router.post("/resend-otp", validate(verifyOtpSchema), authController.resendOtp);

router.post("/login", validate(loginSchema), authController.login);

export default router;
