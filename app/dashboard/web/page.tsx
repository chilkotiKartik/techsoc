"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Bell, Code, LogOut, Globe, Server, Layers, Star, Award, Cpu } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Web Development content
const webDevContent = {
  title: "Web Development",
  subtitle: "Frontend, Backend & Full-Stack",
  welcomeMessage: "Welcome to the Web Development domain! Explore the latest in web technologies and frameworks.",
  color: "#00ffff",
  secondaryColor: "#0088ff",
  avatarType: "developer",
  learningPaths: [
    {
      id: "1",
      title: "Frontend Development",
      description: "Master modern UI development with React, CSS, and more",
      progress: 45,
      modules: [
        "HTML & CSS Fundamentals",
        "JavaScript Essentials",
        "React Basics",
        "State Management",
        "Responsive Design",
      ],
      icon: <Globe className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "Backend Development",
      description: "Build robust server-side applications and APIs",
      progress: 30,
      modules: [
        "Node.js Fundamentals",
        "Express Framework",
        "Database Integration",
        "Authentication & Authorization",
        "API Design",
      ],
      icon: <Server className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "Full-Stack Development",
      description: "Combine frontend and backend skills for complete applications",
      progress: 25,
      modules: [
        "Full-Stack Architecture",
        "Next.js Framework",
        "Database Design",
        "Deployment Strategies",
        "Performance Optimization",
      ],
      icon: <Layers className="h-5 w-5" />,
    },
  ],
  featuredResources: [
    {
      id: "1",
      title: "Modern React with Next.js",
      type: "Course",
      difficulty: "Intermediate",
      description: "Learn how to build performant web applications with React and Next.js.",
      link: "/resources/web/nextjs-course",
      icon: <Code className="h-5 w-5" />,
    },
    {
      id: "2",
      title: "API Design Best Practices",
      type: "Guide",
      difficulty: "Advanced",
      description: "Design robust and scalable APIs following industry best practices.",
      link: "/resources/web/api-design",
      icon: <Server className="h-5 w-5" />,
    },
    {
      id: "3",
      title: "CSS Animation Masterclass",
      type: "Workshop",
      difficulty: "Beginner",
      description: "Create stunning animations and transitions using modern CSS techniques.",
      link: "/resources/web/css-animations",
      icon: <Globe className="h-5 w-5" />,
    },
  ],
  upcomingEvents: [
    {
      id: "1",
      title: "Frontend Framework Showdown",
      date: "June 15, 2025",
      type: "Workshop",
      description: "Compare popular frontend frameworks like React, Vue, and Angular in this interactive session.",
    },
    {
      id: "2",
      title: "Web Performance Optimization",
      date: "July 3, 2025",
      type: "Webinar",
      description: "Learn techniques to make your web applications lightning fast and responsive.",
    },
    {
      id: "3",
      title: "Fullstack Hackathon",
      date: "July 20-22, 2025",
      type: "Hackathon",
      description: "Build a complete web application in 48 hours and compete for prizes.",
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
  techNews: [
    {
      id: "1",
      title: "React 19 Released with New Features",
      source: "Web Dev Weekly",
      date: "Today",
      snippet: "The latest version of React brings performance improvements and new hooks for better state management.",
    },
    {
      id: "2",
      title: "Browser Vendors Agree on New Web Standard",
      source: "Tech Chronicle",
      date: "Yesterday",
      snippet:
        "Major browser vendors have reached consensus on a new web standard that will improve compatibility across platforms.",
    },
    {
      id: "3",
      title: "TypeScript 5.5 Introduces Game-Changing Features",
      source: "JavaScript Daily",
      date: "3 days ago",
      snippet:
        "The newest TypeScript release includes features that significantly improve developer experience and type safety.",
    },
  ],
  skillsMatrix: [
    { name: "HTML & CSS", level: 80 },
    { name: "JavaScript", level: 65 },
    { name: "React", level: 55 },
    { name: "Node.js", level: 40 },
    { name: "Database Design", level: 35 },
  ],
  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform with product catalog, shopping cart, and payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      difficulty: "Advanced",
      estimatedTime: "4 weeks",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Portfolio Website",
      description: "A responsive portfolio website to showcase your projects and skills",
      technologies: ["HTML", "CSS", "JavaScript"],
      difficulty: "Beginner",
      estimatedTime: "1 week",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Real-time Chat Application",
      description: "A chat application with real-time messaging using WebSockets",
      technologies: ["React", "Socket.io", "Express"],
      difficulty: "Intermediate",
      estimatedTime: "2 weeks",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  mentors: [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Frontend Specialist",
      expertise: ["React", "Vue", "UI/UX Design"],
      bio: "10+ years of experience in frontend development and teaching",
      avatarType: "mentor",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Full-Stack Developer",
      expertise: ["Node.js", "React", "MongoDB", "AWS"],
      bio: "Senior developer at a leading tech company with expertise in scalable applications",
      avatarType: "developer",
    },
    {
      id: "3",
      name: "Priya Sharma",
      role: "Backend Engineer",
      expertise: ["Python", "Django", "PostgreSQL", "System Design"],
      bio: "Backend specialist with focus on high-performance and secure applications",
      avatarType: "student",
    },
  ],
  timeCapsuleLessons: [
    {
      id: "1",
      title: "Building Your First React Component",
      description: "Learn the fundamentals of React components and JSX",
      duration: "30 minutes",
      xpReward: 100,
      tasks: [
        "Create a functional React component",
        "Add props to your component",
        "Implement state using useState",
        "Handle events in your component",
      ],
    },
    {
      id: "2",
      title: "CSS Grid Layout Mastery",
      description: "Master CSS Grid for complex layouts",
      duration: "45 minutes",
      xpReward: 150,
      tasks: [
        "Create a basic grid layout",
        "Implement responsive grid areas",
        "Use grid template areas for layout",
        "Create a complex dashboard layout",
      ],
    },
    {
      id: "3",
      title: "API Integration with Fetch",
      description: "Learn how to fetch data from APIs and handle responses",
      duration: "60 minutes",
      xpReward: 200,
      tasks: [
        "Make a basic GET request",
        "Handle API responses and errors",
        "Implement loading states",
        "Create a searchable API interface",
      ],
    },
  ],
}

export default function WebDevDashboard() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userXp, setUserXp] = useState(0)
  const [userLevel, setUserLevel] = useState(1)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showTimeCapsule, setShowTimeCapsule] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("techNovaUser")
    if (!user) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(user)
    if (!userData.isLoggedIn || userData.domain !== "web") {
      router.push("/login")
      return
    }

    setUserName(userData.name)
    setUserXp(userData.xp || 0)
    setUserLevel(userData.level || 1)
    setIsLoaded(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("techNovaUser")
    router.push("/login")
  }

  const startLesson = (lesson: any) => {
    setSelectedLesson(lesson)
    setShowTimeCapsule(true)
  }

  const handleLessonComplete = (xpEarned: number) => {
    const newXp = userXp + xpEarned
    const newLevel = Math.floor(newXp / 500) + 1 // Simple level calculation

    // Update user data
    const user = localStorage.getItem("techNovaUser")
    if (user) {
      const userData = JSON.parse(user)
      userData.xp = newXp
      userData.level = newLevel
      localStorage.setItem("techNovaUser", JSON.stringify(userData))
    }

    setUserXp(newXp)
    setUserLevel(newLevel)
    setShowTimeCapsule(false)
  }

  // Optimized rendering with reduced animations
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Domain Header with animated background */}
      <section className="py-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20" />
          {/* Code particles animation */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xs font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: webDevContent.color,
                opacity: Math.random() * 0.7 + 0.1,
              }}
              animate={{
                y: [0, 100],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            >
              {i % 3 === 0 ? "<div>" : i % 3 === 1 ? "function()" : "const {}"}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div {...fadeIn} transition={{ duration: 0.3 }} className="mb-6 md:mb-0">
              <div className="flex items-center gap-4">
                <Avatar type={webDevContent.avatarType as any} size="lg" animated={false} />
                <div>
                  <h1 className="text-3xl md:text-4xl font-orbitron mb-2" style={{ color: webDevContent.color }}>
                    {webDevContent.title}
                  </h1>
                  <p className="text-primary/70">{webDevContent.subtitle}</p>
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
                  {webDevContent.notifications.some((n) => n.isNew) && (
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
                      {webDevContent.notifications.map((notification) => (
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
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-primary/70">Level {userLevel}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">{userXp} XP</span>
                  </div>
                  <span className="text-primary/70 text-sm">Welcome, {userName}</span>
                </div>
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
              borderColor: webDevContent.color,
              boxShadow: `0 0 15px ${webDevContent.color}20`,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: `${webDevContent.color}20`, color: webDevContent.color }}
              >
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-orbitron mb-3" style={{ color: webDevContent.color }}>
                  <TerminalText text={`Hello ${userName || "there"}!`} speed={20} />
                </h2>
                <p className="text-primary/80">
                  <TerminalText text={webDevContent.welcomeMessage} speed={10} delay={500} />
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Time Capsule Lessons */}
        <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.3 }} className="mb-12">
          <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-orbitron text-primary">Time Capsule Learning</CardTitle>
                  <CardDescription>Interactive AI-guided lessons to boost your skills</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-primary/70">Earn XP and level up!</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {webDevContent.timeCapsuleLessons.map((lesson) => (
                  <div key={lesson.id} className="border border-primary/20 rounded-lg p-4 bg-black/30">
                    <div className="flex flex-col h-full">
                      <div
                        className="text-sm px-2 py-1 rounded-full self-start mb-2"
                        style={{
                          backgroundColor: `${webDevContent.color}20`,
                          color: webDevContent.color,
                        }}
                      >
                        {lesson.duration}
                      </div>
                      <h3 className="text-primary mb-1">{lesson.title}</h3>
                      <p className="text-sm text-primary/70 mb-4 flex-1">{lesson.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-400" />
                          <span className="text-xs text-primary/70">{lesson.xpReward} XP</span>
                        </div>
                        <span className="text-xs text-primary/50">{lesson.tasks.length} tasks</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary/20 hover:bg-primary/30 text-primary mt-auto"
                        onClick={() => startLesson(lesson)}
                      >
                        Start Lesson
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Learning Paths */}
          <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.4 }} className="lg:col-span-2">
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Your Learning Paths</CardTitle>
                <CardDescription>Continue your web development journey with these learning paths</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {webDevContent.learningPaths.map((path) => (
                    <div key={path.id} className="border border-primary/20 rounded-lg p-4 bg-black/30">
                      <div className="flex items-start gap-4">
                        <div
                          className="p-2 rounded-md"
                          style={{ backgroundColor: `${webDevContent.color}20`, color: webDevContent.color }}
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
                  <Link href="/learning/web">
                    <span>View All Learning Paths</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Skills Matrix */}
          <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.5 }}>
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Skills Matrix</CardTitle>
                <CardDescription>Your web development skills assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webDevContent.skillsMatrix.map((skill) => (
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
          <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.6 }}>
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Featured Resources</CardTitle>
                <CardDescription>Curated web development learning materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webDevContent.featuredResources.map((resource) => (
                    <Link href={resource.link} key={resource.id}>
                      <div className="border border-primary/20 rounded-lg p-4 bg-black/30 hover:bg-black/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div
                            className="p-2 rounded-md"
                            style={{ backgroundColor: `${webDevContent.color}20`, color: webDevContent.color }}
                          >
                            {resource.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-primary">{resource.title}</h3>
                              <span
                                className="px-1.5 py-0.5 text-xs rounded-full"
                                style={{
                                  backgroundColor: `${webDevContent.color}20`,
                                  color: webDevContent.color,
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
                  <Link href="/resources/web">
                    <span>Browse All Resources</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Tech News */}
          <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.7 }}>
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">Tech News</CardTitle>
                <CardDescription>Latest web development news and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webDevContent.techNews.map((news) => (
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
                  <Link href="/news/web">
                    <span>View All Tech News</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.8 }} className="mb-12">
          <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-primary">Upcoming Events</CardTitle>
              <CardDescription>Web development events, workshops, and hackathons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {webDevContent.upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-primary/20 rounded-lg p-4 bg-black/30">
                    <div className="flex flex-col h-full">
                      <div
                        className="text-sm px-2 py-1 rounded-full self-start mb-2"
                        style={{
                          backgroundColor: `${webDevContent.color}20`,
                          color: webDevContent.color,
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
                <Link href="/events/web">
                  <span>View All Events</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div {...fadeIn} transition={{ duration: 0.3, delay: 0.9 }} className="mb-12">
          <div
            className="cyber-card p-6 text-center"
            style={{
              borderColor: webDevContent.color,
              boxShadow: `0 0 15px ${webDevContent.color}20`,
            }}
          >
            <h2 className="text-2xl font-orbitron mb-4" style={{ color: webDevContent.color }}>
              Ready to Build Amazing Web Applications?
            </h2>
            <p className="text-primary/80 mb-6 max-w-2xl mx-auto">
              Join our coding workshops, collaborate on projects, and connect with fellow developers to enhance your
              skills.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-primary/20 hover:bg-primary/30 text-primary"
                style={{
                  borderColor: webDevContent.color,
                }}
              >
                <span>Join Next Workshop</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
              >
                <span>Coding Playground</span>
                <Cpu className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
