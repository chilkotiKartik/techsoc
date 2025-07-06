"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Volume2, VolumeX } from "lucide-react"

interface ImmersiveWelcomeProps {
  onComplete: () => void
}

export function ImmersiveWelcome({ onComplete }: ImmersiveWelcomeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const welcomeSteps = [
    {
      title: "Welcome to TechNova",
      description: "The digital frontier of IITM BS Technical Society.",
      avatarType: "ai",
      color: "#00ffff",
      voiceText: "Welcome to Tech Nova, the digital frontier of I I T M B S Technical Society.",
    },
    {
      title: "Explore Tech Domains",
      description: "Discover AI, Cybersecurity, Web Development, and more in our interactive Tech Galaxy.",
      avatarType: "cyborg",
      color: "#ff00ff",
      voiceText:
        "Explore our tech domains. Discover Artificial Intelligence, Cybersecurity, Web Development, and more in our interactive Tech Galaxy.",
    },
    {
      title: "Join Our Community",
      description: "Connect with fellow tech enthusiasts, participate in events, and showcase your projects.",
      avatarType: "hacker",
      color: "#00ff88",
      voiceText:
        "Join our community. Connect with fellow tech enthusiasts, participate in events, and showcase your projects.",
    },
    {
      title: "Ready to Begin?",
      description: "Your journey into the TechNova universe starts now.",
      avatarType: "hologram",
      color: "#954ce9",
      voiceText: "Are you ready to begin? Your journey into the Tech Nova universe starts now.",
    },
  ]

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/sounds/tech-interface.mp3")
    audioRef.current.volume = 0.3
    audioRef.current.loop = true

    // Initialize speech synthesis
    synthRef.current = new SpeechSynthesisUtterance()

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    // Play background audio if enabled
    if (audioEnabled && audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play prevented:", e))
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [audioEnabled])

  const handleTypingComplete = () => {
    setIsTypingComplete(true)

    // Speak the text if audio is enabled
    if (audioEnabled && synthRef.current && window.speechSynthesis) {
      window.speechSynthesis.cancel() // Cancel any ongoing speech
      synthRef.current.text = welcomeSteps[currentStep].voiceText
      synthRef.current.rate = 1
      synthRef.current.pitch = 1
      window.speechSynthesis.speak(synthRef.current)
    }
  }

  const goToNextStep = () => {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }

    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setIsTypingComplete(false)
    } else {
      // Complete the welcome sequence
      if (audioRef.current) {
        audioRef.current.pause()
      }
      onComplete()
    }
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)

    // Cancel any ongoing speech when toggling off
    if (audioEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  const currentStepData = welcomeSteps[currentStep]

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAudio}
          className="text-primary/70 hover:text-primary hover:bg-primary/10"
        >
          {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span className="ml-2 text-xs">{audioEnabled ? "Audio On" : "Audio Off"}</span>
        </Button>
      </div>

      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="cyber-card p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
              className="mb-8 relative mx-auto w-32 h-32"
            >
              <div
                className="absolute -inset-4 rounded-full animate-pulse opacity-50"
                style={{ backgroundColor: `${currentStepData.color}20` }}
              ></div>
              <Avatar type={currentStepData.avatarType as any} size="xl" animated />
            </motion.div>

            <h2 className="text-3xl font-orbitron mb-4" style={{ color: currentStepData.color }}>
              <TerminalText text={currentStepData.title} speed={40} glitch={true} />
            </h2>

            <div className="min-h-[60px] mb-8">
              <TerminalText
                text={currentStepData.description}
                className="text-lg text-primary/80"
                speed={30}
                onComplete={handleTypingComplete}
              />
            </div>

            <div className="flex justify-center">
              <Button
                onClick={goToNextStep}
                disabled={!isTypingComplete}
                className="neon-border bg-primary/10 hover:bg-primary/20 text-primary group"
                style={{
                  borderColor: currentStepData.color,
                  opacity: isTypingComplete ? 1 : 0.5,
                }}
              >
                <span>{currentStep < welcomeSteps.length - 1 ? "Continue" : "Enter TechNova"}</span>
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                {welcomeSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-primary/30"}`}
                  ></div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-10 bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              height: [10, 30, 10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  )
}
