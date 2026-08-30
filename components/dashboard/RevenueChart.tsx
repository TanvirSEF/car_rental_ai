"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface RevenuePoint {
  month: string
  revenue: number
  bookings: number
}

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">Sales Analytics</h2>
        <span className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft">
          {new Date().getFullYear()}
        </span>
      </div>

      <div className="h-[262px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff9f43" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#ff9f43" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
              labelStyle={{ fontFamily: "Nunito", color: "#212b36" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e6eaed",
                fontFamily: "Nunito",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#ff9f43"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
              dot={{ r: 4, fill: "#ff9f43", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
