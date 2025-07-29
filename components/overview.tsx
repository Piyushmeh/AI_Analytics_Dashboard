"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useEffect, useState } from "react"

const data = [
  {
    name: "Jan",
    total: 4200,
  },
  {
    name: "Feb",
    total: 3800,
  },
  {
    name: "Mar",
    total: 5100,
  },
  {
    name: "Apr",
    total: 4600,
  },
  {
    name: "May",
    total: 5800,
  },
  {
    name: "Jun",
    total: 6200,
  },
  {
    name: "Jul",
    total: 5900,
  },
  {
    name: "Aug",
    total: 6800,
  },
  {
    name: "Sep",
    total: 7200,
  },
  {
    name: "Oct",
    total: 6900,
  },
  {
    name: "Nov",
    total: 7800,
  },
  {
    name: "Dec",
    total: 8200,
  },
]

export function Overview() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedData, setAnimatedData] = useState(data.map((item) => ({ ...item, total: 0 })))

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setAnimatedData(
        data.map((item) => ({
          ...item,
          total: Math.round(item.total * easeOutQuart),
        })),
      )

      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
        <XAxis
          dataKey="name"
          stroke="#6B7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#6B7280" }}
        />
        <YAxis
          stroke="#6B7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          tick={{ fill: "#6B7280" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
          formatter={(value) => [`$${value}`, "Revenue"]}
          labelStyle={{ color: "#374151", fontWeight: "bold" }}
        />
        <Bar
          dataKey="total"
          fill="url(#barGradient)"
          radius={[4, 4, 0, 0]}
          className="hover:opacity-80 transition-opacity duration-300"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
