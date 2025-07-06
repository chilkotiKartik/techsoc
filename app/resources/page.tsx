"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Video, Code, FileText, LinkIcon, X, Filter, Grid, List } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { TerminalText } from "@/components/terminal-text"

// Resource types
type ResourceType = "article" | "video" | "tool" | "course" | "documentation"

// Resource domains
type ResourceDomain = "ai" | "cybersec" | "web" | "blockchain" | "cloud" | "iot"

// Resource interface
interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  domain: ResourceDomain
  url: string
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  views?: number
  bookmarks?: number
}

// Sample resources data
const resources: Resource[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "A comprehensive guide to understanding the basics of machine learning algorithms and applications.",
    type: "article",
    domain: "ai",
    url: "#",
    difficulty: "beginner",
    tags: ["ML", "AI", "Data Science"],
    views: 1245,
    bookmarks: 328,
  },
  {
    id: "2",
    title: "Ethical Hacking Fundamentals",
    description: "Learn the core concepts of ethical hacking and penetration testing in this detailed tutorial.",
    type: "course",
    domain: "cybersec",
    url: "#",
    difficulty: "intermediate",
    tags: ["Security", "Hacking", "Penetration Testing"],
    views: 987,
    bookmarks: 412,
  },
  {
    id: "3",
    title: "Modern React Development",
    description: "Master React.js with hooks, context API, and the latest best practices for frontend development.",
    type: "video",
    domain: "web",
    url: "#",
    difficulty: "intermediate",
    tags: ["React", "JavaScript", "Frontend"],
    views: 2341,
    bookmarks: 567,
  },
  {
    id: "4",
    title: "Blockchain Technology Explained",
    description: "Understand the fundamentals of blockchain technology and its applications beyond cryptocurrencies.",
    type: "article",
    domain: "blockchain",
    url: "#",
    difficulty: "beginner",
    tags: ["Blockchain", "Crypto", "Web3"],
    views: 876,
    bookmarks: 234,
  },
  {
    id: "5",
    title: "AWS Cloud Architecture",
    description: "Design scalable and resilient applications using AWS cloud services and best practices.",
    type: "documentation",
    domain: "cloud",
    url: "#",
    difficulty: "advanced",
    tags: ["AWS", "Cloud", "Architecture"],
    views: 654,
    bookmarks: 189,
  },
  {
    id: "6",
    title: "IoT Sensors and Networks",
    description: "Explore the world of IoT sensors, networks, and protocols for building connected devices.",
    type: "tool",
    domain: "iot",
    url: "#",
    difficulty: "intermediate",
    tags: ["IoT", "Sensors", "Networks"],
    views: 432,
    bookmarks: 98,
  },
  {
    id: "7",
    title: "Deep Learning with TensorFlow",
    description: "Practical guide to implementing neural networks and deep learning models with TensorFlow.",
    type: "course",
    domain: "ai",
    url: "#",
    difficulty: "advanced",
    tags: ["Deep Learning", "TensorFlow", "Neural Networks"],
    views: 1876,
    bookmarks: 543,
  },
  {
    id: "8",
    title: "Web Security Best Practices",
    description: "Protect your web applications from common vulnerabilities and security threats.",
    type: "article",
    domain: "cybersec",
    url: "#",
    difficulty: "intermediate",
    tags: ["Security", "Web", "OWASP"],
    views: 1432,
    bookmarks: 387,
  },
  {
    id: "9",
    title: "Full-Stack Development with Next.js",
    description: "Build modern full-stack applications with Next.js, React, and serverless functions.",
    type: "video",
    domain: "web",
    url: "#",
    difficulty: "intermediate",
    tags: ["Next.js", "React", "Full-Stack"],
    views: 2109,
    bookmarks: 476,
  },
  {
    id: "10",
    title: "Smart Contract Development",
    description: "Learn to write, test, and deploy secure smart contracts on Ethereum and other blockchains.",
    type: "tool",
    domain: "blockchain",
    url: "#",
    difficulty: "advanced",
    tags: ["Smart Contracts", "Solidity", "Ethereum"],
    views: 987,
    bookmarks: 321,
  },
  {
    id: "11",
    title: "Kubernetes for Beginners",
    description: "Get started with container orchestration using Kubernetes for cloud-native applications.",
    type: "course",
    domain: "cloud",
    url: "#",
    difficulty: "beginner",
    tags: ["Kubernetes", "Containers", "DevOps"],
    views: 1543,
    bookmarks: 298,
  },
  {
    id: "12",
    title: "Building IoT Projects with Raspberry Pi",
    description: "Step-by-step guide to creating IoT projects using Raspberry Pi and various sensors.",
    type: "documentation",
    domain: "iot",
    url: "#",
    difficulty: "beginner",
    tags: ["Raspberry Pi", "IoT", "DIY"],
    views: 876,
    bookmarks: 213,
  },
]

