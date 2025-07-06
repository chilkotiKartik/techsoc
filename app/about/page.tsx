"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Calendar, Award, BookOpen, Code, Globe, Zap } from "lucide-react"
import Link from "next/link"

// Team member interface
interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatarType: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

// Society stats interface
interface SocietyStat {
  id: string
  label: string
  value: string
  icon: React.ReactNode
  color: string
}

// Timeline event interface
interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

// Sample team members data
const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Aditya Sharma",
    role: "President",
    bio: "Computer Science enthusiast with a passion for AI and machine learning. Leading TechNova's initiatives to foster innovation.",
    avatarType: "mentor",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Vice President",
    bio: "Full-stack developer and cybersecurity expert. Organizing workshops and hackathons to build a stronger tech community.",
    avatarType: "developer",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "3",
    name: "Rahul Verma",
    role: "Technical Lead",
    bio: "Blockchain enthusiast and backend developer. Passionate about building scalable systems and mentoring junior developers.",
    avatarType: "hacker",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "4",
    name: "Ananya Singh",
    role: "Design Lead",
    bio: "UI/UX designer with a background in cognitive psychology. Creating intuitive and accessible interfaces for tech products.",
    avatarType: "designer",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "5",
    name: "Vikram Mehta",
    role: "Events Coordinator",
    bio: "IoT specialist and community builder. Organizing tech events that bring together students, professionals, and industry experts.",
    avatarType: "student",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "6",
    name: "Neha Gupta",
    role: "Content Lead",
    bio: "Technical writer and cloud computing expert. Creating educational content to help members develop their skills.",
    avatarType: "ai",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
]

// Society stats data
const societyStats: SocietyStat[] = [
  {
    id: "1",
    label: "Active Members",
    value: "500+",
    icon: <Users className="h-6 w-6" />,
    color: "#00ffff",
  },
  {
    id: "2",
    label: "Events Organized",
    value: "120+",
    icon: <Calendar className="h-6 w-6" />,
    color: "#ff00ff",
  },
  {
    id: "3",
    label: "Awards Won",
    value: "25+",
    icon: <Award className="h-6 w-6" />,
    color: "#00ff00",
  },
  {
    id: "4",
    label: "Resources Published",
    value: "300+",
    icon: <BookOpen className="h-6 w-6" />,
    color: "#ffff00",
  },
]

