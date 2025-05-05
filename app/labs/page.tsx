"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { Terminal, Shield, Cpu, Code, Server, Zap, ChevronRight, Search, X } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Lab types
type LabDomain = "ai" | "cybersec" | "web" | "blockchain" | "cloud" | "iot"

// Lab interface
interface Lab {
  id: string
  title: string
  description: string
  domain: LabDomain
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  icon: React.ReactNode
  color: string
}

// Sample labs data
const labs: Lab[] = [
  {
    id: "xss-lab",
    title: "XSS Attack Simulator",
    description: "Learn about cross-site scripting vulnerabilities and how to exploit and defend against them.",
    domain: "cybersec",
    difficulty: "intermediate",
    duration: "45 min",
    icon: <Shield className="h-5 w-5" />,
    color: "#ff00ff",
  },
  {
    id: "neural-network",
    title: "Neural Network Playground",
    description: "Build and train a simple neural network to understand the fundamentals of deep learning.",
    domain: "ai",
    difficulty: "intermediate",
    duration: "60 min",
    icon: <Cpu className="h-5 w-5" />,
    color: "#00ffff",
  },
  {
    id: "react-components",
    title: "React Component Workshop",
    description: "Create reusable React components with hooks and modern patterns.",
    domain: "web",
    difficulty: "beginner",
    duration: "30 min",
    icon: <Code className="h-5 w-5" />,
    color: "#00ff00",
  },
  {
    id: "smart-contract",
    title: "Smart Contract Lab",
    description: "Write and deploy a simple smart contract on a test blockchain.",
    domain: "blockchain",
    difficulty: "advanced",
    duration: "90 min",
    icon: <Server className="h-5 w-5" />,
    color: "#ffff00",
  },
  {
    id: "cloud-deployment",
    title: "Cloud Deployment Pipeline",
    description: "Set up a CI/CD pipeline for deploying applications to the cloud.",
    domain: "cloud",
    difficulty: "intermediate",
    duration: "75 min",
    icon: <Zap className="h-5 w-5" />,
    color: "#ff8800",
  },
  {
    id: "iot-sensor",
    title: "IoT Sensor Simulator",
    description: "Simulate IoT sensor data and build a dashboard to visualize it.",
    domain: "iot",
    difficulty: "beginner",
    duration: "45 min",
    icon: <Terminal className="h-5 w-5" />,
    color: "#00ff88",
  },
  {
    id: "sql-injection",
    title: "SQL Injection Lab",
    description: "Explore SQL injection vulnerabilities and learn how to prevent them.",
    domain: "cybersec",
    difficulty: "intermediate",
    duration: "60 min",
    icon: <Shield className="h-5 w-5" />,
    color: "#ff00ff",
  },
  {
    id: "nlp-workshop",
    title: "Natural Language Processing",
    description: "Process and analyze text data using NLP techniques and libraries.",
    domain: "ai",
    difficulty: "advanced",
    duration: "90 min",
    icon: <Cpu className="h-5 w-5" />,
    color: "#00ffff",
  },
  {
    id: "api-design",
    title: "RESTful API Design",
    description: "Design and implement a RESTful API with best practices.",
    domain: "web",
    difficulty: "intermediate",
    duration: "60 min",
    icon: <Code className="h-5 w-5" />,
    color: "#00ff00",
  },
]