// Type icon mapping
const typeIcons: Record<ResourceType, React.ReactNode> = {
  article: <BookOpen className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  tool: <Code className="h-4 w-4" />,
  course: <FileText className="h-4 w-4" />,
  documentation: <LinkIcon className="h-4 w-4" />,
}

// Domain color mapping
const domainColors: Record<ResourceDomain, string> = {
  ai: "#00ffff",
  cybersec: "#ff00ff",
  web: "#00ff00",
  blockchain: "#ffff00",
  cloud: "#ff8800",
  iot: "#00ff88",
}

// Domain avatar mapping
const domainAvatars: Record<ResourceDomain, string> = {
  ai: "ai",
  cybersec: "hacker",
  web: "student",
  blockchain: "mentor",
  cloud: "cyborg",
  iot: "robot",
}

export default function ResourcesPage() {
  const searchParams = useSearchParams()
  const initialDomain = searchParams.get("domain") as ResourceDomain | null

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([])
  const [selectedDomains, setSelectedDomains] = useState<ResourceDomain[]>(initialDomain ? [initialDomain] : [])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Filter resources based on search and filters
  const filteredResources = resources.filter((resource) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Type filter
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resource.type)

    // Domain filter
    const matchesDomain = selectedDomains.length === 0 || selectedDomains.includes(resource.domain)

    // Difficulty filter
    const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(resource.difficulty)

    return matchesSearch && matchesType && matchesDomain && matchesDifficulty
  })

  // Toggle filter for resource types
  const toggleTypeFilter = (type: ResourceType) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Toggle filter for resource domains
  const toggleDomainFilter = (domain: ResourceDomain) => {
    setSelectedDomains((prev) => (prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]))
  }

  // Toggle filter for difficulty
  const toggleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTypes([])
    setSelectedDomains([])
    setSelectedDifficulty([])
  }

  // Open resource details
  const openResourceDetails = (resource: Resource) => {
    setSelectedResource(resource)
  }

  // Close resource details
  const closeResourceDetails = () => {
    setSelectedResource(null)
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
          TechVerse Resources
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-primary/70 max-w-2xl mx-auto text-center"
        >
          Explore our curated collection of tech resources, tutorials, and tools.
        </motion.p>
      </div>

      {/* Welcome message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto mb-8 cyber-card p-4"
          >
            <div className="flex items-start gap-4">
              <Avatar type="mentor" size="md" animated />
              <div className="flex-1">
                <h3 className="text-lg font-orbitron neon-text-cyan mb-2">
                  <TerminalText text="Welcome to the Knowledge Repository" speed={30} />
                </h3>
                <p className="text-primary/70 text-sm mb-3">
                  <TerminalText
                    text="Our curated collection of resources will help you master various tech domains. Use the filters to find exactly what you need."
                    speed={15}
                    delay={1000}
                  />
                </p>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-cyan-500/30 text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-500/10"
                    onClick={() => setShowWelcome(false)}
                  >
                    Got it
                  </Button>
                </div>
              </div>
              <button onClick={() => setShowWelcome(false)} className="text-primary/50 hover:text-primary">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8 max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-primary/50" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-primary/30 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-primary placeholder:text-primary/50"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-primary/30 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 ${
                viewMode === "grid" ? "bg-primary/20 text-primary" : "bg-black/50 text-primary/70 hover:bg-primary/10"
              }`}
            >
              <div className="flex items-center gap-1">
                <Grid className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 ${
                viewMode === "list" ? "bg-primary/20 text-primary" : "bg-black/50 text-primary/70 hover:bg-primary/10"
              }`}
            >
              <div className="flex items-center gap-1">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </div>
            </button>
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {(selectedTypes.length > 0 || selectedDomains.length > 0 || selectedDifficulty.length > 0) && (
              <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                {selectedTypes.length + selectedDomains.length + selectedDifficulty.length}
              </span>
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-black/50 border border-primary/30 rounded-md overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Resource Type Filters */}
                <div>
                  <h3 className="text-sm font-medium text-primary mb-3">Resource Type</h3>
                  <div className="space-y-2">
                    {(["article", "video", "tool", "course", "documentation"] as ResourceType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleTypeFilter(type)}
                        className={`flex items-center px-3 py-1.5 rounded-md w-full text-left text-sm ${
                          selectedTypes.includes(type)
                            ? "bg-primary/20 text-primary"
                            : "text-primary/70 hover:bg-primary/10"
                        }`}
                      >
                        <span className="mr-2">{typeIcons[type]}</span>
                        <span className="capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Domain Filters */}
                <div>
                  <h3 className="text-sm font-medium text-primary mb-3">Tech Domain</h3>
                  <div className="space-y-2">
                    {(["ai", "cybersec", "web", "blockchain", "cloud", "iot"] as ResourceDomain[]).map((domain) => (
                      <button
                        key={domain}
                        onClick={() => toggleDomainFilter(domain)}
                        className={`flex items-center px-3 py-1.5 rounded-md w-full text-left text-sm ${
                          selectedDomains.includes(domain)
                            ? "bg-primary/20 text-primary"
                            : "text-primary/70 hover:bg-primary/10"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: domainColors[domain] }}
                        ></span>
                        <span className="capitalize">
                          {domain === "ai"
                            ? "AI & ML"
                            : domain === "cybersec"
                              ? "Cybersecurity"
                              : domain === "iot"
                                ? "IoT"
                                : domain}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filters */}
                <div>
                  <h3 className="text-sm font-medium text-primary mb-3">Difficulty Level</h3>
                  <div className="space-y-2">
                    {["beginner", "intermediate", "advanced"].map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => toggleDifficultyFilter(difficulty)}
                        className={`flex items-center px-3 py-1.5 rounded-md w-full text-left text-sm ${
                          selectedDifficulty.includes(difficulty)
                            ? "bg-primary/20 text-primary"
                            : "text-primary/70 hover:bg-primary/10"
                        }`}
                      >
                        <span className="capitalize">{difficulty}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="mt-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary/70 hover:text-primary mr-2"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  className="bg-primary/20 text-primary hover:bg-primary/30"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Resources Grid/List */}
      <div className="max-w-6xl mx-auto">
        {filteredResources.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-primary/70 mb-4">No resources match your filters.</p>
            <Button
              variant="outline"
              className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="cyber-card p-4 h-full flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: `${domainColors[resource.domain]}20`,
                          color: domainColors[resource.domain],
                        }}
                      >
                        {resource.domain === "ai"
                          ? "AI & ML"
                          : resource.domain === "cybersec"
                            ? "Cybersecurity"
                            : resource.domain === "iot"
                              ? "IoT"
                              : resource.domain}
                      </div>
                      <div className="flex items-center text-primary/50 text-xs">
                        {typeIcons[resource.type]}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-primary">{resource.title}</h3>
                    <p className="text-primary/70 text-sm mb-4 flex-grow">{resource.description}</p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary/70 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary/50 capitalize">{resource.difficulty}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 border-cyan-500/30 text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-500/10"
                          onClick={() => openResourceDetails(resource)}
                        >
                          View Resource
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="cyber-card p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <Avatar type={domainAvatars[resource.domain]} size="md" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-wrap gap-2 mb-1">
                          <div
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              backgroundColor: `${domainColors[resource.domain]}20`,
                              color: domainColors[resource.domain],
                            }}
                          >
                            {resource.domain === "ai"
                              ? "AI & ML"
                              : resource.domain === "cybersec"
                                ? "Cybersecurity"
                                : resource.domain === "iot"
                                  ? "IoT"
                                  : resource.domain}
                          </div>
                          <div className="flex items-center text-primary/50 text-xs">
                            {typeIcons[resource.type]}
                            <span className="ml-1 capitalize">{resource.type}</span>
                          </div>
                          <span className="text-xs text-primary/50 capitalize">{resource.difficulty}</span>
                        </div>
                        <h3 className="text-lg font-medium mb-1 text-primary">{resource.title}</h3>
                        <p className="text-primary/70 text-sm">{resource.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resource.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary/70 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end gap-2">
                        <div className="flex items-center text-xs text-primary/50">
                          <span className="mr-3">{resource.views} views</span>
                          <span>{resource.bookmarks} bookmarks</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 border-cyan-500/30 text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-500/10"
                          onClick={() => openResourceDetails(resource)}
                        >
                          View Resource
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Resource Details Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={closeResourceDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="cyber-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: `${domainColors[selectedResource.domain]}20`,
                    color: domainColors[selectedResource.domain],
                  }}
                >
                  {selectedResource.domain === "ai"
                    ? "AI & ML"
                    : selectedResource.domain === "cybersec"
                      ? "Cybersecurity"
                      : selectedResource.domain === "iot"
                        ? "IoT"
                        : selectedResource.domain}
                </div>
                <button onClick={closeResourceDetails} className="text-primary/50 hover:text-primary">
                  <X size={20} />
                </button>
              </div>
              <h2 className="text-2xl font-orbitron neon-text mb-4">{selectedResource.title}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-primary/70 text-sm">
                  {typeIcons[selectedResource.type]}
                  <span className="ml-1 capitalize">{selectedResource.type}</span>
                </div>
                <span className="text-sm text-primary/70 capitalize">• {selectedResource.difficulty}</span>
              </div>
              <p className="text-primary/80 mb-6">{selectedResource.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedResource.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-primary/10 text-primary/70 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-primary/70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 12c0 2.5-2 4.5-4.5 4.5S3 14.5 3 12m18 0c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    {selectedResource.views} views
                  </div>
                  <div className="flex items-center text-sm text-primary/70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    {selectedResource.bookmarks} bookmarks
                  </div>
                </div>
                <Avatar type={domainAvatars[selectedResource.domain]} size="sm" />
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 hover:text-cyan-300"
                  onClick={() => window.open(selectedResource.url, "_blank")}
                >
                  Access Resource
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
