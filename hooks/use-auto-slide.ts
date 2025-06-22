"use client"

import { useEffect, useState, useCallback, type RefObject } from "react"

interface UseAutoSlideProps {
  containerRef: RefObject<HTMLDivElement>
  itemWidth: number
  interval: number
  enabled: boolean
}

export function useAutoSlide({ containerRef, itemWidth, interval, enabled }: UseAutoSlideProps) {
  const [isAutoSliding, setIsAutoSliding] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const pauseAutoSlide = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resumeAutoSlide = useCallback(() => {
    setIsPaused(false)
  }, [])

  useEffect(() => {
    if (!enabled || isPaused || !containerRef.current) return

    setIsAutoSliding(true)

    const container = containerRef.current
    let scrollPosition = 0

    const slide = () => {
      if (!container) return

      const maxScroll = container.scrollWidth - container.clientWidth

      if (scrollPosition >= maxScroll) {
        scrollPosition = 0
      } else {
        scrollPosition += itemWidth
      }

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }

    const intervalId = setInterval(slide, interval)

    // Pause on manual scroll
    const handleScroll = () => {
      setIsPaused(true)
      setTimeout(() => {
        if (!isPaused) setIsPaused(false)
      }, 3000)
    }

    container.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(intervalId)
      container.removeEventListener("scroll", handleScroll)
      setIsAutoSliding(false)
    }
  }, [enabled, isPaused, containerRef, itemWidth, interval])

  return {
    isAutoSliding: isAutoSliding && !isPaused,
    pauseAutoSlide,
    resumeAutoSlide,
  }
}
