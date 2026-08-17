import crypto from "crypto";

export function generateOtp(): string {
  return crypto.randomInt(0, 10000).toString().padStart(4, "0");
}
