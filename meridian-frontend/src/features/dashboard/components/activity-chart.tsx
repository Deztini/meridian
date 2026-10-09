"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUsageActivity } from "../hooks/useUsageActivity";
import { formatTime } from "../utils/dateFormatter";

export function ActivityChart() {
  const { data = [] } = useUsageActivity();

  return (
    <>
      <div className="h-64 w-full mb-25 mt-20 px-10">
        <h1 className="text-muted-foreground font-sans text-xs mb-8 ml-8">
          ACTIVITY
        </h1>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F62FE" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#0F62FE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="2 4"
            />
            <XAxis
              dataKey="time"
              tickFormatter={formatTime}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip
              cursor={{ stroke: "#d1d5db" }}
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="rounded border bg-white px-3 py-2 font-mono text-xs shadow-sm">
                    <div className="text-gray-500">
                      {formatTime(payload[0].payload.time)}
                    </div>
                    <div className="font-semibold">
                      {payload[0].value} calls
                    </div>
                  </div>
                ) : null
              }
            />
            <Area
              type="monotone"
              dataKey="calls"
              stroke="#0F62FE"
              strokeWidth={1.5}
              fill="url(#fill)"
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <hr className="border-t border-gray-300 my-15 mx-18" />
    </>
  );
}
