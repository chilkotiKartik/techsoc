"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/avatar"
import { TerminalText } from "@/components/terminal-text"
import { X, MessageSquare, ChevronRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

type GuideState = "minimized" | "chat" | "expanded"

export function GuideBot() {
  const [isVisible, setIsVisible] = useState(false)
  const [guideState, setGuideState] = useState<GuideState>("minimized")
  const [currentMessage, setCurrentMessage] = useState(0)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const welcomeMessages = [
    "Welcome to TechNova! I'm NOVA, your digital guide.",
    "Need help navigating? Ask me anything about our tech society.",
    "Explore our Tech Galaxy to discover different domains.",
    "Check out upcoming hackathons and workshops in the Events section.",
    "Ready to join? Head to the Join Us section to create your profile.",
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
  }

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
  }, [messages])

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
            content: "Hi there! I'm NOVA, your guide to TechNova. How can I help you today?",
          },
        ])
      }
    } else {
      setGuideState("minimized")
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
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (input.trim() === "") return

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
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInput("")
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {guideState === "expanded" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-full max-w-2xl h-[70vh] cyber-card p-4 absolute bottom-0 right-0"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <Avatar type="ai" size="sm" animated />
                <div className="ml-2">
                  <span className="text-sm font-orbitron text-primary">NOVA</span>
                  <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/20 rounded text-primary/80">AI Guide</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={minimizeGuide} className="text-primary/50 hover:text-primary">
                  <ChevronRight size={16} className="rotate-90" />
                </button>
                <button onClick={hideGuide} className="text-primary/50 hover:text-primary">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="h-[calc(70vh-8rem)] overflow-y-auto mb-4 p-4 bg-black/30 rounded-md border border-primary/20">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Avatar type="ai" size="sm" animated={false} />
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-primary/90">
                      Welcome to TechNova! I'm NOVA, your AI guide to the IITM BS Technical Society. I can help you
                      navigate our portal and answer questions about our events, tech domains, resources, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="text-xs">You</span>
                  </div>
                  <div className="bg-secondary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-secondary/90">What tech domains does TechNova cover?</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Avatar type="ai" size="sm" animated={false} />
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-primary/90">TechNova covers a wide range of tech domains including:</p>
                    <ul className="list-disc pl-5 mt-2 text-sm text-primary/90">
                      <li>Artificial Intelligence & Machine Learning</li>
                      <li>Web Development</li>
                      <li>Cybersecurity</li>
                      <li>Robotics & IoT</li>
                      <li>Cloud Computing</li>
                      <li>Blockchain & Cryptocurrency</li>
                      <li>Data Science & Analytics</li>
                      <li>Mobile App Development</li>
                    </ul>
                    <p className="text-sm text-primary/90 mt-2">
                      You can explore each domain in our Tech Galaxy section to learn more about specific technologies,
                      projects, and resources.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="text-xs">You</span>
                  </div>
                  <div className="bg-secondary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-secondary/90">How can I join TechNova?</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Avatar type="ai" size="sm" animated={false} />
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-primary/90">
                      You can join TechNova by visiting our "Join Us" page. The process is simple:
                    </p>
                    <ol className="list-decimal pl-5 mt-2 text-sm text-primary/90">
                      <li>Fill out the onboarding form with your details</li>
                      <li>Select your areas of interest and expertise</li>
                      <li>Customize your tech avatar</li>
                      <li>Submit your application</li>
                    </ol>
                    <p className="text-sm text-primary/90 mt-2">
                      Once you're a member, you'll have access to exclusive resources, projects, and events. You can
                      also join specific clubs based on your interests.
                    </p>
                    <div className="mt-3">
                      <Button asChild size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary text-xs">
                        <a href="/join">Go to Join Us Page</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything about TechNova..."
                className="flex-1 bg-black/30 border border-primary/30 rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-primary/60"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" className="bg-primary/20 hover:bg-primary/30 text-primary">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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

            <form onSubmit={handleSendMessage} className="flex gap-2">
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
          </motion.div>
        )}
      </AnimatePresence>

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
              <button onClick={hideGuide} className="text-primary/50 hover:text-primary">
                <X size={16} />
              </button>
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
