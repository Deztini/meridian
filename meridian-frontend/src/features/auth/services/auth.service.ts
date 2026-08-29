import { apiClient } from "@/lib/api";
import {
  SignupPayload,
  SignupResponse,
  VerifyPayload,
  VerifyResponse,
  ResendOtpResponse,
} from "../types";

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const { data } = await apiClient.post<SignupResponse>(
    "/auth/signup",
    payload,
  );
  return data;
}

export async function verify(payload: VerifyPayload): Promise<VerifyResponse> {
  const { data } = await apiClient.post<VerifyResponse>(
    "/auth/verify-otp",
    payload,
  );
  return data;
}

export async function resendOtp(): Promise<ResendOtpResponse> {
  const { data } = await apiClient.post<ResendOtpResponse>("/auth/resend-otp");
  return data;
}
