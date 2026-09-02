import { apiClient } from "@/lib/api";
import {
  SignupPayload,
  SignupResponse,
  VerifyPayload,
  VerifyResponse,
  ResendOtpResponse,
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
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

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> {
  const { data } = await apiClient.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    payload,
  );
  return data;
}

export async function verifyResetOtp(
  payload: VerifyPayload,
): Promise<ResendOtpResponse> {
  const { data } = await apiClient.post<ResendOtpResponse>(
    "/auth/verify-reset-otp",
    payload,
  );
  return data;
}

export async function resendResetOtp(): Promise<ResendOtpResponse> {
  const { data } = await apiClient.post<ResendOtpResponse>(
    "/auth/resend-reset-otp",
  );
  return data;
}
