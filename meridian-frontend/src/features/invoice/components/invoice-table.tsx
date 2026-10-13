"use client";

import {
  formatPeriod,
  formatter,
} from "@/features/dashboard/utils/dateFormatter";
import { useInvoices } from "../hooks/useInvoices";
import { ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export function InvoiceTable() {
  const { data, isPending, isError } = useInvoices();
  return (
    <div className="my-10 overflow-hidden rounded border border-gray-200 bg-gray-100">
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
          {isPending ? (
            Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className="divide-x divide-gray-200">
                <td className="py-3 px-5">
                  <Skeleton className="h-4 w-26 bg-gray-200 rounded" />
                </td>
                <td className="text-gray-400 font-sans text-left py-3 px-5 text-xs">
                  <Skeleton className="h-4 w-26 bg-gray-200 rounded" />
                </td>
                <td className="font-sans text-left py-3 px-5 text-xs font-semibold">
                  <Skeleton className="h-4 w-26 bg-gray-200 rounded" />
                </td>
                <td className=" text-left py-3 px-5 flex items-center gap-2">
                  <Skeleton className="h-4 w-26 bg-gray-200 rounded" />
                </td>
                <td className="text-gray-400 font-sans text-left py-3 px-5 text-xs">
                  <Skeleton className="h-4 w-26 bg-gray-200 rounded" />
                </td>
                <td className="px-4"></td>
              </tr>
            ))
          ) : isError ? (
            <tr>
              <td colSpan={6} className="py-6 text-center text-[16px] text-red-500">
                Couldn&apos;t load invoices
              </td>
            </tr>
          ) : data.data?.invoices.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-6 text-center text-xl text-red-500">
                No invoices yet
              </td>
            </tr>
          ) : (
            data?.data?.invoices.map((inv) => (
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
                  {`${formatter(inv.periodStart, {
                    month: "short",
                    day: "numeric",
                  })}, ${formatter(inv.periodEnd, {year: "numeric"})}`}
                </td>
                <td className="cursor-pointer text-gray-400 px-4">
                  <Link href={`/invoice/${inv.id}`}>
                    <ChevronRight size={14} />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
