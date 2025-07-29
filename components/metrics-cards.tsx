"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Target } from "lucide-react"
import { useEffect, useState } from "react"

const metrics = [
  {
    title: "Total Revenue",
    value: 45231.89,
    change: "+20.1% from last month",
    icon: DollarSign,
    trend: "up",
    color: "from-green-400 to-green-600",
    bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
  },
  {
    title: "Active Users",
    value: 2350,
    change: "+180.1% from last month",
    icon: Users,
    trend: "up",
    color: "from-blue-400 to-blue-600",
    bgColor: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
  },
  {
    title: "Conversions",
    value: 12234,
    change: "+19% from last month",
    icon: Target,
    trend: "up",
    color: "from-purple-400 to-purple-600",
    bgColor: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
  },
  {
    title: "Growth Rate",
    value: 573,
    change: "+201 since last hour",
    icon: TrendingUp,
    trend: "up",
    color: "from-orange-400 to-orange-600",
    bgColor: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
  },
]

export function MetricsCards() {
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => ({ value: 0, opacity: 0, scale: 0.8 })))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    metrics.forEach((metric, index) => {
      const timer = setTimeout(() => {
        const duration = 2000
        const steps = 60
        const increment = metric.value / steps
        let currentStep = 0

        const interval = setInterval(() => {
          currentStep++
          const progress = currentStep / steps
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)

          setAnimatedValues((prev) => {
            const newValues = [...prev]
            newValues[index] = {
              value: Math.min(metric.value * easeOutQuart, metric.value),
              opacity: 1,
              scale: 1,
            }
            return newValues
          })

          if (currentStep >= steps) {
            clearInterval(interval)
          }
        }, duration / steps)

        return () => clearInterval(interval)
      }, index * 200)

      return () => clearTimeout(timer)
    })
  }, [isVisible])

  const formatValue = (value: number, originalValue: number) => {
    if (originalValue >= 1000) {
      return `+${Math.round(value).toLocaleString()}`
    }
    if (originalValue < 100) {
      return `+${Math.round(value)}`
    }
    return `$${Math.round(value).toLocaleString()}`
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card
          key={metric.title}
          className={`group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br ${metric.bgColor} backdrop-blur-xl overflow-hidden relative`}
          style={{
            transform: `translateY(${(1 - animatedValues[index].opacity) * 30}px) scale(${animatedValues[index].scale})`,
            opacity: animatedValues[index].opacity,
            transitionDelay: `${index * 100}ms`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
              {metric.title}
            </CardTitle>
            <div
              className={`p-2 rounded-full bg-gradient-to-r ${metric.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
            >
              <metric.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-gray-100 dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
              {formatValue(animatedValues[index].value, metric.value)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              {metric.change}
            </p>
          </CardContent>

          {/* Animated background elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full group-hover:scale-125 transition-transform duration-500 opacity-30"></div>
        </Card>
      ))}
    </div>
  )
}
