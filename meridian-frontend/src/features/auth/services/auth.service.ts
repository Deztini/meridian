import { apiClient } from "@/lib/api";
import { SignupPayload, SignupResponse } from "../types";

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const { data } = await apiClient.post<SignupResponse>(
    "/auth/signup",
    payload,
  );
  return data;
}
