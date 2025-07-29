"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp, PieChart, Target, Bell, ChevronLeft, ChevronRight } from "lucide-react"

interface FloatingNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function FloatingNav({ activeSection, onSectionChange }: FloatingNavProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const navItems = [
    { id: "overview", icon: TrendingUp, label: "Overview" },
    { id: "analytics", icon: PieChart, label: "Analytics" },
    { id: "reports", icon: Target, label: "Reports" },
    { id: "notifications", icon: Bell, label: "Notifications" },
  ]

  const currentIndex = navItems.findIndex((item) => item.id === activeSection)

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? navItems.length - 1 : currentIndex - 1
    onSectionChange(navItems[prevIndex].id)
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % navItems.length
    onSectionChange(navItems[nextIndex].id)
  }

  return (
    <nav
      className={`fixed left-1/2 top-20 z-50 transform -translate-x-1/2 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-full px-4 py-2 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
        {isMobile ? (
          // Mobile navigation with prev/next buttons
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
              {(() => {
                const currentItem = navItems.find((item) => item.id === activeSection)
                const IconComponent = currentItem?.icon
                return IconComponent ? <IconComponent className="h-4 w-4" /> : null
              })()}
              <span className="text-sm font-medium">{navItems.find((item) => item.id === activeSection)?.label}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        ) : (
          // Desktop navigation with all buttons
          navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={`rounded-full transition-all duration-300 hover:scale-110 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            )
          })
        )}
      </div>

      {/* Mobile swipe hint */}
      {isMobile && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap animate-pulse">
          Swipe left/right to navigate
        </div>
      )}
    </nav>
  )
}
