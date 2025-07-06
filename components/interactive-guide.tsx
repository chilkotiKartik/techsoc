"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/avatar"
import { TerminalText } from "@/components/terminal-text"
import {
  X,
  MessageSquare,
  ChevronRight,
  Send,
  Volume2,
  VolumeX,
  Info,
  Lightbulb,
  Map,
  Calendar,
  Users,
  Home,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  isNew?: boolean
}

type GuideState = "minimized" | "chat" | "expanded" | "tour"

export function InteractiveGuide() {
  const [isVisible, setIsVisible] = useState(false)
  const [guideState, setGuideState] = useState<GuideState>("minimized")
  const [currentMessage, setCurrentMessage] = useState(0)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const welcomeMessages = [
    "Welcome to TechNova! I'm NOVA, your interactive AI guide.",
    "I can help you navigate the portal and answer your questions.",
    "Explore our Tech Galaxy to discover different domains.",
    "Take a guided tour to learn about all our features.",
    "Ready to join? Head to the Join Us section to create your profile.",
  ]

  const tourSteps = [
    {
      title: "Home Page",
      description:
        "The home page showcases our latest features, events, and tech domains. It's your starting point for exploring TechNova.",
      icon: <Info className="h-5 w-5" />,
      path: "/",
      color: "#00ffff",
    },
    {
      title: "Tech Galaxy",
      description:
        "Our interactive Tech Galaxy visualizes different technology domains. Click on any domain to explore its resources and projects.",
      icon: <Map className="h-5 w-5" />,
      path: "/galaxy",
      color: "#ff00ff",
    },
    {
      title: "Events",
      description:
        "Stay updated with our upcoming hackathons, workshops, and tech meetups. Register and participate to enhance your skills.",
      icon: <Calendar className="h-5 w-5" />,
      path: "/events",
      color: "#00ff88",
    },
    {
      title: "Resources",
      description:
        "Access our curated collection of tutorials, documentation, and tools. Filter by domain and difficulty to find what you need.",
      icon: <Lightbulb className="h-5 w-5" />,
      path: "/resources",
      color: "#954ce9",
    },
    {
      title: "Join Us",
      description:
        "Become part of our tech community by creating your profile. Select your interests and customize your avatar.",
      icon: <Users className="h-5 w-5" />,
      path: "/join",
      color: "#ff8800",
    },
  ]

  // Predefined responses for common questions
  const responses = {
    "what is technova":
      "TechNova is the official technical society of IITM BS. We foster collaboration, learning, and innovation across various tech domains including AI, Web Development, Robotics, and more.",
    "how can i join":
      "You can join TechNova by visiting our 'Join Us' page. There, you'll create your tech profile, select your areas of interest, and become part of our community!",
    "upcoming events":
      "We have several exciting events coming up! Check out the ByteBurst Hackathon, AI Workshop Series, and our monthly tech talks. Visit the Events page for details and registration.",
    "tech domains":
      "TechNova covers various tech domains including AI/ML, Web Development, Cybersecurity, Robotics, IoT, Cloud Computing, and more. Explore our Tech Galaxy to learn about each domain.",
    projects:
      "Our members work on various innovative projects. You can view them in the Projects section. If you're interested in contributing, join our community and connect with project leads!",
    resources:
      "We offer a wide range of learning resources including tutorials, documentation, videos, and more. Visit our Resources page to filter by domain and difficulty level.",
    clubs:
      "TechNova has several specialized clubs and chapters including WebX, AI Circle, Robotics Club, and more. Each focuses on a specific tech domain with dedicated activities and projects.",
    labs: "Our interactive labs provide hands-on experience with various technologies. Try building web UIs, IoT dashboards, or data visualizations in a guided environment.",
    contact:
      "You can reach us through the Contact page or join our Discord community. We're always happy to connect with tech enthusiasts!",
    help: "I can help you navigate TechNova! Ask me about our events, tech domains, how to join, resources, projects, or anything else about our tech society.",
    tour: "I'd be happy to give you a tour! Click the 'Take a Tour' button below to start exploring the key features of TechNova.",
    guide:
      "I'm NOVA, your AI guide to TechNova. I can answer questions, provide information about our tech society, and help you navigate the portal.",
  }

  useEffect(() => {
    // Initialize speech synthesis
    synthRef.current = new SpeechSynthesisUtterance()
    synthRef.current.rate = 1
    synthRef.current.pitch = 1

    // Show assistant after 5 seconds if it hasn't been shown yet
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasBeenShown(true)
      }, 5000)
      return () => clearTimeout(timer)
    }

    // Clean up on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [hasBeenShown])

  // Cycle through welcome messages
  useEffect(() => {
    if (guideState === "minimized" && isVisible) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % welcomeMessages.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [guideState, isVisible, welcomeMessages.length])

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    // Speak the latest message if it's from the assistant and audio is enabled
    const latestMessage = messages[messages.length - 1]
    if (
      audioEnabled &&
      latestMessage &&
      latestMessage.role === "assistant" &&
      latestMessage.isNew &&
      synthRef.current
    ) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel() // Cancel any ongoing speech
        synthRef.current.text = latestMessage.content
        window.speechSynthesis.speak(synthRef.current)

        // Remove the isNew flag after speaking
        setMessages((prev) => prev.map((msg) => (msg.id === latestMessage.id ? { ...msg, isNew: false } : msg)))
      }
    }
  }, [messages, audioEnabled])

  // Focus input when chat is opened
  useEffect(() => {
    if (guideState === "chat" && inputRef.current) {
      inputRef.current.focus()
    }
  }, [guideState])

  const toggleGuide = () => {
    if (guideState === "minimized") {
      setGuideState("chat")
      // Add initial bot message
      if (messages.length === 0) {
        setMessages([
          {
            id: "1",
            role: "assistant",
            content: "Hi there! I'm NOVA, your interactive guide to TechNova. How can I help you today?",
            isNew: true,
          },
        ])
      }
    } else {
      setGuideState("minimized")
      // Cancel any ongoing speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
    setIsVisible(true)
  }

  const expandGuide = () => {
    setGuideState("expanded")
  }

  const minimizeGuide = () => {
    setGuideState("chat")
  }

  const hideGuide = () => {
    setGuideState("minimized")
    setIsVisible(false)
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  const startTour = () => {
    setGuideState("tour")
    setTourStep(0)
    setIsTypingComplete(false)
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  const endTour = () => {
    setGuideState("chat")
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  const goToNextTourStep = () => {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }

    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1)
      setIsTypingComplete(false)
    } else {
      endTour()
    }
  }

  const goToPrevTourStep = () => {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }

    if (tourStep > 0) {
      setTourStep(tourStep - 1)
      setIsTypingComplete(false)
    }
  }

  const handleTourTypingComplete = () => {
    setIsTypingComplete(true)

    // Speak the tour step if audio is enabled
    if (audioEnabled && synthRef.current && window.speechSynthesis) {
      window.speechSynthesis.cancel() // Cancel any ongoing speech
      synthRef.current.text = tourSteps[tourStep].description
      window.speechSynthesis.speak(synthRef.current)
    }
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)

    // Cancel any ongoing speech when toggling off
    if (audioEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (input.trim() === "") return

    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])

    // Generate response
    setTimeout(() => {
      const normalizedInput = input.toLowerCase().trim()
      let responseContent =
        "I'm not sure about that. Can you try asking something about TechNova, our events, or tech domains?"

      // Check for tour request
      if (
        normalizedInput.includes("tour") ||
        normalizedInput.includes("guide me") ||
        normalizedInput.includes("show me around")
      ) {
        responseContent = "I'd be happy to give you a tour of TechNova! Click the 'Take a Tour' button below to start."

        // Add the tour message and then start the tour after a delay
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseContent,
          isNew: true,
        }

        setMessages((prev) => [...prev, botResponse])

        // Start the tour after a short delay
        setTimeout(() => {
          startTour()
        }, 1500)

        setInput("")
        return
      }

      // Check for matching predefined responses
      for (const [key, value] of Object.entries(responses)) {
        if (normalizedInput.includes(key)) {
          responseContent = value
          break
        }
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        isNew: true,
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInput("")
  }

  const currentTourStep = tourSteps[tourStep]

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Expanded Guide (Full Screen) */}
      <AnimatePresence>
        {guideState === "expanded" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl h-[90vh] cyber-card p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Avatar type="ai" size="md" animated />
                  <div className="ml-3">
                    <h3 className="text-xl font-orbitron text-primary">NOVA</h3>
                    <p className="text-sm text-primary/70">Your Interactive AI Guide</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleAudio}
                    className="text-primary/70 hover:text-primary hover:bg-primary/10"
                  >
                    {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    <span className="ml-2 text-xs">{audioEnabled ? "Audio On" : "Audio Off"}</span>
                  </Button>
                  <button onClick={minimizeGuide} className="text-primary/50 hover:text-primary">
                    <ChevronRight size={20} className="rotate-90" />
                  </button>
                  <button onClick={hideGuide} className="text-primary/50 hover:text-primary">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(90vh-8rem)]">
                {/* Left sidebar - Quick links */}
                <div className="hidden md:block border-r border-primary/20 pr-4">
                  <h4 className="text-sm font-orbitron text-primary/80 mb-3">Quick Navigation</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Home", path: "/", icon: <Home size={16} /> },
                      { name: "Tech Galaxy", path: "/galaxy", icon: <Map size={16} /> },
                      { name: "Events", path: "/events", icon: <Calendar size={16} /> },
                      { name: "Resources", path: "/resources", icon: <BookOpen size={16} /> },
                      { name: "Join Us", path: "/join", icon: <Users size={16} /> },
                    ].map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="flex items-center gap-2 text-primary/70 hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-md transition-colors"
                        onClick={minimizeGuide}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-orbitron text-primary/80 mb-3">Common Questions</h4>
                    <div className="space-y-2">
                      {[
                        "What is TechNova?",
                        "How can I join?",
                        "What tech domains do you cover?",
                        "Tell me about upcoming events",
                        "What resources do you offer?",
                      ].map((question, index) => (
                        <button
                          key={index}
                          className="text-left text-sm text-primary/70 hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-md transition-colors w-full"
                          onClick={() => {
                            setInput(question)
                            setGuideState("chat")
                            setTimeout(() => {
                              handleSendMessage()
                            }, 100)
                          }}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button onClick={startTour} className="w-full bg-primary/20 hover:bg-primary/30 text-primary">
                      <Map className="mr-2 h-4 w-4" />
                      <span>Take a Tour</span>
                    </Button>
                  </div>
                </div>

                {/* Main chat area */}
                <div className="col-span-2 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 bg-black/30 rounded-md border border-primary/20 mb-4">
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <Avatar type="ai" size="md" animated={false} />
                        <div className="bg-primary/10 rounded-lg p-4 max-w-[80%]">
                          <p className="text-primary/90">
                            Welcome to TechNova! I'm NOVA, your AI guide to the IITM BS Technical Society. I can help
                            you navigate our portal and answer questions about our events, tech domains, resources, and
                            more.
                          </p>
                          <p className="text-primary/90 mt-3">
                            Feel free to ask me anything or take a guided tour to explore our features.
                          </p>
                        </div>
                      </div>

                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                          {message.role === "assistant" ? (
                            <Avatar type="ai" size="md" animated={false} />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                              <span className="text-sm">You</span>
                            </div>
                          )}
                          <div
                            className={`rounded-lg p-4 max-w-[80%] ${
                              message.role === "assistant"
                                ? "bg-primary/10 text-primary/90"
                                : "bg-secondary/10 text-secondary/90"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask me anything about TechNova..."
                      className="flex-1 bg-black/30 border border-primary/30 rounded-md px-4 py-3 text-primary focus:outline-none focus:border-primary/60"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" className="bg-primary/20 hover:bg-primary/30 text-primary">
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour Mode */}
      <AnimatePresence>
        {guideState === "tour" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <div className="w-full max-w-3xl cyber-card p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Avatar type="ai" size="md" animated />
                  <div className="ml-3">
                    <h3 className="text-lg font-orbitron" style={{ color: currentTourStep.color }}>
                      {currentTourStep.title}
                    </h3>
                    <p className="text-xs text-primary/70">
                      Step {tourStep + 1} of {tourSteps.length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleAudio}
                    className="text-primary/70 hover:text-primary hover:bg-primary/10"
                  >
                    {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </Button>
                  <button onClick={endTour} className="text-primary/50 hover:text-primary">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${currentTourStep.color}20`, color: currentTourStep.color }}
                  >
                    {currentTourStep.icon}
                  </div>
                  <div className="flex-1">
                    <TerminalText
                      text={currentTourStep.description}
                      className="text-primary/90"
                      speed={30}
                      onComplete={handleTourTypingComplete}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={goToPrevTourStep}
                  disabled={tourStep === 0}
                  variant="outline"
                  className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
                  style={{ opacity: tourStep === 0 ? 0.5 : 1 }}
                >
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  <span>Previous</span>
                </Button>

                <Link href={currentTourStep.path}>
                  <Button
                    className="bg-primary/20 hover:bg-primary/30 text-primary"
                    style={{ borderColor: currentTourStep.color }}
                    onClick={endTour}
                  >
                    <span>Visit {currentTourStep.title}</span>
                  </Button>
                </Link>

                <Button
                  onClick={goToNextTourStep}
                  disabled={!isTypingComplete}
                  className="neon-border bg-primary/10 hover:bg-primary/20 text-primary group"
                  style={{
                    borderColor: currentTourStep.color,
                    opacity: isTypingComplete ? 1 : 0.5,
                  }}
                >
                  <span>{tourStep === tourSteps.length - 1 ? "Finish Tour" : "Next"}</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="flex gap-2">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === tourStep ? "bg-primary" : "bg-primary/30"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Mode */}
      <AnimatePresence>
        {guideState === "chat" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 cyber-card p-4 absolute bottom-0 right-0"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <span className="text-sm font-orbitron text-primary">NOVA</span>
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/20 rounded text-primary/80">AI Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAudio}
                  className="text-primary/70 hover:text-primary hover:bg-primary/10 h-6 w-6 p-0"
                >
                  {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </Button>
                <button onClick={expandGuide} className="text-primary/50 hover:text-primary">
                  <ChevronRight size={16} className="-rotate-90" />
                </button>
                <button onClick={hideGuide} className="text-primary/50 hover:text-primary">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="h-60 overflow-y-auto mb-3 p-3 bg-black/30 rounded-md border border-primary/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex items-start gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.role === "assistant" ? (
                    <Avatar type="ai" size="xs" animated={false} />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                      <span className="text-[10px]">You</span>
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-2 text-xs ${
                      message.role === "assistant"
                        ? "bg-primary/10 text-primary/90"
                        : "bg-secondary/10 text-secondary/90"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 mb-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 bg-black/30 border border-primary/30 rounded-md px-3 py-2 text-xs text-primary focus:outline-none focus:border-primary/60"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary p-1">
                <Send size={14} />
              </Button>
            </form>

            <Button
              onClick={startTour}
              className="w-full bg-primary/10 hover:bg-primary/20 text-primary text-xs"
              size="sm"
            >
              <Map className="mr-2 h-3 w-3" />
              <span>Take a Guided Tour</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Mode */}
      <AnimatePresence>
        {guideState === "minimized" && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-72 cyber-card p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <span className="text-sm font-orbitron text-primary">NOVA</span>
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/20 rounded text-primary/80">AI Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAudio}
                  className="text-primary/70 hover:text-primary hover:bg-primary/10 h-6 w-6 p-0"
                >
                  {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </Button>
                <button onClick={hideGuide} className="text-primary/50 hover:text-primary">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="min-h-[60px] mb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TerminalText text={welcomeMessages[currentMessage]} className="text-sm text-primary/90" speed={20} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-primary/50">
                {currentMessage + 1}/{welcomeMessages.length}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 px-2 border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
                onClick={toggleGuide}
              >
                <span>Ask a question</span>
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Mode - Just the icon */}
      {guideState === "minimized" && !isVisible && (
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
