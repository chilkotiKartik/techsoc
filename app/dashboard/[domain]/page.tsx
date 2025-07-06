"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Bell, Code, Shield, LogOut } from "lucide-react"
import Link from "next/link"

// Domain-specific content interfaces
interface DomainContent {
  title: string
  subtitle: string
  welcomeMessage: string
  featuredResources: Resource[]
  upcomingEvents: Event[]
  notifications: Notification[]
  color: string
  secondaryColor: string
  avatarType: string
}

interface Resource {
  id: string
  title: string
  type: string
  difficulty: string
  description: string
}

interface Event {
  id: string
  title: string
  date: string
  type: string
}

interface Notification {
  id: string
  message: string
  time: string
  isNew: boolean
}

// Domain-specific content
const domainContent: Record<string, DomainContent> = {
  web: {
    title: "Web Development",
    subtitle: "Frontend, Backend & Full-Stack",
    welcomeMessage: "Welcome to the Web Development domain! Explore the latest in web technologies and frameworks.",
    color: "#00ffff",
    secondaryColor: "#0088ff",
    avatarType: "developer",
    featuredResources: [
      {
        id: "1",
        title: "Modern React Development",
        type: "Course",
        difficulty: "Intermediate",
        description: "Master React.js with hooks, context API, and the latest best practices.",
      },
      {
        id: "2",
        title: "Full-Stack Development with Next.js",
        type: "Tutorial",
        difficulty: "Advanced",
        description: "Build modern full-stack applications with Next.js, React, and serverless functions.",
      },
      {
        id: "3",
        title: "CSS Grid & Flexbox Mastery",
        type: "Workshop",
        difficulty: "Beginner",
        description: "Learn modern CSS layout techniques for responsive web design.",
      },
    ],
    upcomingEvents: [
      {
        id: "1",
        title: "Frontend Framework Showdown",
        date: "June 15, 2025",
        type: "Workshop",
      },
      {
        id: "2",
        title: "Web Performance Optimization",
        date: "July 3, 2025",
        type: "Webinar",
      },
      {
        id: "3",
        title: "Fullstack Hackathon",
        date: "July 20-22, 2025",
        type: "Hackathon",
      },
    ],
    notifications: [
      {
        id: "1",
        message: "New React course added to resources",
        time: "2 hours ago",
        isNew: true,
      },
      {
        id: "2",
        message: "Registration open for Frontend Framework Showdown",
        time: "1 day ago",
        isNew: true,
      },
      {
        id: "3",
        message: "Web Development meetup this Friday",
        time: "3 days ago",
        isNew: false,
      },
    ],
  },
  cybersec: {
    title: "Cybersecurity",
    subtitle: "Defense, Offense & Analysis",
    welcomeMessage: "Welcome to the Cybersecurity domain! Explore the world of digital security and ethical hacking.",
    color: "#ff00ff",
    secondaryColor: "#ff0088",
    avatarType: "hacker",
    featuredResources: [
      {
        id: "1",
        title: "Ethical Hacking Fundamentals",
        type: "Course",
        difficulty: "Intermediate",
        description: "Learn the core concepts of ethical hacking and penetration testing.",
      },
      {
        id: "2",
        title: "Web Security Best Practices",
        type: "Guide",
        difficulty: "Beginner",
        description: "Protect your web applications from common vulnerabilities and security threats.",
      },
      {
        id: "3",
        title: "Advanced Network Penetration Testing",
        type: "Workshop",
        difficulty: "Advanced",
        description: "Master techniques for identifying and exploiting network vulnerabilities.",
      },
    ],
    upcomingEvents: [
      {
        id: "1",
        title: "Capture The Flag Competition",
        date: "June 20, 2025",
        type: "Competition",
      },
      {
        id: "2",
        title: "Cybersecurity in the Cloud Era",
        date: "July 10, 2025",
        type: "Webinar",
      },
      {
        id: "3",
        title: "Ethical Hacking Bootcamp",
        date: "July 25-27, 2025",
        type: "Workshop",
      },
    ],
    notifications: [
      {
        id: "1",
        message: "New vulnerability discovered in popular framework",
        time: "1 hour ago",
        isNew: true,
      },
      {
        id: "2",
        message: "Registration open for CTF Competition",
        time: "1 day ago",
        isNew: true,
      },
      {
        id: "3",
        message: "Security advisory: Update your systems",
        time: "2 days ago",
        isNew: false,
      },
    ],
  },
}

