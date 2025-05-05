"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/avatar"
import Link from "next/link"
import { ChevronRight, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TerminalText } from "@/components/terminal-text"

// Tech domains with their details
const techDomains = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    color: "#00ffff",
    description: "Explore machine learning, neural networks, and AI applications.",
    longDescription:
      "Dive into the world of artificial intelligence, from basic machine learning algorithms to advanced neural networks. Learn about natural language processing, computer vision, and how AI is transforming industries.",
    position: { x: 50, y: 30 },
    size: 60,
    avatarType: "ai",
    resources: [
      "Machine Learning Fundamentals",
      "Neural Networks & Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "AI Ethics & Governance",
    ],
  },
  {
    id: "cybersec",
    name: "Cyber Security",
    color: "#ff00ff",
    description: "Master ethical hacking, penetration testing, and digital defense.",
    longDescription:
      "Learn the art of digital defense through ethical hacking, penetration testing, and security analysis. Discover how to identify vulnerabilities, protect systems, and respond to cyber threats.",
    position: { x: 75, y: 60 },
    size: 50,
    avatarType: "hacker",
    resources: ["Ethical Hacking", "Network Security", "Web Application Security", "Cryptography", "Digital Forensics"],
  },
  {
    id: "web",
    name: "Web Development",
    color: "#00ff00",
    description: "Build modern web applications with cutting-edge technologies.",
    longDescription:
      "Create powerful web applications using modern frameworks and technologies. From responsive design to server-side rendering, learn the full stack of web development skills.",
    position: { x: 25, y: 60 },
    size: 50,
    avatarType: "student",
    resources: [
      "Frontend Frameworks",
      "Backend Development",
      "Responsive Design",
      "Web Performance",
      "Progressive Web Apps",
    ],
  },
  {
    id: "blockchain",
    name: "Blockchain",
    color: "#ffff00",
    description: "Discover decentralized applications and blockchain technologies.",
    longDescription:
      "Explore the revolutionary world of blockchain technology. Learn about cryptocurrencies, smart contracts, decentralized applications, and how blockchain is disrupting traditional systems.",
    position: { x: 40, y: 80 },
    size: 40,
    avatarType: "mentor",
    resources: [
      "Blockchain Fundamentals",
      "Smart Contracts",
      "Decentralized Applications",
      "Cryptocurrency",
      "Web3 Development",
    ],
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    color: "#ff8800",
    description: "Learn about cloud infrastructure, services, and deployment.",
    longDescription:
      "Master cloud computing platforms and services. From infrastructure as a service to serverless computing, discover how to build, deploy, and scale applications in the cloud.",
    position: { x: 60, y: 80 },
    size: 40,
    avatarType: "student",
    resources: ["Cloud Architecture", "Serverless Computing", "Containerization", "DevOps", "Cloud Security"],
  },
  {
    id: "iot",
    name: "Internet of Things",
    color: "#00ff88",
    description: "Connect the physical and digital worlds with IoT technologies.",
    longDescription:
      "Bridge the gap between physical and digital worlds with Internet of Things technologies. Learn about sensors, connectivity, data processing, and building smart, connected devices.",
    position: { x: 85, y: 30 },
    size: 35,
    avatarType: "robot",
    resources: ["IoT Hardware", "Sensor Networks", "Edge Computing", "IoT Protocols", "Smart Home Automation"],
  },
]

