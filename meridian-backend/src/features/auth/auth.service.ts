import { sendOtpEmail } from "../../lib/mailer";
import {
  signAccessToken,
  signRefreshToken,
  signVerificationToken,
  verifyRefreshToken,
  verifyVerificationToken,
} from "../../lib/token";
import { generateOtp } from "../../utils/generateOtp";
import { User } from "./auth.model";
import { Otp } from "./auth.otp.model";
import type { LoginInput, SignupInput, VerifyOtpInput } from "./auth.validator";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Session } from "./auth.session.model";

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

  async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email });
    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }
    if (!user.isVerified) {
      throw ApiError.unauthorized("Please verify your email before logging in");
    }

    const passwordMatches = await bcrypt.compare(input.password, user.password);

    if (!passwordMatches) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const session = await Session.create({
      userId: user._id,
      refreshTokenHash: "pending",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const refreshToken = signRefreshToken(
      user._id.toString(),
      session._id.toString(),
    );
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    session.refreshTokenHash = refreshTokenHash;

    await session.save();

    const accessToken = signAccessToken(user._id.toString());

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    };
  },

  async refresh(incomingToken: string) {
    if (!incomingToken) {
      throw ApiError.unauthorized("No refresh token provided");
    }

    let decoded;

    try {
      decoded = verifyRefreshToken(incomingToken);
    } catch {
      throw ApiError.unauthorized("Verification session expired");
    }

    const session = await Session.findById(decoded.sessionId);

    if (!session) {
      await Session.deleteMany({ userId: decoded.userId });
      throw ApiError.unauthorized("Session invalid. Please log in again.");
    }

    const incomingHash = crypto
      .createHash("sha256")
      .update(incomingToken)
      .digest("hex");

    if (incomingHash !== session.refreshTokenHash) {
      await Session.deleteMany({ userId: decoded.userId });
      throw ApiError.unauthorized("Session invalid. Please log in again.");
    }

    await Session.deleteOne({ _id: session._id });

    const newSession = await Session.create({
      userId: session.userId.toString(),
      refreshTokenHash: "pending",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const newRefreshToken = signRefreshToken(
      session.userId.toString(),
      newSession._id.toString(),
    );
    newSession.refreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");
    await newSession.save();

    const newAccessToken = signAccessToken(session.userId.toString());

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },

  async logout(incomingToken: string) {
    if (!incomingToken) return;

    let decoded;

    try {
      decoded = verifyRefreshToken(incomingToken);
    } catch {
      throw ApiError.unauthorized("Verification session expired");
    }

    await Session.deleteOne({ _id: decoded.sessionId });
  },
};
