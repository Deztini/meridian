import { useMutation } from "@tanstack/react-query";
import { generateInvoice } from "../services/invoice.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-api-error";

export function useGenerateInvoice() {
  return useMutation({
    mutationFn: generateInvoice,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
