"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"

export function MobileSwipeIndicator() {
  const [showIndicator, setShowIndicator] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Show indicator for first-time mobile users
    const hasSeenIndicator = localStorage.getItem("hasSeenSwipeIndicator")
    if (!hasSeenIndicator && window.innerWidth < 768) {
      setShowIndicator(true)
      setTimeout(() => {
        setShowIndicator(false)
        localStorage.setItem("hasSeenSwipeIndicator", "true")
      }, 4000)
    }

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMobile || !showIndicator) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mx-4 shadow-2xl animate-fade-in-up">
        <h3 className="text-lg font-semibold mb-4 text-center">Touch Gestures</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <ChevronLeft className="h-4 w-4 text-blue-500" />
              <ChevronRight className="h-4 w-4 text-blue-500" />
            </div>
            <span>Swipe left/right to navigate sections</span>
          </div>
          <div className="flex items-center space-x-3">
            <ChevronUp className="h-4 w-4 text-green-500" />
            <span>Swipe up to scroll to top</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Double tap to toggle theme</span>
          </div>
        </div>
      </div>
    </div>
  )
}
