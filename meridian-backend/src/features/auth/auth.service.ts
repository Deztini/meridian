import { sendOtpEmail } from "../../lib/mailer";
import {
  signVerificationToken,
  verifyVerificationToken,
} from "../../lib/token";
import { generateOtp } from "../../utils/generateOtp";
import { User } from "./auth.model";
import { Otp } from "./auth.otp.model";
import type { SignupInput, VerifyOtpInput } from "./auth.validator";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcrypt";

export const authService = {
  async signup(input: SignupInput) {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      return;
    }

    const hashedPw = await bcrypt.hash(input.password, 12);

    const user = await User.create({
      email: input.email,
      fullName: input.fullName,
      password: hashedPw,
    });

    const otp = generateOtp();

    await Otp.create({
      userId: user._id.toString(),
      code: otp,
      purpose: "email_verification",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOtpEmail(input.email, otp);

    const token = signVerificationToken(user._id.toString());

    return { token };
  },

  async verifyOtp(input: VerifyOtpInput, token: string) {
    const result = verifyVerificationToken(token);
    const otpRecord = await Otp.findOne({ userId: result.userId });

    if (!otpRecord) {
      throw ApiError.badRequest("Invalid or expired verification code");
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ userId: result.userId });
      throw ApiError.badRequest("Verification code has expired");
    }

    if (otpRecord.code !== input.otp) {
      throw ApiError.badRequest("Incorrect verification code");
    }

    if (otpRecord.purpose === "email_verification") {
      await User.updateOne(
        { _id: result.userId },
        { $set: { isVerified: true } },
      );

      await Otp.deleteOne({ userId: result.userId });

      const user = await User.findOne({ _id: result.userId });

      return {
        user,
      };
    }
  },
};
