import { InvoiceSummary } from "@/features/invoice/components/invoice-summary";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function InvoiceDetailPage() {
  return (
    <div className="bg-gray-100 min-h-screen px-15 py-10">
        <Link
          href="/invoice"
          className="flex items-center gap-4 text-muted-foreground hover:text-foreground cursor-pointer text-[13px] mb-11"
        >
          <ArrowLeft />
          <h1>Back to invoices</h1>
        </Link>
      <InvoiceSummary />
    </div>
  );
}