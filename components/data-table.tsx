"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"

const data = [
  {
    id: "1",
    campaign: "Summer Sale 2024",
    channel: "Google Ads",
    impressions: 125000,
    clicks: 3200,
    conversions: 156,
    revenue: 15600,
    status: "Active",
  },
  {
    id: "2",
    campaign: "Brand Awareness Q2",
    channel: "Facebook",
    impressions: 89000,
    clicks: 2100,
    conversions: 89,
    revenue: 8900,
    status: "Active",
  },
  {
    id: "3",
    campaign: "Product Launch",
    channel: "Instagram",
    impressions: 67000,
    clicks: 1800,
    conversions: 134,
    revenue: 13400,
    status: "Paused",
  },
  {
    id: "4",
    campaign: "Retargeting Campaign",
    channel: "LinkedIn",
    impressions: 45000,
    clicks: 1200,
    conversions: 78,
    revenue: 7800,
    status: "Active",
  },
  {
    id: "5",
    campaign: "Holiday Special",
    channel: "Twitter",
    impressions: 34000,
    clicks: 890,
    conversions: 45,
    revenue: 4500,
    status: "Completed",
  },
  {
    id: "6",
    campaign: "Mobile App Promo",
    channel: "TikTok",
    impressions: 156000,
    clicks: 4200,
    conversions: 234,
    revenue: 23400,
    status: "Active",
  },
]

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const itemsPerPage = 5

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredData = data.filter(
    (item) =>
      item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.channel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "transition-all duration-300 hover:scale-110"
    switch (status) {
      case "Active":
        return (
          <Badge
            className={`bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 ${baseClasses}`}
          >
            Active
          </Badge>
        )
      case "Paused":
        return (
          <Badge variant="secondary" className={baseClasses}>
            Paused
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className={baseClasses}>
            Completed
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className={baseClasses}>
            {status}
          </Badge>
        )
    }
  }

  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-700 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <span>Campaign Performance</span>
        </CardTitle>
        <CardDescription>Detailed view of all marketing campaigns and their performance metrics.</CardDescription>
        <div className="flex items-center space-x-4 pt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            />
          </div>
          <Button
            variant="outline"
            className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 bg-transparent"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("campaign")}
                    className="h-auto p-0 font-semibold hover:text-blue-600 transition-colors duration-300"
                  >
                    Campaign
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("channel")}
                    className="h-auto p-0 font-semibold hover:text-blue-600 transition-colors duration-300"
                  >
                    Channel
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("impressions")}
                    className="h-auto p-0 font-semibold hover:text-blue-600 transition-colors duration-300"
                  >
                    Impressions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("clicks")}
                    className="h-auto p-0 font-semibold hover:text-blue-600 transition-colors duration-300"
                  >
                    Clicks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("conversions")}
                    className="h-auto p-0 font-semibold hover:text-blue-600 transition-colors duration-300"
                  >
                    Conversions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("revenue")}
                    className="h-auto p-0 font-semibold hover:text-blue-600 transition-colors duration-300"
                  >
                    Revenue
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={`hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 hover:scale-[1.01] ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <TableCell className="font-medium">{item.campaign}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                    >
                      {item.channel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{item.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{item.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{item.conversions}</TableCell>
                  <TableCell className="text-right font-mono text-green-600 dark:text-green-400 font-semibold">
                    ${item.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length}{" "}
            results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm font-medium px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