export default function GalaxyPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 })
  const galaxyRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    // Auto-rotate galaxy
    const rotateGalaxy = () => {
      setRotationAngle((prev) => (prev + 0.05) % 360)
      animationRef.current = requestAnimationFrame(rotateGalaxy)
    }

    animationRef.current = requestAnimationFrame(rotateGalaxy)

    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleDomainClick = (domainId: string) => {
    setSelectedDomain(domainId === selectedDomain ? null : domainId)
    setShowWelcome(false)

    // Stop rotation when a domain is selected
    if (animationRef.current && domainId !== selectedDomain) {
      cancelAnimationFrame(animationRef.current)
    } else if (!animationRef.current && domainId === selectedDomain) {
      const rotateGalaxy = () => {
        setRotationAngle((prev) => (prev + 0.05) % 360)
        animationRef.current = requestAnimationFrame(rotateGalaxy)
      }
      animationRef.current = requestAnimationFrame(rotateGalaxy)
    }
  }

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prev) => {
      if (direction === "in" && prev < 1.5) return prev + 0.1
      if (direction === "out" && prev > 0.8) return prev - 0.1
      return prev
    })
  }

  const selectedDomainData = techDomains.find((domain) => domain.id === selectedDomain)

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-orbitron neon-text mb-4"
        >
          TechVerse Galaxy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-primary/70 max-w-2xl mx-auto"
        >
          Explore the digital universe of technology domains. Click on a domain to learn more.
        </motion.p>
      </div>

      <div className="relative w-full h-[70vh] cyber-card mb-8 overflow-hidden">
        {/* Galaxy controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => handleZoom("in")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 border border-primary/50 text-primary hover:bg-primary/10"
          >
            +
          </button>
          <button
            onClick={() => handleZoom("out")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 border border-primary/50 text-primary hover:bg-primary/10"
          >
            -
          </button>
        </div>

        {/* Galaxy background */}
        <div
          ref={galaxyRef}
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg) translate(${viewPosition.x}px, ${viewPosition.y}px)`,
            transformOrigin: "center center",
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Background grid */}
            <defs>
              <radialGradient id="galaxy-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0, 255, 0, 0.1)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(0, 255, 0, 0.1)" strokeWidth="0.2" />
              </pattern>
            </defs>

            {/* Galaxy background */}
            <rect width="100" height="100" fill="url(#grid)" />
            <circle cx="50" cy="50" r="40" fill="url(#galaxy-gradient)" />

            {/* Stars */}
            {Array.from({ length: 50 }).map((_, i) => (
              <circle
                key={`star-${i}`}
                cx={Math.random() * 100}
                cy={Math.random() * 100}
                r={Math.random() * 0.5}
                fill="#ffffff"
                opacity={Math.random() * 0.8 + 0.2}
                className="animate-pulse"
                style={{ animationDuration: `${Math.random() * 3 + 2}s` }}
              />
            ))}

            {/* Connecting lines */}
            {techDomains.map((domain, i) =>
              techDomains
                .slice(i + 1)
                .map((otherDomain, j) => (
                  <motion.line
                    key={`${domain.id}-${otherDomain.id}`}
                    x1={domain.position.x}
                    y1={domain.position.y}
                    x2={otherDomain.position.x}
                    y2={otherDomain.position.y}
                    stroke={domain.color}
                    strokeWidth="0.2"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: 0.5 + (i + j) * 0.1 }}
                  />
                )),
            )}

            {/* Domain planets */}
            {techDomains.map((domain, index) => (
              <g key={domain.id}>
                <motion.circle
                  cx={domain.position.x}
                  cy={domain.position.y}
                  r={selectedDomain === domain.id ? domain.size / 10 + 1 : domain.size / 10}
                  fill={domain.color}
                  fillOpacity="0.2"
                  stroke={domain.color}
                  strokeWidth="0.3"
                  initial={{ scale: 0 }}
                  animate={{ scale: isLoaded ? 1 : 0 }}
                  transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                    delay: 0.3 + index * 0.1,
                  }}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDomainClick(domain.id)}
                  className="animate-pulse"
                />
                <motion.text
                  x={domain.position.x}
                  y={domain.position.y - (domain.size / 10 + 3)}
                  textAnchor="middle"
                  fill={domain.color}
                  fontSize="2"
                  fontFamily="var(--font-orbitron)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  {domain.name}
                </motion.text>
              </g>
            ))}
          </svg>
        </div>

        {/* Interactive domain elements */}
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg) translate(${viewPosition.x}px, ${viewPosition.y}px)`,
            transformOrigin: "center center",
          }}
        >
          {techDomains.map((domain) => (
            <motion.div
              key={domain.id}
              className="absolute"
              style={{
                left: `${domain.position.x}%`,
                top: `${domain.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1 + techDomains.indexOf(domain) * 0.1 }}
            >
              <button
                onClick={() => handleDomainClick(domain.id)}
                className="w-12 h-12 flex items-center justify-center"
                aria-label={`Explore ${domain.name}`}
              >
                <Avatar
                  type={domain.avatarType as any}
                  size="md"
                  animated
                  className={`transition-transform duration-300 ${
                    selectedDomain === domain.id ? "scale-125" : "hover:scale-110"
                  }`}
                />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Welcome message or Domain info panel */}
        <AnimatePresence>
          {showWelcome && !selectedDomain && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-md border-t border-primary/30"
            >
              <div className="flex items-start gap-4">
                <Avatar type="hologram" size="lg" animated />
                <div className="flex-1">
                  <h3 className="text-xl font-orbitron neon-text mb-2">
                    <TerminalText text="Welcome to the TechVerse Galaxy" speed={40} />
                  </h3>
                  <p className="text-primary/70 mb-4">
                    <TerminalText
                      text="This interactive map represents the technology domains in our digital universe. Click on any domain to explore its resources, projects, and learning paths."
                      speed={20}
                      delay={1000}
                    />
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary"
                    >
                      <span>Start Exploring</span>
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="text-primary/50 hover:text-primary"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {selectedDomain && selectedDomainData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-md border-t"
              style={{ borderColor: selectedDomainData.color }}
            >
              <div className="flex items-start gap-4">
                <Avatar type={selectedDomainData.avatarType as any} size="lg" animated />
                <div className="flex-1">
                  <h3 className="text-xl font-orbitron mb-2" style={{ color: selectedDomainData.color }}>
                    {selectedDomainData.name}
                  </h3>
                  <p className="text-primary/70 mb-4">{selectedDomainData.longDescription}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-orbitron mb-2" style={{ color: selectedDomainData.color }}>
                      Key Resources
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedDomainData.resources.map((resource, index) => (
                        <div
                          key={index}
                          className="text-xs px-2 py-1 rounded border flex items-center gap-1"
                          style={{ borderColor: `${selectedDomainData.color}50`, color: selectedDomainData.color }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: selectedDomainData.color }}
                          ></span>
                          {resource}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="bg-black/50 hover:bg-black/70 border"
                      style={{
                        borderColor: selectedDomainData.color,
                        color: selectedDomainData.color,
                      }}
                    >
                      <Link href={`/resources?domain=${selectedDomainData.id}`}>
                        <span>Explore Resources</span>
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="bg-black/50 hover:bg-black/70 border"
                      style={{
                        borderColor: selectedDomainData.color,
                        color: selectedDomainData.color,
                      }}
                    >
                      <Link href={`/explorer?domain=${selectedDomainData.id}`}>
                        <span>Open Terminal</span>
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="text-primary/50 hover:text-primary"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="inline-flex items-center text-primary/70 text-sm"
        >
          <Info className="h-4 w-4 mr-2" />
          <span>Click on a domain to explore its resources and projects</span>
        </motion.div>
      </div>
    </div>
  )
}
