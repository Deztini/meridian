import { useMutation } from "@tanstack/react-query";
import { resendOtp, resendResetOtp } from "../services/auth.service";
import { OtpFlow } from "../types";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useResendOtp(flow: OtpFlow) {
  return useMutation({
    mutationFn: () =>
      flow === "reset-password" ? resendResetOtp() : resendOtp(),
    onSuccess: (data) => {
      toast.success(data.message ?? "OTP has been resent");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
