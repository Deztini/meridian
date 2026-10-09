import { apiClient } from "@/lib/api";
import { InvoiceResponse } from "../types";

export async function getInvoices(): Promise<InvoiceResponse> {
  const { data } = await apiClient.get<InvoiceResponse>("/usage/invoices");
  return data;
}
