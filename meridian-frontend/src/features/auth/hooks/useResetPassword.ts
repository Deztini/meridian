import { useMutation } from "@tanstack/react-query";
import { ResetPasswordPayload } from "../types";
import { resetPassword } from "../services/auth.service";

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
  });
}
