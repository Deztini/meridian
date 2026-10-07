import { useMutation, useQueryClient } from "@tanstack/react-query";
import { simulateUsage } from "../services/dashboard.service";
import { SimulateUsagePayload } from "../types";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useSimulateUsage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SimulateUsagePayload) => simulateUsage(payload),
    onSuccess: (data) => {
      toast.message(data.message ?? "Events simulated");
      queryClient.invalidateQueries({queryKey: ["usage-summary"]})
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
