export interface InvoiceItem {
  id: string;
  customerId: string;
  periodStart: string;
  periodEnd: string;
  usageCount: number;
  amountDue: string;
  status: string;
  createdAt: string;
}

export interface InvoiceResponse {
  success: boolean;
  message: string;
  data?: {
    invoices: InvoiceItem[];
  };
}
