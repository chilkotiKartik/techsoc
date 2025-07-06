"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // This is where you would typically initialize and track page views
    // with services like Google Analytics, Vercel Analytics, etc.
    console.log(`Page view tracked: ${pathname}`)

    // Example implementation for Google Analytics (GA4)
    // if (typeof window.gtag === 'function') {
    //   window.gtag('config', 'G-XXXXXXXXXX', {
    //     page_path: pathname,
    //   })
    // }

    // Example implementation for Vercel Analytics
    // if (typeof window.va === 'function') {
    //   window.va('page_view', { path: pathname })
    // }
  }, [pathname])

  return null // This component doesn't render anything visible
}
