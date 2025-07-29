"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, FileSpreadsheet } from "lucide-react"

export function ExportButton() {
  const handleExportPDF = () => {
    // Simulate PDF export
    console.log("Exporting as PDF...")
    // In a real app, you would implement PDF generation here
  }

  const handleExportCSV = () => {
    // Simulate CSV export
    console.log("Exporting as CSV...")
    // In a real app, you would implement CSV generation here
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50"
      >
        <DropdownMenuItem
          onClick={handleExportPDF}
          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
        >
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleExportCSV}
          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
