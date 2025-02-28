"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"

const data = [
  { name: "Jan", value: 80000 },
  { name: "Feb", value: 82000 },
  { name: "Mar", value: 85000 },
  { name: "Apr", value: 83000 },
  { name: "May", value: 85000 },
  { name: "Jun", value: 80000 },
  { name: "Jul", value: 82000 },
  { name: "Aug", value: 81000 },
  { name: "Sep", value: 83000 },
  { name: "Oct", value: 84000 },
  { name: "Nov", value: 82000 },
  { name: "Dec", value: 83000 },
]

export function Overview() {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-3 shadow-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
                      <span className="font-bold text-[#7497bd]">${payload[0].value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={theme === "dark" ? "#7497bd" : "#5a7a9d"}
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            style: { fill: "#7497bd", opacity: 0.8 },
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

