import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../services/invoice.service";

export function useInvoice() {
  return useQuery({
    queryKey: ["invoice"],
    queryFn: getInvoices,
  });
}
