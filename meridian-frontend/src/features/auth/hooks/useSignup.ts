import { useMutation } from "@tanstack/react-query";
import { SignupPayload } from "../types";
import { signup } from "../services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onSuccess: (data) => {
      toast.success(
        data.message ?? "Account created successfully - check your email",
      );
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
