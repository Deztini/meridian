import { useMutation, useQueryClient } from "@tanstack/react-query";
import { simulateUsage } from "../services/dashboard.service";
import { SimulateUsagePayload } from "../types";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useSimulateUsage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SimulateUsagePayload) => simulateUsage(payload),
    onSuccess: async (data) => {
      toast.message(data.message ?? "Events simulated");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["usage-summary"] }),
        queryClient.invalidateQueries({ queryKey: ["usage-activity"] }),
      ]);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
