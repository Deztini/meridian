import { useMutation } from "@tanstack/react-query";
import { LoginPayload } from "../types";
import { login } from "../services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";
import { useAuthStore } from "@/stores/auth-store";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      setAuth(data.data.accessToken, data.data.user);
      toast.success(data.message ?? "Login successful");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
