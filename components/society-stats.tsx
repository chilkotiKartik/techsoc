"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Code, Lightbulb, Award } from "lucide-react"
import { useTheme } from "next-themes"

interface StatProps {
  icon: React.ReactNode
  label: string
  value: number
  suffix?: string
  delay?: number
}

const StatCounter = ({ icon, label, value, suffix = "+", delay = 0 }: StatProps) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const startTime = Date.now()
      const endValue = value

      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        const progress = Math.min(elapsedTime / duration, 1)

        // Easing function for smoother counting
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(easeOutQuart * endValue)

        setCount(currentValue)

        if (progress === 1) {
          clearInterval(timer)
        }
      }, 16) // ~60fps

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  // Generate sparkline data
  const generateSparklineData = () => {
    const points = []
    const pointCount = 20
    let prevY = 50 + Math.random() * 20

    for (let i = 0; i < pointCount; i++) {
      const x = (i / (pointCount - 1)) * 100
      // Create a somewhat realistic trend with some randomness
      const direction = Math.random() > 0.7 ? -1 : 1
      const change = Math.random() * 15 * direction
      let y = prevY + change

      // Keep within bounds
      y = Math.max(10, Math.min(90, y))
      prevY = y

      points.push(`${x},${y}`)
    }

    return points.join(" ")
  }

  const sparklineData = generateSparklineData()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
      className={`relative p-6 rounded-xl backdrop-blur-sm ${
        isDark ? "bg-navy-900/50 border border-cyan-900/30" : "bg-white/70 border border-pink-100"
      }`}
    >
      {/* Background sparkline */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
        <polyline points={sparklineData} fill="none" stroke={isDark ? "#00ffff" : "#ff69b4"} strokeWidth="2" />
      </svg>

      <div className="relative z-10">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            isDark ? "bg-cyan-950/50 text-cyan-400" : "bg-pink-50 text-pink-500"
          }`}
        >
          {icon}
        </div>

        <div className="flex items-baseline">
          <span className={`text-4xl font-clash font-bold ${isDark ? "text-cyan-300" : "text-pink-600"}`}>{count}</span>
          <span className={`ml-1 text-xl ${isDark ? "text-cyan-400" : "text-pink-500"}`}>{suffix}</span>
        </div>

        <p className={`mt-2 font-satoshi ${isDark ? "text-cyan-300/70" : "text-gray-600"}`}>{label}</p>
      </div>
    </motion.div>
  )
}

export function SocietyStats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={`text-3xl md:text-4xl font-clash font-bold mb-4 ${isDark ? "text-cyan-300" : "text-pink-600"}`}
          >
            TechNova in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`max-w-2xl mx-auto font-satoshi ${isDark ? "text-cyan-300/70" : "text-gray-600"}`}
          >
            Our growing community of tech enthusiasts, innovators, and creators.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCounter icon={<Users className="h-6 w-6" />} label="Active Members" value={1200} delay={0.1} />
          <StatCounter icon={<Code className="h-6 w-6" />} label="Projects Completed" value={300} delay={0.2} />
          <StatCounter icon={<Lightbulb className="h-6 w-6" />} label="Mentors & Experts" value={50} delay={0.3} />
          <StatCounter icon={<Award className="h-6 w-6" />} label="Events Hosted" value={120} delay={0.4} />
        </div>
      </div>
    </section>
  )
}
