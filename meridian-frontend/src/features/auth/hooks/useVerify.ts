import { useMutation } from "@tanstack/react-query";
import { OtpFlow, VerifyPayload } from "../types";
import { verify, verifyResetOtp } from "../services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useVerify(flow: OtpFlow) {
  return useMutation({
    mutationFn: (payload: VerifyPayload) =>
      flow === "reset-password" ? verifyResetOtp(payload) : verify(payload),
    onSuccess: (data) => {
      toast.success(data.message ?? "Verification successful");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
