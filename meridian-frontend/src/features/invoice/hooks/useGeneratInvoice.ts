import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { generateInvoice } from "../services/invoice.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useGenerateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateInvoice,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
