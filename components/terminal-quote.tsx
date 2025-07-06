"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalText } from "@/components/terminal-text"
import { useTheme } from "next-themes"

const quotes = [
  {
    text: "The best way to predict the future is to build it.",
    author: "Alan Kay",
  },
  {
    text: "Code is poetry.",
    author: "WordPress",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "Technology is best when it brings people together.",
    author: "Matt Mullenweg",
  },
  {
    text: "The most powerful person in the world is the storyteller.",
    author: "Steve Jobs",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
]

export function TerminalQuote() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => {
        setIsTypingComplete(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }, 8000) // Wait 8 seconds before changing quotes

      return () => clearTimeout(timer)
    }
  }, [isTypingComplete])

  const currentQuote = quotes[currentQuoteIndex]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-3xl mx-auto rounded-xl p-6 ${
            isDark ? "bg-navy-900/70 border border-cyan-900/50" : "bg-gray-50/90 border border-pink-100"
          } backdrop-blur-sm`}
        >
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full ${isDark ? "bg-red-500" : "bg-red-400"} mr-2`}></div>
            <div className={`w-3 h-3 rounded-full ${isDark ? "bg-yellow-500" : "bg-yellow-400"} mr-2`}></div>
            <div className={`w-3 h-3 rounded-full ${isDark ? "bg-green-500" : "bg-green-400"} mr-2`}></div>
            <div className={`text-xs font-mono ${isDark ? "text-cyan-400/70" : "text-gray-500"}`}>terminal</div>
          </div>

          <div className={`font-mono ${isDark ? "text-cyan-300" : "text-gray-800"}`}>
            <div className="mb-4">
              <span className={isDark ? "text-green-400" : "text-green-600"}>user@technova</span>
              <span className={isDark ? "text-cyan-400" : "text-gray-600"}>:</span>
              <span className={isDark ? "text-blue-400" : "text-blue-600"}>~</span>
              <span className={isDark ? "text-cyan-400" : "text-gray-600"}>$ </span>
              <span>echo $INSPIRATION</span>
            </div>

            <div className="min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-2">
                    <TerminalText
                      text={`"${currentQuote.text}"`}
                      speed={30}
                      onComplete={() => setIsTypingComplete(true)}
                      className={`text-lg ${isDark ? "text-cyan-300" : "text-gray-800"}`}
                    />
                  </div>

                  {isTypingComplete && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className={`text-right italic ${isDark ? "text-cyan-400/70" : "text-gray-600"}`}
                    >
                      — {currentQuote.author}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center">
              <span className={isDark ? "text-green-400" : "text-green-600"}>user@technova</span>
              <span className={isDark ? "text-cyan-400" : "text-gray-600"}>:</span>
              <span className={isDark ? "text-blue-400" : "text-blue-600"}>~</span>
              <span className={isDark ? "text-cyan-400" : "text-gray-600"}>$ </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                className={isDark ? "text-cyan-300" : "text-gray-800"}
              >
                █
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
