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
      if (existingUser.isVerified) {
        return { token: null };
      }
      await Otp.deleteOne({
        userId: existingUser._id,
        purpose: "email_verification",
      });

      const otp = generateOtp();
      await Otp.create({
        userId: existingUser._id,
        code: otp,
        purpose: "email_verification",
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });

      await sendOtpEmail(existingUser.email, otp);

      const token = signVerificationToken(existingUser._id.toString());
      return { token };
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
    let result;

    try {
      result = verifyVerificationToken(token);
    } catch {
      throw ApiError.unauthorized("Verification session expired");
    }

    const otpRecord = await Otp.findOne({
      userId: result.userId,
      purpose: "email_verification",
    });

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

    const user = await User.findOneAndUpdate(
      { _id: result.userId },
      { $set: { isVerified: true } },
      { $new: true },
    );

    await Otp.deleteOne({ userId: result.userId });

    return {
      user,
    };
  },

  async resendOtp(token: string) {
    let result;

    try {
      result = verifyVerificationToken(token);
    } catch {
      throw ApiError.unauthorized("Verification session expired");
    }

    const user = await User.findById(result.userId);

    if (!user) {
      throw ApiError.unauthorized("Verification session expired");
    }

    if (user.isVerified) {
      throw ApiError.badRequest("This account is already verified");
    }

    const recentOtp = await Otp.findOne({
      userId: user._id,
      purpose: "email_verification",
    });
    if (recentOtp && recentOtp.createdAt.getTime() > Date.now() - 60 * 1000) {
      throw ApiError.badRequest(
        "Please wait a minute before requesting another code",
      );
    }

    await Otp.deleteOne({ userId: user._id, purpose: "email_verification" });

    const otp = generateOtp();

    await Otp.create({
      userId: user._id.toString(),
      code: otp,
      purpose: "email_verification",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOtpEmail(user.email, otp);
  },
};
