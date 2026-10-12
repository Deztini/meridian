import { useQuery } from "@tanstack/react-query";
import { getInvoiceById } from "../services/invoice.service";

export function useInvoice(id: string) {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id
  });
}