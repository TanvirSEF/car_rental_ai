"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

/**
 * Revenue analytics line chart (Figma: Sales Analytics —
 * orange #ff9f43 line with dots, light grid, month labels).
 */

interface RevenuePoint {
  month: string
  revenue: number
  bookings: number
}

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">Revenue Analytics</h2>
        <span className="rounded border border-line px-3 py-1.5 text-sm text-ink-soft">
          This Year
        </span>
      </div>

      <div className="h-[262px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="#e9ecef" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#5b6670", fontSize: 13, fontFamily: "Nunito" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#5b6670", fontSize: 13, fontFamily: "Nunito" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${v / 1000}k`}
              width={52}
            />
            <Tooltip
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
              labelStyle={{ fontFamily: "Nunito", color: "#212b36" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e6eaed",
                fontFamily: "Nunito",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#ff9f43"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#ff9f43", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
