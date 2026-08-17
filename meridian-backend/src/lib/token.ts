import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signVerificationToken(userId: string) {
  return jwt.sign(
    { userId, purpose: "email_verification" },
    env.jwtVerifySecret,
    { expiresIn: "10m" },
  );
}

export function verifyVerificationToken(token: string) {
  return jwt.verify(token, env.jwtVerifySecret) as {
    userId: string;
    purpose: string;
  };
}
