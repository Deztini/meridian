import { sendOtpEmail } from "../../lib/mailer";
import { generateOtp } from "../../utils/generateOtp";
import { User } from "./auth.model";
import { Otp } from "./auth.otp.model";
import type { SignupInput } from "./auth.validator";
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
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })

    await sendOtpEmail(input.email, otp);
  },
};
