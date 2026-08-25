import { useMutation } from "@tanstack/react-query";
import { VerifyPayload } from "../types";
import { verify } from "../services/auth.service";

export function useVerify() {
  return useMutation({
    mutationFn: (payload: VerifyPayload) => verify(payload),
  });
}