export default function LabsPage() {
  const searchParams = useSearchParams()
  const initialDomain = searchParams.get("domain") as LabDomain | null

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomain, setSelectedDomain] = useState<LabDomain | null>(initialDomain)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Filter labs based on search and filters
  const filteredLabs = labs.filter((lab) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Domain filter
    const matchesDomain = selectedDomain === null || lab.domain === selectedDomain

    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === null || lab.difficulty === selectedDifficulty

    return matchesSearch && matchesDomain && matchesDifficulty
  })

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDomain(null)
    setSelectedDifficulty(null)
  }

  // Open lab details
  const openLabDetails = (lab: Lab) => {
    setSelectedLab(lab)
  }

  // Close lab details
  const closeLabDetails = () => {
    setSelectedLab(null)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-orbitron neon-text mb-4 text-center"
        >
          TechVerse Labs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-primary/70 max-w-2xl mx-auto text-center"
        >
          Interactive coding environments and tech challenges to enhance your skills.
        </motion.p>
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-primary/50" />
            </div>
            <input
              type="text"
              placeholder="Search labs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-primary/30 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-primary placeholder:text-primary/50"
            />
          </div>

          {/* Domain Filter */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "ai", label: "AI", color: "#00ffff" },
              { id: "cybersec", label: "CyberSec", color: "#ff00ff" },
              { id: "web", label: "Web", color: "#00ff00" },
              { id: "blockchain", label: "Blockchain", color: "#ffff00" },
              { id: "cloud", label: "Cloud", color: "#ff8800" },
              { id: "iot", label: "IoT", color: "#00ff88" },
            ].map((domain) => (
              <button
                key={domain.id}
                onClick={() =>
                  setSelectedDomain(selectedDomain === (domain.id as LabDomain) ? null : (domain.id as LabDomain))
                }
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedDomain === domain.id
                    ? "bg-opacity-20 text-opacity-100"
                    : "bg-opacity-10 text-opacity-70 hover:bg-opacity-15 hover:text-opacity-90"
                }`}
                style={{
                  backgroundColor: `${domain.color}${selectedDomain === domain.id ? "30" : "10"}`,
                  color: domain.color,
                }}
              >
                {domain.label}
              </button>
            ))}
          </div>

          {/* Clear Filters Button (only shown when filters are active) */}
          {(selectedDomain !== null || selectedDifficulty !== null || searchQuery !== "") && (
            <Button
              variant="ghost"
              className="text-primary/70 hover:text-primary hover:bg-primary/10"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-2" />
              <span>Clear</span>
            </Button>
          )}
        </div>

        {/* Difficulty Filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["beginner", "intermediate", "advanced"].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedDifficulty === difficulty
                  ? "bg-primary/20 text-primary"
                  : "bg-primary/10 text-primary/70 hover:bg-primary/15 hover:text-primary/90"
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnimatePresence>
          {filteredLabs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center py-12"
            >
              <div className="mb-4 flex justify-center">
                <Avatar type="ai" size="lg" animated />
              </div>
              <h3 className="text-xl font-orbitron neon-text mb-2">No labs found</h3>
              <p className="text-primary/70 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button variant="outline" className="neon-border" onClick={clearFilters}>
                Clear all filters
              </Button>
            </motion.div>
          ) : (
            filteredLabs.map((lab, index) => (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <div
                  className="h-full border rounded-md overflow-hidden bg-black/50 hover:bg-black/70 transition-colors cursor-pointer"
                  style={{
                    borderColor: `${lab.color}50`,
                    boxShadow: `0 0 10px ${lab.color}20`,
                  }}
                  onClick={() => openLabDetails(lab)}
                >
                  <div className="h-2" style={{ backgroundColor: lab.color }}></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 rounded-md" style={{ backgroundColor: `${lab.color}20` }}>
                        <div style={{ color: lab.color }}>{lab.icon}</div>
                      </div>
                      <div className="flex items-center text-primary/50 text-xs">
                        <span
                          className="px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: `${
                              lab.difficulty === "beginner"
                                ? "#00ff0020"
                                : lab.difficulty === "intermediate"
                                  ? "#ffff0020"
                                  : "#ff000020"
                            }`,
                            color: `${
                              lab.difficulty === "beginner"
                                ? "#00ff00"
                                : lab.difficulty === "intermediate"
                                  ? "#ffff00"
                                  : "#ff0000"
                            }`,
                          }}
                        >
                          {lab.difficulty}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-orbitron mb-2 transition-colors" style={{ color: lab.color }}>
                      {lab.title}
                    </h3>
                    <p className="text-primary/70 text-sm mb-4">{lab.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-primary/50">Duration: {lab.duration}</span>
                      <span
                        className="text-xs flex items-center group-hover:translate-x-1 transition-transform"
                        style={{ color: lab.color }}
                      >
                        Launch Lab
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Lab Details Modal */}
      <AnimatePresence>
        {selectedLab && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={closeLabDetails}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl -translate-x-[50%] -translate-y-[50%] p-4"
            >
              <div
                className="terminal-border overflow-hidden"
                style={{
                  borderColor: selectedLab.color,
                  boxShadow: `0 0 20px ${selectedLab.color}30`,
                }}
              >
                <div className="terminal-header">
                  <div className="terminal-title" style={{ color: selectedLab.color }}>
                    {selectedLab.title}
                  </div>
                  <div className="terminal-controls">
                    <div className="terminal-control bg-red-500"></div>
                    <div className="terminal-control bg-yellow-500"></div>
                    <div className="terminal-control bg-green-500"></div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-md" style={{ backgroundColor: `${selectedLab.color}20` }}>
                      <div style={{ color: selectedLab.color }}>{selectedLab.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-orbitron mb-2" style={{ color: selectedLab.color }}>
                        {selectedLab.title}
                      </h3>
                      <p className="text-primary/70 mb-2">{selectedLab.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-primary/50">
                        <span>Domain: {selectedLab.domain}</span>
                        <span>•</span>
                        <span>Difficulty: {selectedLab.difficulty}</span>
                        <span>•</span>
                        <span>Duration: {selectedLab.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-orbitron mb-3" style={{ color: selectedLab.color }}>
                      Lab Overview
                    </h4>
                    <div className="terminal-border p-4 mb-4 text-sm">
                      <TerminalText
                        text={`Welcome to the ${selectedLab.title} lab. This interactive environment will guide you through hands-on exercises to master ${selectedLab.domain} concepts and techniques.`}
                        speed={10}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="border border-primary/30 rounded-md p-3 bg-black/30">
                        <h5 className="text-sm font-orbitron text-primary mb-2">What You'll Learn</h5>
                        <ul className="text-xs text-primary/70 space-y-1">
                          <li>• Core concepts and fundamentals</li>
                          <li>• Practical implementation techniques</li>
                          <li>• Best practices and common pitfalls</li>
                          <li>• Real-world application scenarios</li>
                        </ul>
                      </div>
                      <div className="border border-primary/30 rounded-md p-3 bg-black/30">
                        <h5 className="text-sm font-orbitron text-primary mb-2">Prerequisites</h5>
                        <ul className="text-xs text-primary/70 space-y-1">
                          <li>• Basic programming knowledge</li>
                          <li>• Familiarity with command line</li>
                          <li>• Understanding of web technologies</li>
                          <li>• Completed introductory tutorials</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
                      onClick={closeLabDetails}
                    >
                      <X className="h-4 w-4 mr-2" />
                      <span>Close</span>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: `${selectedLab.color}20`,
                        color: selectedLab.color,
                        borderColor: selectedLab.color,
                      }}
                      className="border hover:bg-opacity-30 transition-colors"
                    >
                      <span>Launch Lab</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
