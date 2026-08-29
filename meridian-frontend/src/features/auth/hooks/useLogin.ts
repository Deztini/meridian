import { useMutation } from "@tanstack/react-query";
import { LoginPayload } from "../types";
import { login } from "../services/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}
