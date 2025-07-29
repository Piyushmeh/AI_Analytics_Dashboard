"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentSales() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {recentSales.map((sale, index) => (
        <div
          key={index}
          className={`flex items-center p-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <Avatar className="h-10 w-10 ring-2 ring-white/50 hover:ring-blue-500/50 transition-all duration-300">
            <AvatarImage src={sale.avatar || "/placeholder.svg"} alt="Avatar" />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
              {sale.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 flex-1">
            <p className="text-sm font-medium leading-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              {sale.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{sale.email}</p>
          </div>
          <div className="font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
            {sale.amount}
          </div>
        </div>
      ))}
    </div>
  )
}
