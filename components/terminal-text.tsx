"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TerminalTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
  showCursor?: boolean
  delay?: number
  glitch?: boolean
  color?: string
}

export function TerminalText({
  text,
  speed = 30,
  className,
  onComplete,
  showCursor = true,
  delay = 0,
  glitch = false,
  color,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let i = 0

    // Reset when text changes
    setDisplayedText("")
    setIsComplete(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const delayTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i))
          i++
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setIsComplete(true)
          if (onComplete) onComplete()
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(delayTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, speed, delay, onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("font-mono", className)}
      style={{ color: color }}
    >
      <span className={glitch && !isComplete ? "glitch-effect" : ""}>{displayedText}</span>
      {showCursor && <span className={isComplete ? "typing-cursor" : "animate-blink"}>|</span>}
    </motion.div>
  )
}
