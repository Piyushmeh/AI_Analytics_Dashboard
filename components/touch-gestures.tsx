"use client"

import type React from "react"

import { useRef, useState } from "react"

interface TouchGesturesProps {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onTap?: () => void
  onDoubleTap?: () => void
  children: React.ReactNode
  className?: string
}

export function TouchGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onTap,
  onDoubleTap,
  children,
  className = "",
}: TouchGesturesProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [lastTap, setLastTap] = useState<number>(0)
  const [initialDistance, setInitialDistance] = useState<number>(0)

  const minSwipeDistance = 50

  const getTouchDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchEnd(null)
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      })
    } else if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      setInitialDistance(distance)
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      })
    } else if (e.touches.length === 2 && onPinch) {
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      const scale = distance / initialDistance
      onPinch(scale)
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    const isUpSwipe = distanceY > minSwipeDistance
    const isDownSwipe = distanceY < -minSwipeDistance

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    } else if (isUpSwipe && onSwipeUp) {
      onSwipeUp()
    } else if (isDownSwipe && onSwipeDown) {
      onSwipeDown()
    } else if (Math.abs(distanceX) < 10 && Math.abs(distanceY) < 10) {
      // Handle tap
      const now = Date.now()
      const timeSinceLastTap = now - lastTap

      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        // Double tap
        if (onDoubleTap) {
          onDoubleTap()
        }
      } else {
        // Single tap
        if (onTap) {
          onTap()
        }
      }
      setLastTap(now)
    }
  }

  return (
    <div
      ref={elementRef}
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      {children}
    </div>
  )
}
