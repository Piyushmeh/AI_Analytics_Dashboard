"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { ThemeToggle } from "@/components/theme-toggle"
import { MetricsCards } from "@/components/metrics-cards"
import { DataTable } from "@/components/data-table"
import { RecentSales } from "@/components/recent-sales"
import { ExportButton } from "@/components/export-button"
import { FloatingNav } from "@/components/floating-nav"
import { Overview } from "@/components/overview"
import { CompactAIAssistant } from "@/components/compact-ai-assistant"
import { useTheme } from "next-themes"
import {
  Activity,
  Search,
  Bell,
  User,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  Target,
  ArrowUp,
  Sparkles,
} from "lucide-react"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  const overviewRef = useRef<HTMLDivElement>(null)
  const analyticsRef = useRef<HTMLDivElement>(null)
  const reportsRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>, sectionName: string) => {
    setActiveSection(sectionName)
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Touch gesture handlers
  const handleSwipeLeft = () => {
    const sections = ["overview", "analytics", "reports", "notifications"]
    const currentIndex = sections.indexOf(activeSection)
    const nextIndex = (currentIndex + 1) % sections.length
    const nextSection = sections[nextIndex]

    if (nextSection === "overview") scrollToSection(overviewRef, nextSection)
    if (nextSection === "analytics") scrollToSection(analyticsRef, nextSection)
    if (nextSection === "reports") scrollToSection(reportsRef, nextSection)
    if (nextSection === "notifications") scrollToSection(notificationsRef, nextSection)
  }

  const handleSwipeRight = () => {
    const sections = ["overview", "analytics", "reports", "notifications"]
    const currentIndex = sections.indexOf(activeSection)
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1
    const prevSection = sections[prevIndex]

    if (prevSection === "overview") scrollToSection(overviewRef, prevSection)
    if (prevSection === "analytics") scrollToSection(analyticsRef, prevSection)
    if (prevSection === "reports") scrollToSection(reportsRef, prevSection)
    if (prevSection === "notifications") scrollToSection(notificationsRef, prevSection)
  }

  const handleSwipeUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDoubleTap = () => {
    // Toggle theme using the theme provider
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <div
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin mx-auto"
                style={{ animationDelay: "0.5s", animationDuration: "1.5s" }}
              ></div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                ADmyBRAND Insights
              </h1>
              <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading your analytics dashboard...</p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-1000"
      onTouchStart={(e) => {
        const touch = e.touches[0]
        ;(e.currentTarget as any).touchStartX = touch.clientX
        ;(e.currentTarget as any).touchStartY = touch.clientY
      }}
      onTouchEnd={(e) => {
        const touch = e.changedTouches[0]
        const startX = (e.currentTarget as any).touchStartX
        const startY = (e.currentTarget as any).touchStartY

        if (!startX || !startY) return

        const deltaX = touch.clientX - startX
        const deltaY = touch.clientY - startY
        const minSwipeDistance = 50

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > minSwipeDistance) {
            handleSwipeRight()
          } else if (deltaX < -minSwipeDistance) {
            handleSwipeLeft()
          }
        } else {
          // Vertical swipe
          if (deltaY < -minSwipeDistance) {
            handleSwipeUp()
          }
        }
      }}
      onDoubleClick={handleDoubleTap}
    >
      {/* Floating Navigation */}
      <FloatingNav
        activeSection={activeSection}
        onSectionChange={(section) => {
          if (section === "overview") scrollToSection(overviewRef, section)
          if (section === "analytics") scrollToSection(analyticsRef, section)
          if (section === "reports") scrollToSection(reportsRef, section)
          if (section === "notifications") scrollToSection(notificationsRef, section)
        }}
      />

      {/* Header - Fixed without parallax */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center space-x-3 transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="relative">
                <Activity className="h-8 w-8 text-blue-600 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ADmyBRAND Insights
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Analytics Dashboard</p>
              </div>
            </div>

            <div
              className={`flex items-center space-x-4 transition-all duration-700 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search insights..."
                  className="pl-10 w-64 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-800/80"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110"
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section
          className={`text-center py-12 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="relative">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to Your Dashboard
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Get real-time insights into your marketing performance with beautiful analytics and actionable data.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <CalendarDateRangePicker />
              <ExportButton />
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section ref={overviewRef} id="overview" className="space-y-8">
          <div
            className={`transition-all duration-700 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h3 className="text-3xl font-bold mb-2 flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span>Performance Overview</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Key metrics and performance indicators</p>
            <MetricsCards />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card
              className={`lg:col-span-2 group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: "900ms" }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Revenue Trends</span>
                </CardTitle>
                <CardDescription>Monthly revenue performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <Overview />
                </div>
              </CardContent>
            </Card>

            <Card
              className={`group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: "1100ms" }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest customer interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Analytics Section */}
        <section
          ref={analyticsRef}
          id="analytics"
          className={`space-y-8 transition-all duration-700 delay-1300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div>
            <h3 className="text-3xl font-bold mb-2 flex items-center space-x-3">
              <PieChart className="h-8 w-8 text-purple-600" />
              <span>Detailed Analytics</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Comprehensive data visualization and insights</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Traffic Sources */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300">Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Organic Search", percentage: 45, color: "bg-blue-500" },
                    { source: "Social Media", percentage: 30, color: "bg-green-500" },
                    { source: "Direct", percentage: 15, color: "bg-purple-500" },
                    { source: "Referral", percentage: 10, color: "bg-orange-500" },
                  ].map((item, index) => (
                    <div key={item.source} className="space-y-2" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex justify-between text-sm">
                        <span>{item.source}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 ${item.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{
                            width: isVisible ? `${item.percentage}%` : "0%",
                            transitionDelay: `${1500 + index * 200}ms`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-300">Conversion Funnel</CardTitle>
                <CardDescription>User journey through your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Visitors", count: 10000, width: 100 },
                    { stage: "Leads", count: 2500, width: 75 },
                    { stage: "Prospects", count: 1000, width: 50 },
                    { stage: "Customers", count: 250, width: 25 },
                  ].map((item, index) => (
                    <div key={item.stage} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.stage}</span>
                        <span className="font-medium">{item.count.toLocaleString()}</span>
                      </div>
                      <div className="relative">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-8 rounded-lg transition-all duration-1000 ease-out flex items-center justify-center text-white text-xs font-medium"
                          style={{
                            width: isVisible ? `${item.width}%` : "0%",
                            transitionDelay: `${1700 + index * 200}ms`,
                          }}
                        >
                          {isVisible && item.stage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-purple-700 dark:text-purple-300">Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { metric: "Page Load Time", value: "1.2s", target: "< 2s", status: "good" },
                    { metric: "Bounce Rate", value: "32%", target: "< 40%", status: "good" },
                    { metric: "Session Duration", value: "4m 32s", target: "> 3m", status: "excellent" },
                    { metric: "Conversion Rate", value: "2.5%", target: "> 2%", status: "excellent" },
                  ].map((item, index) => (
                    <div
                      key={item.metric}
                      className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm"
                    >
                      <div>
                        <p className="text-sm font-medium">{item.metric}</p>
                        <p className="text-xs text-gray-500">{item.target}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{item.value}</p>
                        <Badge
                          variant={item.status === "excellent" ? "default" : "secondary"}
                          className={`text-xs ${item.status === "excellent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                        >
                          {item.status === "excellent" ? "Excellent" : "Good"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Reports Section */}
        <section
          ref={reportsRef}
          id="reports"
          className={`space-y-8 transition-all duration-700 delay-1500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div>
            <h3 className="text-3xl font-bold mb-2 flex items-center space-x-3">
              <Target className="h-8 w-8 text-orange-600" />
              <span>Detailed Reports</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Comprehensive data tables and insights</p>
          </div>
          <DataTable />
        </section>

        {/* Notifications Section */}
        <section
          ref={notificationsRef}
          id="notifications"
          className={`space-y-8 transition-all duration-700 delay-1700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div>
            <h3 className="text-3xl font-bold mb-2 flex items-center space-x-3">
              <Bell className="h-8 w-8 text-red-600" />
              <span>Recent Notifications</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Stay updated with your latest insights</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Campaign Performance Alert",
                message: "Your Google Ads campaign is performing 25% above target",
                time: "2 minutes ago",
                type: "success",
                icon: TrendingUp,
                color: "from-green-400 to-green-600",
              },
              {
                title: "Budget Threshold Reached",
                message: "Facebook campaign has reached 80% of monthly budget",
                time: "15 minutes ago",
                type: "warning",
                icon: DollarSign,
                color: "from-yellow-400 to-orange-500",
              },
              {
                title: "New Conversion Goal",
                message: "Congratulations! You've exceeded your conversion target",
                time: "1 hour ago",
                type: "achievement",
                icon: Target,
                color: "from-purple-400 to-purple-600",
              },
              {
                title: "Traffic Spike Detected",
                message: "Unusual traffic increase detected from organic search",
                time: "2 hours ago",
                type: "info",
                icon: ArrowUp,
                color: "from-blue-400 to-blue-600",
              },
              {
                title: "Weekly Report Ready",
                message: "Your weekly performance report is now available",
                time: "1 day ago",
                type: "info",
                icon: BarChart3,
                color: "from-indigo-400 to-indigo-600",
              },
              {
                title: "User Engagement Up",
                message: "User engagement increased by 15% this week",
                time: "2 days ago",
                type: "success",
                icon: Users,
                color: "from-green-400 to-green-600",
              },
            ].map((notification, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl cursor-pointer ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${1900 + index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-full bg-gradient-to-r ${notification.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <notification.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{notification.time}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`
                        ${notification.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : ""}
                        ${notification.type === "warning" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" : ""}
                        ${notification.type === "achievement" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400" : ""}
                        ${notification.type === "info" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" : ""}
                        transition-all duration-300 group-hover:scale-110
                      `}
                    >
                      {notification.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Scroll to Top Button */}
      <Button
        className={`fixed bottom-24 right-8 z-50 rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl transition-all duration-300 ${
          scrollY > 300 ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-0"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-5 w-5 text-white" />
      </Button>

      {/* Mobile Touch Instructions */}
      <div className="fixed bottom-4 left-4 z-40 md:hidden">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50 animate-pulse">
          👆 Swipe left/right • Double tap to toggle theme
        </div>
      </div>

      {/* AI Assistant Component */}
      <CompactAIAssistant 
        dashboardData={{
          revenue: 45232,
          users: 2350,
          conversions: 12234,
          growthRate: 573
        }} 
      />
    </div>
  )
}