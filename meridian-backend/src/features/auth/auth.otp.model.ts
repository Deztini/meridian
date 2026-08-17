import mongoose, { Document, Types, Schema } from "mongoose";

export interface IOtp extends Document {
  userId: Types.ObjectId;
  code: string;
  purpose: "email_verification" | "password_reset";
  expiresAt: Date;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  code: {type: String, required: true},
  purpose: {type: String, enum: ["email_verification", "password_reset"], required: true},
  expiresAt: {type: Date, required: true},
  createdAt: {type: Date, default: Date.now}
});

OtpSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});


export const Otp = mongoose.model<IOtp>("Otp", OtpSchema);