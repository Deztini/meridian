import { useMutation } from "@tanstack/react-query";
import { resendOtp, resendResetOtp } from "../services/auth.service";
import { OtpFlow } from "../types";

export function useResendOtp(flow: OtpFlow) {
  return useMutation({
    mutationFn: () =>
      flow === "reset-password" ? resendResetOtp() : resendOtp(),
  });
}
