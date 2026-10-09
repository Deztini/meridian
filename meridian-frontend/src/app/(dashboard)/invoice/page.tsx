import { InvoiceHeader } from "@/features/invoice/components/invoice-header";
import { InvoiceTable } from "@/features/invoice/components/invoice-table";

export default function InvoicePage() {
  return (
    <div className="bg-gray-100 min-h-screen px-15 py-10">
      <InvoiceHeader />
      <InvoiceTable />
    </div>
  );
}