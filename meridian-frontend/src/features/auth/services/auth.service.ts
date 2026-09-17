import { apiClient } from "@/lib/api";
import {
  SignupPayload,
  GenericResponse,
  VerifyPayload,
  VerifyResponse,
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  
} from "../types";

export async function signup(payload: SignupPayload): Promise<GenericResponse> {
  const { data } = await apiClient.post<GenericResponse>(
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

export async function resendOtp(): Promise<GenericResponse> {
  const { data } = await apiClient.post<GenericResponse>("/auth/resend-otp");
  return data;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<GenericResponse> {
  const { data } = await apiClient.post<GenericResponse>(
    "/auth/forgot-password",
    payload,
  );
  return data;
}

export async function verifyResetOtp(
  payload: VerifyPayload,
): Promise<GenericResponse> {
  const { data } = await apiClient.post<GenericResponse>(
    "/auth/verify-reset-otp",
    payload,
  );
  return data;
}

export async function resendResetOtp(): Promise<GenericResponse> {
  const { data } = await apiClient.post<GenericResponse>(
    "/auth/resend-reset-otp",
  );
  return data;
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<GenericResponse> {
  const { data } = await apiClient.post<GenericResponse>(
    "/auth/reset-password",
    payload
  );
  return data;
}

