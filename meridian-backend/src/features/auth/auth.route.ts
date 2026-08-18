import { Router } from "express";
import { validate } from "../../middleware/validate";
import { signupSchema, verifyOtpSchema } from "./auth.validator";
import { authController } from "./auth.controller";

const router = Router();


router.post("/signup", validate(signupSchema), authController.signup);

router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);


export default router;