export default function DomainDashboard() {
  const router = useRouter()
  const params = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)

  const domain = params.domain as string
  const content = domainContent[domain]

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("techNovaUser")
    if (!user) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(user)
    if (!userData.isLoggedIn) {
      router.push("/login")
      return
    }

    setUserName(userData.name)
    setIsLoaded(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("techNovaUser")
    router.push("/login")
  }

  if (!content) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-orbitron neon-text mb-4">Domain Not Found</h1>
          <p className="text-primary/70 mb-6">The requested domain does not exist.</p>
          <Button asChild className="neon-border bg-primary/10 hover:bg-primary/20 text-primary">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Domain Header */}
      <section
        className="py-12 mb-8 relative"
        style={{
          background: `linear-gradient(135deg, ${content.color}10, ${content.secondaryColor}10)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-0"
            >
              <div className="flex items-center gap-4">
                <Avatar type={content.avatarType as any} size="lg" animated />
                <div>
                  <h1 className="text-3xl md:text-4xl font-orbitron mb-2" style={{ color: content.color }}>
                    {content.title}
                  </h1>
                  <p className="text-primary/70">{content.subtitle}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <Button
                  variant="outline"
                  className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  {content.notifications.some((n) => n.isNew) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
                  )}
                </Button>

                {/* Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-black/90 border border-primary/30 rounded-md shadow-lg z-50">
                    <div className="p-3 border-b border-primary/20">
                      <h3 className="font-orbitron text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {content.notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-primary/10 hover:bg-primary/5 ${
                            notification.isNew ? "bg-primary/10" : ""
                          }`}
                        >
                          <p className="text-sm text-primary/90 mb-1">{notification.message}</p>
                          <p className="text-xs text-primary/50">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center">
                      <Button variant="ghost" size="sm" className="text-xs text-primary/70 hover:text-primary w-full">
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-primary/70">Welcome, {userName}</span>
                <Button variant="ghost" size="sm" className="text-primary/50 hover:text-primary" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div
            className="cyber-card p-6"
            style={{
              borderColor: content.color,
              boxShadow: `0 0 15px ${content.color}20`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${content.color}20`, color: content.color }}>
                {domain === "web" ? <Code className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
              </div>
              <div>
                <h2 className="text-xl font-orbitron mb-3" style={{ color: content.color }}>
                  <TerminalText text={`Hello ${userName || "there"}!`} speed={20} />
                </h2>
                <p className="text-primary/80">
                  <TerminalText text={content.welcomeMessage} speed={10} delay={1000} />
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="cyber-card p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-orbitron text-primary">Featured Resources</h2>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-primary/70 hover:text-primary hover:bg-primary/10"
                >
                  <Link href="/resources">
                    <span>View All</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {content.featuredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="p-4 border border-primary/20 rounded-md bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-primary">{resource.title}</h3>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{
                            backgroundColor: `${content.color}20`,
                            color: content.color,
                          }}
                        >
                          {resource.type}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-black/50" style={{ color: content.color }}>
                          {resource.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-primary/70">{resource.description}</p>
                    <div className="mt-3 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-xs text-primary/70 hover:text-primary">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="cyber-card p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-orbitron text-primary">Upcoming Events</h2>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-primary/70 hover:text-primary hover:bg-primary/10"
                >
                  <Link href="/events">
                    <span>View All</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {content.upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-primary/20 rounded-md bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-primary">{event.title}</h3>
                      <span
                        className="px-2 py-0.5 text-xs rounded-full"
                        style={{
                          backgroundColor: `${content.color}20`,
                          color: content.color,
                        }}
                      >
                        {event.type}
                      </span>
                    </div>
                    <p className="text-sm text-primary/70">{event.date}</p>
                    <div className="mt-3 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-xs text-primary/70 hover:text-primary">
                        Register
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-orbitron text-primary">Your Learning Path</h2>
              <Button variant="ghost" size="sm" className="text-primary/70 hover:text-primary hover:bg-primary/10">
                <span>View Details</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
              <div className="space-y-8 relative">
                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center z-10"
                    style={{ backgroundColor: content.color }}
                  >
                    <span className="text-black font-bold text-sm">1</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-medium text-primary mb-1">Fundamentals</h3>
                    <p className="text-sm text-primary/70">Master the core concepts and build a solid foundation.</p>
                    <div className="mt-2 w-full bg-primary/10 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: "100%", backgroundColor: content.color }}></div>
                    </div>
                    <p className="text-xs text-primary/50 mt-1">Completed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center z-10"
                    style={{ backgroundColor: content.color }}
                  >
                    <span className="text-black font-bold text-sm">2</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-medium text-primary mb-1">Intermediate Skills</h3>
                    <p className="text-sm text-primary/70">Expand your knowledge with more advanced techniques.</p>
                    <div className="mt-2 w-full bg-primary/10 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: "65%", backgroundColor: content.color }}></div>
                    </div>
                    <p className="text-xs text-primary/50 mt-1">65% Complete</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center z-10 bg-primary/20"
                    style={{ color: content.color }}
                  >
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-medium text-primary/70 mb-1">Advanced Topics</h3>
                    <p className="text-sm text-primary/50">Dive deep into specialized areas and become an expert.</p>
                    <div className="mt-2 w-full bg-primary/10 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: "0%", backgroundColor: content.color }}></div>
                    </div>
                    <p className="text-xs text-primary/50 mt-1">Locked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-12"
        >
          <div
            className="cyber-card p-6"
            style={{
              borderColor: content.secondaryColor,
              boxShadow: `0 0 15px ${content.secondaryColor}20`,
            }}
          >
            <h2 className="text-xl font-orbitron mb-4" style={{ color: content.secondaryColor }}>
              Join the Community
            </h2>
            <p className="text-primary/80 mb-6">
              Connect with fellow enthusiasts, share knowledge, and collaborate on projects.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="border-primary/30 text-primary hover:bg-primary/10" variant="outline">
                Discord Server
              </Button>
              <Button className="border-primary/30 text-primary hover:bg-primary/10" variant="outline">
                GitHub Organization
              </Button>
              <Button className="border-primary/30 text-primary hover:bg-primary/10" variant="outline">
                Discussion Forum
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
