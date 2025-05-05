import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Space_Mono, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CommandMenu } from "@/components/command-menu"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { FloatingParticles } from "@/components/floating-particles"
import { InteractiveGuide } from "@/components/interactive-guide"
import { PerformanceOptimizer } from "@/components/performance-optimizer"
import { Suspense } from "react"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap", // Optimize font loading
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap", // Optimize font loading
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap", // Optimize font loading
})

export const metadata: Metadata = {
  title: "TechNova | IITM BS Technical Society",
  description: "Where Code Meets Curiosity, and Innovation Becomes Culture.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
      </head>
      <body
        className={`${spaceMono.variable} ${orbitron.variable} ${sora.variable} font-sora bg-black text-purple-500 min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative min-h-screen overflow-hidden bg-grid-pattern">
            <div className="noise-overlay"></div>
            <div className="scanline-effect"></div>
            <Suspense fallback={null}>
              <FloatingParticles />
            </Suspense>
            <CustomCursor />
            <Header />
            <Suspense fallback={null}>
              <CommandMenu />
            </Suspense>
            <main className="relative z-10">{children}</main>
            <Suspense fallback={null}>
              <InteractiveGuide />
            </Suspense>
            <Footer />
            <PerformanceOptimizer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
