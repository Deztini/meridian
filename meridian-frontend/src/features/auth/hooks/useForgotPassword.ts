import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordPayload } from "../types";
import { forgotPassword } from "../services/auth.service";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  });
}
