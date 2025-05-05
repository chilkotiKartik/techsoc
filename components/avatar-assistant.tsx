"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/avatar"
import { TerminalText } from "@/components/terminal-text"
import { X, MessageSquare, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AvatarAssistant() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [hasBeenShown, setHasBeenShown] = useState(false)

  const messages = [
    "Welcome to TechVerse! I'm NEXUS, your digital guide.",
    "Need help navigating? Click on me anytime.",
    "Explore our Galaxy to discover tech domains.",
    "Check out upcoming events in the Events section.",
    "Ready to join? Head to the Join section to create your profile.",
  ]

  useEffect(() => {
    // Show assistant after 5 seconds if it hasn't been shown yet
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasBeenShown(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [hasBeenShown])

  // Cycle through messages
  useEffect(() => {
    if (isExpanded) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isExpanded, messages.length])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setIsVisible(true)
    }
  }

  const hideAssistant = () => {
    setIsExpanded(false)
    setIsVisible(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-72 cyber-card p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <span className="text-sm font-orbitron text-primary">NEXUS</span>
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/20 rounded text-primary/80">AI Assistant</span>
              </div>
              <button onClick={hideAssistant} className="text-primary/50 hover:text-primary">
                <X size={16} />
              </button>
            </div>
            <div className="min-h-[80px] mb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TerminalText text={messages[currentMessage]} className="text-sm text-primary/90" speed={20} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-primary/50">
                {currentMessage + 1}/{messages.length}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 px-2 border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
              >
                <span>Ask a question</span>
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative"
          >
            <button
              onClick={toggleExpanded}
              className="relative bg-black/80 p-1.5 rounded-full border border-primary/50 shadow-[0_0_10px_rgba(0,255,0,0.3)] hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-shadow"
            >
              <Avatar type="ai" size="md" animated />
              {!isExpanded && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-1 -right-1 bg-primary text-black rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <MessageSquare size={10} />
                </motion.div>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-black/80 p-2 rounded-full border border-primary/30 text-primary/70 hover:text-primary hover:border-primary/50 transition-colors"
        >
          <MessageSquare size={20} />
        </button>
      )}
    </div>
  )
}
