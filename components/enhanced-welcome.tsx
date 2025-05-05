"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Volume2, VolumeX, Sparkles, Code, Shield, Brain } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface EnhancedWelcomeProps {
  onComplete: () => void
  userName?: string
}

export function EnhancedWelcome({ onComplete, userName }: EnhancedWelcomeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)
  const isMobile = useMobile()

  const welcomeSteps = [
    {
      title: "Welcome to TechNova",
      description: `${
        userName ? `Hello ${userName}! ` : ""
      }Initializing the digital frontier of IITM BS Technical Society.`,
      avatarType: "ai",
      color: "#00ffff",
      voiceText: `${
        userName ? `Hello ${userName}! ` : ""
      }Welcome to Tech Nova, the digital frontier of I I T M B S Technical Society.`,
      bgAnimation: "matrix",
    },
    {
      title: "Choose Your Path",
      description: "Select your primary tech domain to begin your journey.",
      avatarType: "mentor",
      color: "#954ce9",
      voiceText: "Select your primary tech domain to begin your journey.",
      bgAnimation: "particles",
    },
  ]

  const domains = [
    {
      id: "web",
      name: "Web Development",
      description: "Master frontend, backend, and full-stack development",
      color: "#00ffff",
      icon: <Code className="h-6 w-6" />,
      avatarType: "developer",
    },
    {
      id: "cybersec",
      name: "Cybersecurity",
      description: "Learn ethical hacking, security analysis, and defense",
      color: "#ff00ff",
      icon: <Shield className="h-6 w-6" />,
      avatarType: "hacker",
    },
    {
      id: "ai",
      name: "Artificial Intelligence",
      description: "Explore machine learning, neural networks, and data science",
      color: "#00ff88",
      icon: <Brain className="h-6 w-6" />,
      avatarType: "ai",
    },
  ]

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Initialize audio
    audioRef.current = new Audio("/sounds/tech-interface.mp3")
    audioRef.current.volume = 0.3
    audioRef.current.loop = true

    // Initialize speech synthesis
    synthRef.current = new SpeechSynthesisUtterance()
    synthRef.current.rate = 1
    synthRef.current.pitch = 1

    // Clean up on unmount
    return () => {
      clearInterval(interval)
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

  const handleDomainSelection = (domain: string) => {
    setSelectedDomain(domain)

    // Store user preference
    localStorage.setItem(
      "techNovaUser",
      JSON.stringify({
        name: userName || "User",
        domain: domain,
        isLoggedIn: true,
        xp: 0,
        level: 1,
        completedTasks: [],
      }),
    )

    // Complete welcome sequence
    if (audioRef.current) {
      audioRef.current.pause()
    }
    onComplete()
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)

    // Cancel any ongoing speech when toggling off
    if (audioEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  const currentStepData = welcomeSteps[currentStep]

  // Render loading screen until progress reaches 100%
  if (loadingProgress < 100) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="mb-8 relative w-24 h-24"
        >
          <Avatar type="ai" size="lg" animated />
        </motion.div>

        <h2 className="text-2xl font-orbitron mb-6 text-cyan-400">
          <TerminalText text="Initializing TechNova..." speed={40} />
        </h2>

        <div className="w-64 md:w-80 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="mt-2 text-xs text-cyan-300/70 font-space-mono">
          {loadingProgress}% - Loading system components...
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
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

      {/* Dynamic background based on current step */}
      <div className="absolute inset-0 z-0">
        {currentStepData.bgAnimation === "matrix" && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20" />
            <MatrixRain />
          </div>
        )}

        {currentStepData.bgAnimation === "particles" && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  backgroundColor: currentStepData.color,
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-md md:max-w-xl px-4 z-10">
        <AnimatePresence mode="wait">
          {currentStep === 0 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md bg-black/40 border border-gray-800 rounded-xl p-6 md:p-8 text-center"
              style={{ boxShadow: `0 0 30px ${currentStepData.color}30` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                className="mb-6 md:mb-8 relative mx-auto w-24 h-24 md:w-32 md:h-32"
              >
                <div
                  className="absolute -inset-4 rounded-full animate-pulse opacity-50"
                  style={{ backgroundColor: `${currentStepData.color}20` }}
                ></div>
                <Avatar type={currentStepData.avatarType as any} size="xl" animated />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-orbitron mb-4" style={{ color: currentStepData.color }}>
                <TerminalText text={currentStepData.title} speed={40} glitch={true} />
              </h2>

              <div className="min-h-[60px] mb-6 md:mb-8">
                <TerminalText
                  text={currentStepData.description}
                  className="text-base md:text-lg text-primary/80"
                  speed={30}
                  onComplete={handleTypingComplete}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={goToNextStep}
                  disabled={!isTypingComplete}
                  className="group"
                  style={{
                    backgroundColor: `${currentStepData.color}20`,
                    color: currentStepData.color,
                    borderColor: currentStepData.color,
                    opacity: isTypingComplete ? 1 : 0.5,
                  }}
                >
                  <span>Continue</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="domain-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md bg-black/40 border border-gray-800 rounded-xl p-6 md:p-8"
              style={{ boxShadow: `0 0 30px ${currentStepData.color}30` }}
            >
              <h2
                className="text-2xl md:text-3xl font-orbitron mb-4 text-center"
                style={{ color: currentStepData.color }}
              >
                <TerminalText text={currentStepData.title} speed={40} glitch={true} />
              </h2>

              <div className="min-h-[40px] mb-6 text-center">
                <TerminalText
                  text={currentStepData.description}
                  className="text-base md:text-lg text-primary/80"
                  speed={30}
                  onComplete={handleTypingComplete}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {domains.map((domain) => (
                  <motion.div
                    key={domain.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="cyber-card p-4 cursor-pointer transition-all"
                    style={{
                      borderColor: selectedDomain === domain.id ? domain.color : "transparent",
                      boxShadow: selectedDomain === domain.id ? `0 0 15px ${domain.color}40` : "none",
                    }}
                    onClick={() => handleDomainSelection(domain.id)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-3 p-3 rounded-full" style={{ backgroundColor: `${domain.color}20` }}>
                        <div style={{ color: domain.color }}>{domain.icon}</div>
                      </div>
                      <h3 className="text-lg font-orbitron mb-2" style={{ color: domain.color }}>
                        {domain.name}
                      </h3>
                      <p className="text-sm text-primary/70 mb-4">{domain.description}</p>
                      <Avatar type={domain.avatarType as any} size="sm" animated={selectedDomain === domain.id} />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center text-sm text-primary/50">
                You can change your domain later in your profile settings
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating tech elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {!isMobile &&
          Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: i % 2 === 0 ? "#00ffff" : "#ff00ff",
                fontSize: `${Math.random() * 0.8 + 0.5}rem`,
                fontFamily: "monospace",
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.7 + 0.3, Math.random() * 0.5 + 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {i % 3 === 0 ? (
                <Sparkles size={Math.random() * 16 + 12} />
              ) : i % 5 === 0 ? (
                "01"
              ) : i % 2 === 0 ? (
                "10"
              ) : (
                "11"
              )}
            </motion.div>
          ))}
      </div>
    </div>
  )
}

// Matrix Rain Animation
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to store the current y position of each column
    const drops: number[] = []

    // Initialize all columns
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    // Characters to display
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    const draw = () => {
      // Black semi-transparent background to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set color and font
      ctx.fillStyle = "#0fa"
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Increment y coordinate
        drops[i]++

        // Reset when off the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
      }
    }

    const interval = setInterval(draw, 33) // ~30fps

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}
