import { useMutation } from "@tanstack/react-query";
import { ResetPasswordPayload } from "../types";
import { resetPassword } from "../services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: (data) => {
      toast.success(
        data.message ?? "Your password has been reset successfully",
      );
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
