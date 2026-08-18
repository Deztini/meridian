import crypto from "crypto";

export function generateOtp(): string {
  return crypto.randomInt(0, 10000).toString().padStart(6, "0");
}