// Timeline events data
const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    year: "2018",
    title: "Foundation",
    description:
      "TechNova was founded by a group of passionate tech enthusiasts at IITM BS to create a community for innovation.",
    icon: <Code className="h-5 w-5" />,
    color: "#00ffff",
  },
  {
    id: "2",
    year: "2019",
    title: "First Hackathon",
    description:
      "Organized our first 48-hour hackathon with over 100 participants, establishing our presence in the tech community.",
    icon: <Zap className="h-5 w-5" />,
    color: "#ff00ff",
  },
  {
    id: "3",
    year: "2020",
    title: "Virtual Expansion",
    description: "Adapted to the pandemic by launching virtual workshops, webinars, and online coding competitions.",
    icon: <Globe className="h-5 w-5" />,
    color: "#00ff00",
  },
  {
    id: "4",
    year: "2021",
    title: "Industry Partnerships",
    description:
      "Established partnerships with leading tech companies to provide internship opportunities and mentorship programs.",
    icon: <Users className="h-5 w-5" />,
    color: "#ffff00",
  },
  {
    id: "5",
    year: "2022",
    title: "Tech Conference",
    description:
      "Hosted our first annual tech conference featuring keynote speakers from industry giants and innovative startups.",
    icon: <Calendar className="h-5 w-5" />,
    color: "#ff8800",
  },
  {
    id: "6",
    year: "2023",
    title: "Global Recognition",
    description:
      "Received recognition as one of the top student-led tech societies in the country with international participation.",
    icon: <Award className="h-5 w-5" />,
    color: "#00ff88",
  },
]

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron neon-text mb-6">About TechNova</h1>
            <p className="text-lg md:text-xl text-primary/80 mb-8 max-w-3xl mx-auto">
              <TerminalText
                text="The official technical society of IITM BS, fostering innovation, collaboration, and technical excellence."
                speed={20}
              />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-black/50 border border-primary/30 rounded-lg p-6">
                <h2 className="text-2xl font-orbitron neon-text mb-4">Our Mission</h2>
                <p className="text-primary/80 mb-4">
                  To create a vibrant community of tech enthusiasts who learn, innovate, and grow together. We aim to
                  bridge the gap between academic knowledge and industry requirements through hands-on projects,
                  workshops, and events.
                </p>
                <p className="text-primary/80">
                  TechNova provides a platform for students to explore emerging technologies, develop practical skills,
                  and connect with like-minded individuals and industry professionals.
                </p>
              </div>

              <div className="bg-black/50 border border-primary/30 rounded-lg p-6">
                <h2 className="text-2xl font-orbitron neon-text mb-4">Our Vision</h2>
                <p className="text-primary/80">
                  To be the leading student-run technical society that empowers the next generation of innovators and
                  technologists. We envision a community where creativity meets technical expertise, fostering solutions
                  to real-world problems and preparing members for successful careers in technology.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* 3D Society Logo/Emblem */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Central emblem */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <div className="relative w-32 h-32 hexagon bg-black/80 flex items-center justify-center border-2 border-primary">
                        <span className="text-4xl font-orbitron neon-text">TN</span>
                      </div>
                    </motion.div>

                    {/* Orbiting elements */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                          <Code className="h-6 w-6 text-cyan-400" />
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/50">
                          <Zap className="h-6 w-6 text-pink-400" />
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <motion.div
                        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                          <Globe className="h-6 w-6 text-green-400" />
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <motion.div
                        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                          <Award className="h-6 w-6 text-yellow-400" />
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                      <line x1="100" y1="100" x2="100" y2="0" stroke="#00ffff" strokeWidth="1" strokeDasharray="5,5" />
                      <line
                        x1="100"
                        y1="100"
                        x2="100"
                        y2="200"
                        stroke="#ff00ff"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                      <line x1="100" y1="100" x2="0" y2="100" stroke="#00ff00" strokeWidth="1" strokeDasharray="5,5" />
                      <line
                        x1="100"
                        y1="100"
                        x2="200"
                        y2="100"
                        stroke="#ffff00"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />

                      {/* Animated pulses along the lines */}
                      <circle cx="100" cy="50" r="3" fill="#00ffff">
                        <animate attributeName="cy" values="100;0;100" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="100" cy="150" r="3" fill="#ff00ff">
                        <animate attributeName="cy" values="100;200;100" dur="4s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="50" cy="100" r="3" fill="#00ff00">
                        <animate attributeName="cx" values="100;0;100" dur="3.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="150" cy="100" r="3" fill="#ffff00">
                        <animate attributeName="cx" values="100;200;100" dur="4.5s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Society Stats Section */}
      <section className="mb-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-orbitron neon-text mb-12 text-center"
          >
            TechNova in Numbers
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {societyStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="cyber-card p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                  >
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-orbitron mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </h3>
                <p className="text-primary/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-orbitron neon-text mb-12 text-center"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`relative flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-2 transform -translate-x-1/2 md:-translate-x-1/2 z-10"
                    style={{ borderColor: event.color, backgroundColor: `${event.color}30` }}
                  ></div>

                  {/* Year marker */}
                  <div className="w-full md:w-1/2 pb-8 md:pb-0 md:pr-12 md:pl-0 text-right flex flex-col items-center md:items-end">
                    <div
                      className="inline-block px-4 py-2 rounded-md mb-2"
                      style={{ backgroundColor: `${event.color}20`, color: event.color }}
                    >
                      {event.year}
                    </div>
                  </div>

                  {/* Event content */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-12 md:pr-0">
                    <div className="cyber-card p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="p-2 rounded-md flex-shrink-0"
                          style={{ backgroundColor: `${event.color}20`, color: event.color }}
                        >
                          {event.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-orbitron mb-2" style={{ color: event.color }}>
                            {event.title}
                          </h3>
                          <p className="text-primary/70 text-sm">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-orbitron neon-text mb-12 text-center"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="cyber-card p-6 flex flex-col items-center text-center"
              >
                <div className="mb-4">
                  <Avatar type={member.avatarType as any} size="lg" animated />
                </div>
                <h3 className="text-xl font-orbitron neon-text mb-1">{member.name}</h3>
                <p className="text-primary/70 mb-3">{member.role}</p>
                <p className="text-primary/60 text-sm mb-4">{member.bio}</p>
                <div className="flex gap-3 mt-auto">
                  {member.socialLinks.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/10 text-primary/70 hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  )}
                  {member.socialLinks.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/10 text-primary/70 hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/10 text-primary/70 hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="mb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="cyber-card p-8 text-center"
          >
            <h2 className="text-3xl font-orbitron neon-text mb-4">Join Our Community</h2>
            <p className="text-primary/80 max-w-2xl mx-auto mb-8">
              Become part of TechNova and connect with like-minded tech enthusiasts. Gain access to exclusive resources,
              events, and opportunities to enhance your skills and build your network.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="neon-border bg-primary/10 hover:bg-primary/20 text-primary group">
                <Link href="/join">
                  <span>Become a Member</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="neon-border-cyan bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/50 group"
              >
                <Link href="/contact">
                  <span>Contact Us</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
