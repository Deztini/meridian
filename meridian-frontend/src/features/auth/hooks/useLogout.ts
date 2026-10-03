import { useMutation } from "@tanstack/react-query";

import { logout } from "../services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";
import { useAuthStore } from "@/stores/auth-store";

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      clearAuth();
      toast.success(data.message ?? "Logout successful");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
