import { useMutation } from "@tanstack/react-query";
import { SignupPayload } from "../types";
import { signup } from "../services/auth.service";

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
  });
}
