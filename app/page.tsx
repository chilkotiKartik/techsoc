"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BootSequence } from "@/components/boot-sequence"
import { EnhancedWelcome } from "@/components/enhanced-welcome"
import { Button } from "@/components/ui/button"
import { ChevronRight, Rocket, Code, Shield, Brain, Zap, Users, BookOpen, Terminal } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar } from "@/components/avatar"

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false)
  const [welcomeComplete, setWelcomeComplete] = useState(false)
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userDomain, setUserDomain] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem("hasVisitedTechNova")
    if (visited) {
      setHasVisitedBefore(true)
      setBootComplete(true)
      setWelcomeComplete(true)
    }

    // Try to get user info from localStorage
    const storedUser = localStorage.getItem("techNovaUser")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUserName(userData.name)
      setUserDomain(userData.domain)

      // If user is logged in and has a domain, redirect to their dashboard
      if (userData.isLoggedIn && userData.domain) {
        router.push(`/dashboard/${userData.domain}`)
      }
    }
  }, [router])

  const handleBootComplete = () => {
    setBootComplete(true)

    // If first visit, show welcome sequence
    if (!hasVisitedBefore) {
      // Don't mark as visited yet - we'll do that after welcome
    } else {
      setWelcomeComplete(true)
    }
  }

  const handleWelcomeComplete = () => {
    setWelcomeComplete(true)

    // Mark as visited after welcome sequence
    localStorage.setItem("hasVisitedTechNova", "true")
    setHasVisitedBefore(true)

    // Get updated user info
    const storedUser = localStorage.getItem("techNovaUser")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUserDomain(userData.domain)

      // Redirect to domain dashboard
      if (userData.domain) {
        router.push(`/dashboard/${userData.domain}`)
      }
    }
  }

  // Featured programs
  const featuredPrograms = [
    {
      title: "Web Development Bootcamp",
      description: "Master modern web technologies from HTML to React and beyond",
      icon: <Code className="h-6 w-6" />,
      color: "#00ffff",
      link: "/dashboard/web",
      domain: "web",
    },
    {
      title: "Cybersecurity Fundamentals",
      description: "Learn ethical hacking, penetration testing, and security analysis",
      icon: <Shield className="h-6 w-6" />,
      color: "#ff00ff",
      link: "/dashboard/cybersec",
      domain: "cybersec",
    },
    {
      title: "AI & Machine Learning",
      description: "Explore neural networks, data science, and intelligent systems",
      icon: <Brain className="h-6 w-6" />,
      color: "#00ff88",
      link: "/dashboard/ai",
      domain: "ai",
    },
  ]

  // Society features
  const societyFeatures = [
    {
      title: "Interactive Learning",
      description: "Learn through AI-guided lessons, hands-on projects, and real-world challenges",
      icon: <Zap className="h-6 w-6" />,
      color: "#ff8800",
    },
    {
      title: "Community Collaboration",
      description: "Connect with fellow tech enthusiasts, mentors, and industry experts",
      icon: <Users className="h-6 w-6" />,
      color: "#954ce9",
    },
    {
      title: "Curated Resources",
      description: "Access domain-specific tutorials, documentation, and learning materials",
      icon: <BookOpen className="h-6 w-6" />,
      color: "#00ffff",
    },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BootSequence onComplete={handleBootComplete} />
          </motion.div>
        ) : !welcomeComplete ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EnhancedWelcome onComplete={handleWelcomeComplete} userName={userName} />
          </motion.div>
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
                {/* Animated background elements */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 6 + 2,
                      height: Math.random() * 6 + 2,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: i % 3 === 0 ? "#00ffff" : i % 2 === 0 ? "#ff00ff" : "#954ce9",
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

              <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron neon-text mb-6">
                      Where Code Meets Curiosity
                    </h1>
                    <p className="text-xl text-primary/80 mb-8">
                      Join the IITM BS Technical Society and embark on a journey through the digital frontier. Master
                      cutting-edge technologies, collaborate on innovative projects, and shape the future.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button asChild className="bg-primary/20 hover:bg-primary/30 text-primary">
                        <Link href="/login">
                          <span>Start Your Journey</span>
                          <Rocket className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
                      >
                        <Link href="/about">
                          <span>Learn More</span>
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    className="md:w-1/2 flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                      {/* Orbiting avatars */}
                      {["ai", "hacker", "developer", "student", "mentor"].map((type, index) => (
                        <motion.div
                          key={type}
                          className="absolute"
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                          }}
                          animate={{
                            x: Math.cos((index * (Math.PI * 2)) / 5) * 120,
                            y: Math.sin((index * (Math.PI * 2)) / 5) * 120,
                          }}
                          transition={{
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "linear",
                          }}
                        >
                          <Avatar type={type as any} size="md" animated />
                        </motion.div>
                      ))}

                      {/* Central logo */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30"
                        >
                          <Terminal className="h-10 w-10 text-primary" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Featured Programs Section */}
            <section className="py-16 bg-black/50">
              <div className="container mx-auto px-4">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-orbitron neon-text mb-4">Featured Programs</h2>
                  <p className="text-primary/70 max-w-2xl mx-auto">
                    Explore our specialized tech domains and find your path to mastery
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredPrograms.map((program, index) => (
                    <motion.div
                      key={program.domain}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="cyber-card p-6 h-full flex flex-col"
                      style={{
                        borderColor: program.color,
                        boxShadow: `0 0 15px ${program.color}20`,
                      }}
                    >
                      <div
                        className="mb-4 p-3 rounded-full w-14 h-14 flex items-center justify-center"
                        style={{ backgroundColor: `${program.color}20` }}
                      >
                        <div style={{ color: program.color }}>{program.icon}</div>
                      </div>
                      <h3 className="text-xl font-orbitron mb-3" style={{ color: program.color }}>
                        {program.title}
                      </h3>
                      <p className="text-primary/70 mb-6 flex-grow">{program.description}</p>
                      <Button
                        asChild
                        className="mt-auto"
                        style={{
                          backgroundColor: `${program.color}20`,
                          color: program.color,
                          borderColor: `${program.color}50`,
                        }}
                      >
                        <Link href={program.link}>
                          <span>
                            Explore{" "}
                            {program.domain === "cybersec"
                              ? "Cybersecurity"
                              : program.domain === "web"
                                ? "Web Development"
                                : "AI"}
                          </span>
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Society Features Section */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-orbitron neon-text mb-4">Why Join TechNova?</h2>
                  <p className="text-primary/70 max-w-2xl mx-auto">
                    Our tech society offers a unique blend of learning, community, and innovation
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {societyFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-black/30 border border-primary/20 rounded-lg p-6"
                    >
                      <div
                        className="mb-4 p-3 rounded-full w-14 h-14 flex items-center justify-center"
                        style={{ backgroundColor: `${feature.color}20` }}
                      >
                        <div style={{ color: feature.color }}>{feature.icon}</div>
                      </div>
                      <h3 className="text-xl font-orbitron mb-3" style={{ color: feature.color }}>
                        {feature.title}
                      </h3>
                      <p className="text-primary/70">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-black/50">
              <div className="container mx-auto px-4">
                <motion.div
                  className="text-center max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-orbitron neon-text mb-6">
                    Ready to Begin Your Tech Journey?
                  </h2>
                  <p className="text-primary/70 mb-8">
                    Join TechNova today and unlock a world of learning resources, community support, and exciting
                    projects. Whether you're a beginner or an expert, there's a place for you in our tech society.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild className="bg-primary/20 hover:bg-primary/30 text-primary">
                      <Link href="/login">
                        <span>Join TechNova</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
                    >
                      <Link href="/contact">
                        <span>Contact Us</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
