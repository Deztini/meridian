import { useMutation } from "@tanstack/react-query";
import { LoginPayload } from "../types";
import { login } from "../services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      toast.success(data.message ?? "Login successful");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
