"use client";

import { useParams } from "next/navigation";
import { useInvoice } from "../hooks/useInvoice";
import {
  formatPeriod,
  formatter,
} from "@/features/dashboard/utils/dateFormatter";
import { Dot } from "lucide-react";

export function InvoiceSummary() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError } = useInvoice(id);
  const invoice = data?.data?.invoice;
  if (isPending) return <p className="text-gray-500">Loading...</p>;
  if (isError || !invoice) return <p>Invoice not found.</p>;
  const rows = [
    {
      label: "Period",
      value: formatPeriod(
        invoice.periodStart as string,
        invoice.periodStart as string,
      ),
    },
    { label: "Usage", value: `${invoice.usageCount.toLocaleString()} calls` },
    { label: "Amount Due", value: `$${invoice.amountDue}` },
    {
      label: "Created",
      value: `${formatter(invoice.periodStart, { month: "short", day: "numeric" })}, ${formatter(invoice.periodEnd, { year: "numeric" })}`,
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-gray-500 font-mono text-[16px]">INVOICE</h1>
        <h2 className="text-xl font-mono">{`inv_${invoice.id}`}</h2>
      </div>

      <div className="mt-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between py-4 border-b mb-2 w-150"
          >
            <span className="font-sans text-gray-500 text-[14px]">
              {r.label}
            </span>
            <span className="font-sans text-[14px]">{r.value}</span>
          </div>
        ))}

        <div className="flex items-center justify-between py-4  mb-2 w-150">
          <span className="font-sans text-gray-500 text-[14px]">Status</span>
          <div className="flex items-center gap-2">
            <Dot
              className={`${invoice.status == "paid" ? "bg-black" : "bg-white border border-gray-400 "} rounded-full w-2 h-2  py-1 px-1 `}
            />
            <span className="text-gray-500 font-mono text-xs">
              {invoice.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
