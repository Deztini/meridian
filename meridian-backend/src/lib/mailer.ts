import { MailtrapClient } from "mailtrap";
import { env } from "../config/env";

const client = new MailtrapClient({
  token: env.mailtrap.token!,
});

const sender = {
  email: env.mailtrap.fromEmail!,
  name: env.mailtrap.fromName!,
};

export async function sendOtpEmail(to: string, otp: string) {
  await client.send({
    from: sender,
    to: [{ email: to }],
    subject: "",
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
    category: "OTP Verification",
  });
}
