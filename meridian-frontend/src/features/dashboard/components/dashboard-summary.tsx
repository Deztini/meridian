"use client";

import { useUsageSummary } from "../hooks/useUsageSummary";
import { formatPeriod } from "../utils/dateFormatter";

export function DashboardSummary() {
  const { data, isPending, error } = useUsageSummary();
  const summary = data?.data?.summary;
  return (
    <div className="py-10 px-22">
      <span className="font-sans text-gray-400 text-[15px]">
        {summary && formatPeriod(summary.periodStart, summary.periodEnd)}
      </span>
      <div className="flex items-center  gap-100">
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="font-sans text-xs text-gray-600">
            CURRENT PERIOD ESTIMATE
          </h1>
          <h2 className="font-heading text-7xl">
            ${summary && summary?.total.toFixed(2)}
          </h2>
          <div className="flex items-center gap-2 mt-4">
            <span className="font-sans">
              {summary && `${summary.usageCount.toLocaleString("en-US")}  `}
            </span>
            <span className="font-sans text-gray-400">
              {summary && `/  ${summary.includedUnits.toLocaleString("en-US")}`}
            </span>
            <span className="font-sans text-gray-400">API calls</span>
            <span className="font-sans text-blue-500 text-xs">
              {summary && `+${summary.overageCharge.toFixed(2)} overage`}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-35 ">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[16px] text-muted-foreground">
                Included units
              </span>
              <span className="font-sans text-[16px] text-muted-foreground">
                Usage this period
              </span>
              <span className="font-sans text-[16px] text-muted-foreground">
                Overage units
              </span>
              <span className="font-sans text-[16px] text-muted-foreground">
                Overage charge
              </span>
              <span className="font-sans text-[16px] text-muted-foreground">
                Platform fee
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[16px] text-right">
                {summary && summary.includedUnits.toLocaleString("en-US")}
              </span>
              <span className="font-sans text-[16px] text-right">
                {summary && summary.usageCount.toLocaleString("en-US")}
              </span>
              <span className="font-sans text-[16px] text-right">
                {summary && summary.overageUnits.toLocaleString("en-US")}
              </span>
              <span className="font-sans text-[16px] text-right">
                {summary && `$${summary.overageCharge.toFixed(2)}`}
              </span>
              <span className="font-sans text-[16px] text-right">
                {summary && `$${summary.platformFee.toFixed(2)}`}
              </span>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex items-center gap-38">
            <span className="font-sans text-[16px]">Total(estimated)</span>
            <span className="font-sans text-[16px] text-right">
              {summary && `$${summary.total.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 mt-10" />
    </div>
  );
}
