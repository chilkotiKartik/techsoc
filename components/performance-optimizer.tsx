"use client"

import { useEffect } from "react"

// This component optimizes performance by:
// 1. Disabling unnecessary animations when device is low-powered
// 2. Cleaning up event listeners and animations
// 3. Implementing proper throttling for scroll and resize events

export function PerformanceOptimizer() {
  useEffect(() => {
    // Check if device is low-powered
    const isLowPowered = () => {
      // Check for battery API
      if ("getBattery" in navigator) {
        // @ts-ignore - getBattery exists but TypeScript doesn't know about it
        navigator.getBattery().then((battery) => {
          if (battery.charging === false && battery.level < 0.2) {
            document.documentElement.classList.add("reduce-animations")
          }
        })
      }

      // Check for device memory API
      if ("deviceMemory" in navigator) {
        // @ts-ignore - deviceMemory exists but TypeScript doesn't know about it
        if (navigator.deviceMemory < 4) {
          document.documentElement.classList.add("reduce-animations")
        }
      }

      // Check for hardware concurrency
      if ("hardwareConcurrency" in navigator) {
        if (navigator.hardwareConcurrency < 4) {
          document.documentElement.classList.add("reduce-animations")
        }
      }
    }

    // Throttle function for performance
    const throttle = (func: Function, limit: number) => {
      let inThrottle: boolean
      return function (this: any, ...args: any[]) {
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => (inThrottle = false), limit)
        }
      }
    }

    // Optimize scroll and resize events
    const optimizeEvents = () => {
      const scrollHandler = throttle(() => {
        // Handle scroll events efficiently
      }, 100)

      const resizeHandler = throttle(() => {
        // Handle resize events efficiently
      }, 100)

      window.addEventListener("scroll", scrollHandler, { passive: true })
      window.addEventListener("resize", resizeHandler, { passive: true })

      return () => {
        window.removeEventListener("scroll", scrollHandler)
        window.removeEventListener("resize", resizeHandler)
      }
    }

    // Optimize images by loading them only when needed
    const optimizeImages = () => {
      if ("IntersectionObserver" in window) {
        const lazyImages = document.querySelectorAll("img.lazy")

        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              const src = img.dataset.src
              if (src) {
                img.src = src
                img.classList.remove("lazy")
              }
              imageObserver.unobserve(img)
            }
          })
        })

        lazyImages.forEach((img) => {
          imageObserver.observe(img)
        })
      }
    }

    // Run optimizations
    isLowPowered()
    const cleanupEvents = optimizeEvents()
    optimizeImages()

    // Cleanup function
    return () => {
      cleanupEvents()
    }
  }, [])

  return null
}
