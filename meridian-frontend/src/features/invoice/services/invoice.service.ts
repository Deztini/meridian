import { apiClient } from "@/lib/api";
import { InvoiceResponse, InvoicesResponse} from "../types";

export async function getInvoices(): Promise<InvoicesResponse> {
  const { data } = await apiClient.get<InvoicesResponse>("/usage/invoices");
  return data;
}

export async function getInvoiceById(id: string): Promise<InvoiceResponse> {
  const { data } = await apiClient.get<InvoiceResponse>(`/usage/invoices/${id}`);
  return data;
}
