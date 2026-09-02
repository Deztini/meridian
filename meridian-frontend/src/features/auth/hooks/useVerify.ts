import { useMutation } from "@tanstack/react-query";
import { OtpFlow, VerifyPayload } from "../types";
import { verify, verifyResetOtp } from "../services/auth.service";

export function useVerify(flow: OtpFlow) {
  return useMutation({
    mutationFn: (payload: VerifyPayload) =>
      flow === "reset-password" ? verifyResetOtp(payload) : verify(payload),
  });
}
