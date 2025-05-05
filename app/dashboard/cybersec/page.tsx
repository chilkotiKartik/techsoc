"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Bell, Shield, LogOut, Lock, AlertTriangle, Terminal, Database, Globe } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Cybersecurity content from the provided Obsidian vault
const cybersecurityContent = {
  title: "Cybersecurity",
  subtitle: "Defense, Offense & Analysis",
  welcomeMessage: "Welcome to the Cybersecurity domain! Explore the world of digital security and ethical hacking.",
  color: "#ff00ff",
  secondaryColor: "#ff0088",
  avatarType: "hacker",
  learningPaths: [
    {
      id: "1",
      title: "Cybersecurity Fundamentals",
      description: "Master the core concepts and principles of cybersecurity",
      progress: 35,
      modules: [
        "Introduction to Cybersecurity",
        "Security Principles",
        "Threat Landscape",
        "Basic Cryptography",
        "Network Security Basics",
      ],
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "Ethical Hacking",
      description: "Learn offensive security techniques and penetration testing",
      progress: 20,
      modules: [
        "Reconnaissance Techniques",
        "Vulnerability Scanning",
        "Exploitation Basics",
        "Web Application Security",
        "Post-Exploitation",
      ],
      icon: <Terminal className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "Defensive Security",
      description: "Protect systems and networks from cyber threats",
      progress: 15,
      modules: [
        "Security Architecture",
        "Intrusion Detection",
        "Incident Response",
        "Malware Analysis",
        "Security Monitoring",
      ],
      icon: <Lock className="h-5 w-5" />,
    },
  ],
  featuredResources: [
    {
      id: "1",
      title: "OWASP Top 10 Web Vulnerabilities",
      type: "Guide",
      difficulty: "Intermediate",
      description: "Learn about the most critical web application security risks and how to mitigate them.",
      link: "/resources/cybersec/owasp-top-10",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "Network Traffic Analysis",
      type: "Workshop",
      difficulty: "Advanced",
      description: "Master the techniques for analyzing network traffic to detect and investigate security incidents.",
      link: "/resources/cybersec/network-analysis",
      icon: <Database className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "Social Engineering Tactics",
      type: "Course",
      difficulty: "Beginner",
      description: "Understand the psychological manipulation techniques used in cyber attacks.",
      link: "/resources/cybersec/social-engineering",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
  ],
  upcomingEvents: [
    {
      id: "1",
      title: "Capture The Flag Competition",
      date: "June 20, 2025",
      type: "Competition",
      description: "Test your skills in this cybersecurity challenge with prizes for top performers.",
    },
    {
      id: "2",
      title: "Cybersecurity in the Cloud Era",
      date: "July 10, 2025",
      type: "Webinar",
      description: "Learn about securing cloud infrastructure and applications from industry experts.",
    },
    {
      id: "3",
      title: "Ethical Hacking Bootcamp",
      date: "July 25-27, 2025",
      type: "Workshop",
      description: "Intensive hands-on training in penetration testing and ethical hacking techniques.",
    },
  ],
  notifications: [
    {
      id: "1",
      message: "New vulnerability discovered in popular framework - CVE-2025-1234",
      time: "1 hour ago",
      isNew: true,
    },
    {
      id: "2",
      message: "Registration open for CTF Competition - Limited spots available!",
      time: "1 day ago",
      isNew: true,
    },
    {
      id: "3",
      message: "Security advisory: Update your systems to patch critical vulnerability",
      time: "2 days ago",
      isNew: false,
    },
  ],
  securityNews: [
    {
      id: "1",
      title: "Major Data Breach Affects Millions",
      source: "Cyber News Daily",
      date: "Today",
      snippet:
        "A major corporation has reported a data breach affecting millions of users. Personal information including names, emails, and encrypted passwords were compromised.",
    },
    {
      id: "2",
      title: "New Ransomware Variant Targeting Healthcare",
      source: "Security Weekly",
      date: "Yesterday",
      snippet:
        "Security researchers have identified a new ransomware variant specifically targeting healthcare organizations with sophisticated phishing campaigns.",
    },
    {
      id: "3",
      title: "Critical Zero-Day Vulnerability Patched",
      source: "Tech Security Report",
      date: "3 days ago",
      snippet:
        "Vendors have released emergency patches for a critical zero-day vulnerability that could allow remote code execution. Users are urged to update immediately.",
    },
  ],
  skillsMatrix: [
    { name: "Network Security", level: 75 },
    { name: "Web Application Security", level: 60 },
    { name: "Cryptography", level: 45 },
    { name: "Malware Analysis", level: 30 },
    { name: "Digital Forensics", level: 50 },
  ],
}

export default function CybersecDashboard() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("techNovaUser")
    if (!user) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(user)
    if (!userData.isLoggedIn || userData.domain !== "cybersec") {
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

  // Optimized rendering with reduced animations
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Domain Header */}
      <section
        className="py-8 mb-8 relative"
        style={{
          background: `linear-gradient(135deg, ${cybersecurityContent.color}10, ${cybersecurityContent.secondaryColor}10)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div {...fadeIn} transition={{ duration: 0.3 }} className="mb-6 md:mb-0">
              <div className="flex items-center gap-4">
                <Avatar type={cybersecurityContent.avatarType as any} size="lg" animated={false} />
                <div>
                  <h1 className="text-3xl md:text-4xl font-orbitron mb-2" style={{ color: cybersecurityContent.color }}>
                    {cybersecurityContent.title}
                  </h1>
                  <p className="text-primary/70">{cybersecurityContent.subtitle}</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.1 }} className="flex items-center gap-4">
              <div className="relative">
                <Button
                  variant="outline"
                  className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  {cybersecurityContent.notifications.some((n) => n.isNew) && (
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
                      {cybersecurityContent.notifications.map((notification) => (
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
        <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.2 }} className="mb-8">
          <div
            className="cyber-card p-6"
            style={{
              borderColor: cybersecurityContent.color,
              boxShadow: `0 0 15px ${cybersecurityContent.color}20`,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: `${cybersecurityContent.color}20`, color: cybersecurityContent.color }}
              >
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-orbitron mb-3" style={{ color: cybersecurityContent.color }}>
                  <TerminalText text={`Hello ${userName || "there"}!`} speed={20} />
                </h2>
                <p className="text-primary/80">
                  <TerminalText text={cybersecurityContent.welcomeMessage} speed={10} delay={500} />
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Learning Paths */}
          <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.3 }} className="lg:col-span-2">
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Your Learning Paths</CardTitle>
                <CardDescription>Continue your cybersecurity journey with these learning paths</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cybersecurityContent.learningPaths.map((path) => (
                    <div key={path.id} className="border border-primary/20 rounded-lg p-4 bg-black/30">
                      <div className="flex items-start gap-4">
                        <div
                          className="p-2 rounded-md"
                          style={{
                            backgroundColor: `${cybersecurityContent.color}20`,
                            color: cybersecurityContent.color,
                          }}
                        >
                          {path.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-primary">{path.title}</h3>
                            <span className="text-sm text-primary/70">{path.progress}% Complete</span>
                          </div>
                          <p className="text-sm text-primary/70 mb-3">{path.description}</p>
                          <Progress value={path.progress} className="h-1.5 mb-4" />
                          <div className="flex flex-wrap gap-2">
                            {path.modules.map((module, idx) => (
                              <span
                                key={idx}
                                className={`text-xs px-2 py-1 rounded-full ${
                                  idx < Math.ceil(path.modules.length * (path.progress / 100))
                                    ? "bg-primary/20 text-primary"
                                    : "bg-primary/5 text-primary/50"
                                }`}
                              >
                                {module}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="bg-primary/20 hover:bg-primary/30 text-primary w-full">
                  <Link href="/learning/cybersec">
                    <span>View All Learning Paths</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Skills Matrix */}
          <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.4 }}>
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Skills Matrix</CardTitle>
                <CardDescription>Your cybersecurity skills assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cybersecurityContent.skillsMatrix.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-primary/80">{skill.name}</span>
                        <span className="text-primary/60">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10 w-full"
                >
                  <Link href="/skills/assessment">
                    <span>Take Skills Assessment</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Featured Resources and Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Resources */}
          <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.5 }}>
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Featured Resources</CardTitle>
                <CardDescription>Curated cybersecurity learning materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cybersecurityContent.featuredResources.map((resource) => (
                    <Link href={resource.link} key={resource.id}>
                      <div className="border border-primary/20 rounded-lg p-4 bg-black/30 hover:bg-black/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div
                            className="p-2 rounded-md"
                            style={{
                              backgroundColor: `${cybersecurityContent.color}20`,
                              color: cybersecurityContent.color,
                            }}
                          >
                            {resource.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-primary">{resource.title}</h3>
                              <span
                                className="px-1.5 py-0.5 text-xs rounded-full"
                                style={{
                                  backgroundColor: `${cybersecurityContent.color}20`,
                                  color: cybersecurityContent.color,
                                }}
                              >
                                {resource.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-primary/70">{resource.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="bg-primary/20 hover:bg-primary/30 text-primary w-full">
                  <Link href="/resources/cybersec">
                    <span>Browse All Resources</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Security News */}
          <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.6 }}>
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Security News</CardTitle>
                <CardDescription>Latest cybersecurity news and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cybersecurityContent.securityNews.map((news) => (
                    <div key={news.id} className="border border-primary/20 rounded-lg p-4 bg-black/30">
                      <h3 className="text-primary mb-1">{news.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-primary/60 mb-2">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.date}</span>
                      </div>
                      <p className="text-sm text-primary/70">{news.snippet}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10 w-full"
                >
                  <Link href="/news/cybersec">
                    <span>View All Security News</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.7 }} className="mb-12">
          <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-primary">Upcoming Events</CardTitle>
              <CardDescription>Cybersecurity events, workshops, and competitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cybersecurityContent.upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-primary/20 rounded-lg p-4 bg-black/30">
                    <div className="flex flex-col h-full">
                      <div
                        className="text-sm px-2 py-1 rounded-full self-start mb-2"
                        style={{
                          backgroundColor: `${cybersecurityContent.color}20`,
                          color: cybersecurityContent.color,
                        }}
                      >
                        {event.type}
                      </div>
                      <h3 className="text-primary mb-1">{event.title}</h3>
                      <p className="text-sm text-primary/60 mb-2">{event.date}</p>
                      <p className="text-sm text-primary/70 mb-4 flex-1">{event.description}</p>
                      <Button size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary mt-auto">
                        Register
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                variant="outline"
                className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10 w-full"
              >
                <Link href="/events/cybersec">
                  <span>View All Events</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.8 }} className="mb-12">
          <div
            className="cyber-card p-6 text-center"
            style={{
              borderColor: cybersecurityContent.color,
              boxShadow: `0 0 15px ${cybersecurityContent.color}20`,
            }}
          >
            <h2 className="text-2xl font-orbitron mb-4" style={{ color: cybersecurityContent.color }}>
              Ready to Level Up Your Cybersecurity Skills?
            </h2>
            <p className="text-primary/80 mb-6 max-w-2xl mx-auto">
              Join our hands-on workshops, participate in CTF competitions, and connect with fellow security enthusiasts
              to enhance your skills.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-primary/20 hover:bg-primary/30 text-primary"
                style={{
                  borderColor: cybersecurityContent.color,
                }}
              >
                <span>Join Next Workshop</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
              >
                <span>Practice Lab</span>
                <Terminal className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
