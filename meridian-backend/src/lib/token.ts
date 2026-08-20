import jwt from "jsonwebtoken";
import { env } from "../config/env";

type VerificationPurpose =
  | "email_verification"
  | "password_reset"
  | "password_reset_authorized";

export function signVerificationToken(
  userId: string,
  purpose: VerificationPurpose,
) {
  return jwt.sign({ userId, purpose }, env.jwtVerifySecret, {
    expiresIn: "10m",
  });
}

export function verifyVerificationToken(token: string) {
  return jwt.verify(token, env.jwtVerifySecret) as {
    userId: string;
    purpose: string;
  };
}

export function signAccessToken(userId: string) {
  return jwt.sign({ userId }, env.jwtAccessSecret, { expiresIn: "15m" });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.jwtAccessSecret) as {
    userId: string;
  };
}

export function signRefreshToken(userId: string, sessionId: string) {
  return jwt.sign({ userId, sessionId }, env.jwtRefreshSecret, {
    expiresIn: "7d",
  });
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.jwtRefreshSecret) as {
    userId: string;
    sessionId: string;
  };
}
