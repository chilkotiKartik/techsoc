"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Shield, Cpu, Code, Sparkles } from "lucide-react"

interface BootSequenceProps {
  onComplete?: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [stage, setStage] = useState(0)
  const [showAvatar, setShowAvatar] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [avatarType, setAvatarType] = useState<"ai" | "cyborg" | "hologram">("ai")
  const [showBadge, setShowBadge] = useState(false)

  const bootMessages = [
    "Initializing TechNova OS v1.0.0...",
    "Loading kernel modules...",
    "Establishing secure connection...",
    "Mounting virtual filesystems...",
    "Starting network services...",
    "Loading user interface...",
    "Initializing AI subsystems...",
    "TechNova OS boot complete.",
    "Welcome to IITM BS Technical Society Portal.",
  ]

  useEffect(() => {
    if (stage < bootMessages.length - 1) {
      const timer = setTimeout(() => {
        setStage(stage + 1)
      }, 800)
      return () => clearTimeout(timer)
    } else if (stage === bootMessages.length - 1) {
      const timer = setTimeout(() => {
        setShowAvatar(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [stage, bootMessages.length])

  const handleAvatarComplete = () => {
    setTimeout(() => {
      setShowButton(true)
    }, 500)
  }

  // Cycle through avatar types
  useEffect(() => {
    if (showAvatar) {
      const avatarTypes: ["ai", "cyborg", "hologram"] = ["ai", "cyborg", "hologram"]
      let currentIndex = 0

      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % avatarTypes.length
        setAvatarType(avatarTypes[currentIndex])
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [showAvatar])

  // Show IITM BS badge after a delay
  useEffect(() => {
    if (showAvatar) {
      const timer = setTimeout(() => {
        setShowBadge(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showAvatar])

  return (
    <div className="terminal-border min-h-[70vh] flex flex-col relative overflow-hidden">
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 text-primary font-mono text-xs"
            style={{
              left: `${i * 10}%`,
              animation: `matrix-rain ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j}>{Math.random() > 0.5 ? "1" : "0"}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="terminal-header">
        <div className="terminal-title">TechNova Boot Sequence</div>
        <div className="terminal-controls">
          <div className="terminal-control bg-red-500"></div>
          <div className="terminal-control bg-yellow-500"></div>
          <div className="terminal-control bg-green-500"></div>
        </div>
      </div>

      <div className="flex-1 p-6 font-mono text-sm overflow-hidden relative z-10">
        <AnimatePresence>
          {bootMessages.slice(0, stage + 1).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              <span className="text-primary/70 mr-2">[{index.toString().padStart(2, "0")}]</span>
              <span>{message}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {showAvatar && (
          <div className="mt-12 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="mb-8 relative"
            >
              <div className="absolute -inset-4 rounded-full bg-primary/5 animate-pulse"></div>

              {/* IITM BS Badge */}
              <AnimatePresence>
                {showBadge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 floating-badge"
                  >
                    <div className="relative w-16 h-16 bg-black/80 rounded-full border-2 border-primary flex items-center justify-center">
                      <span className="text-xs font-orbitron text-primary">IITM BS</span>
                      <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={avatarType}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar type={avatarType} size="xl" animated />
                </motion.div>
              </AnimatePresence>

              {/* Orbiting tech icons */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 pointer-events-none">
                <motion.div
                  className="absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <motion.div
                    className="absolute -top-4 -translate-x-1/2 bg-black/80 p-1 rounded-full border border-cyan-500/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Cpu className="h-3 w-3 text-cyan-400" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <motion.div
                    className="absolute -right-6 top-1/2 -translate-y-1/2 bg-black/80 p-1 rounded-full border border-purple-500/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Code className="h-3 w-3 text-purple-400" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <motion.div
                    className="absolute -bottom-5 -translate-x-1/2 left-1/2 bg-black/80 p-1 rounded-full border border-primary/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Shield className="h-3 w-3 text-primary" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-8"
            >
              <TerminalText
                text="Greetings, Innovator. I am NOVA, your guide to the TechNova universe."
                className="text-xl neon-text mb-4"
                onComplete={handleAvatarComplete}
                speed={40}
              />

              {showButton && (
                <TerminalText
                  text="Where Code Meets Curiosity, and Innovation Becomes Culture."
                  className="text-primary/80"
                  delay={500}
                  speed={30}
                />
              )}
            </motion.div>

            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={onComplete}
                  className="neon-border bg-primary/10 hover:bg-primary/20 text-primary group"
                >
                  <span>Begin Journey</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  className="neon-border-cyan bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Explore Features</span>
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
