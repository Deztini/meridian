"use client";

import {
  formatPeriod,
  formatter,
} from "@/features/dashboard/utils/dateFormatter";
import { useInvoice } from "../hooks/useInvoice";
import { ChevronRight, Dot } from "lucide-react";

export function InvoiceTable() {
  const { data } = useInvoice();
  return (
    <div className="my-20 overflow-hidden rounded border border-gray-200 bg-gray-100">
      <table className="w-full border-collapse">
        <thead>
          <tr className="divide-x divide-gray-300 border-b border-gray-300">
            <th className="font-sans text-left py-3 px-5 text-gray-400 text-xs">
              PERIOD
            </th>
            <th className="font-sans text-left py-3 px-5 text-gray-400 text-xs">
              USAGE
            </th>
            <th className="font-sans text-left py-3 px-5 text-gray-400 text-xs">
              AMOUNT DUE
            </th>
            <th className="font-sans text-left py-3 px-5 text-gray-400 text-xs">
              STATUS
            </th>
            <th className="font-sans text-left py-3 px-5 text-gray-400 text-xs">
              CREATED
            </th>
            <th className="w-1/25"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data?.data?.invoices.map((inv) => (
            <tr key={inv.id} className="divide-x divide-gray-200">
              <td className="font-sans text-left py-3 px-5 text-xs">
                {formatPeriod(inv.periodStart, inv.periodEnd)}
              </td>
              <td className="text-gray-400 font-sans text-left py-3 px-5 text-xs">
                {inv.usageCount.toLocaleString()}
              </td>
              <td className="font-sans text-left py-3 px-5 text-xs font-semibold">
                ${inv.amountDue}
              </td>
              <td className=" text-left py-3 px-5 flex items-center gap-2">
                <Dot
                  className={`${inv.status == "paid" ? "bg-black" : "bg-white border border-gray-400 "} rounded-full w-2 h-2  py-1 px-1 `}
                />
                <span className="text-gray-400 font-mono text-xs">
                  {inv.status.toUpperCase()}
                </span>
              </td>
              <td className="text-gray-400 font-sans text-left py-3 px-5 text-xs">
                {formatter(inv.periodStart, { month: "short", day: "numeric" })}
              </td>
              <td className="cursor-pointer text-gray-400 px-4">
                <ChevronRight size={14} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
