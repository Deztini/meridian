import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordPayload } from "../types";
import { forgotPassword } from "../services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
    onSuccess: (data) => {
      toast.success(
        data.message ?? "A verification code has been sent to your email",
      );
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
