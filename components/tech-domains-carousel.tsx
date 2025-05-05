"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Code, Shield, Cpu, Zap, Database, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

interface TechDomain {
  id: string
  name: string
  icon: React.ReactNode
  color: {
    light: string
    dark: string
  }
  avatarType: string
  description: string
}

export function TechDomainsCarousel() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeDomain, setActiveDomain] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  const techDomains: TechDomain[] = [
    {
      id: "ai",
      name: "Artificial Intelligence",
      icon: <Cpu className="h-5 w-5" />,
      color: {
        dark: "#00ffff",
        light: "#0ea5e9",
      },
      avatarType: "ai",
      description: "Explore machine learning, neural networks, computer vision, and natural language processing.",
    },
    {
      id: "web",
      name: "Web Development",
      icon: <Code className="h-5 w-5" />,
      color: {
        dark: "#954ce9",
        light: "#8b5cf6",
      },
      avatarType: "developer",
      description: "Master frontend and backend technologies to build modern, responsive web applications.",
    },
    {
      id: "cybersec",
      name: "Cyber Security",
      icon: <Shield className="h-5 w-5" />,
      color: {
        dark: "#ff00ff",
        light: "#ec4899",
      },
      avatarType: "hacker",
      description: "Learn ethical hacking, penetration testing, and how to protect systems from threats.",
    },
    {
      id: "iot",
      name: "Robotics & IoT",
      icon: <Zap className="h-5 w-5" />,
      color: {
        dark: "#ff8800",
        light: "#f59e0b",
      },
      avatarType: "robot",
      description: "Build smart devices and systems that bridge the physical and digital worlds.",
    },
    {
      id: "cloud",
      name: "Cloud Computing",
      icon: <Database className="h-5 w-5" />,
      color: {
        dark: "#00ff88",
        light: "#10b981",
      },
      avatarType: "cyborg",
      description: "Harness the power of cloud platforms for scalable, resilient applications.",
    },
    {
      id: "blockchain",
      name: "Blockchain",
      icon: <Globe className="h-5 w-5" />,
      color: {
        dark: "#ff0088",
        light: "#db2777",
      },
      avatarType: "designer",
      description: "Explore decentralized applications, smart contracts, and cryptocurrency technologies.",
    },
  ]

  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.clientWidth
        setCarouselWidth(containerWidth)

        // Calculate item width based on screen size
        let itemsPerView = 3
        if (window.innerWidth < 768) {
          itemsPerView = 1
        } else if (window.innerWidth < 1024) {
          itemsPerView = 2
        }

        const calculatedItemWidth = containerWidth / itemsPerView
        setItemWidth(calculatedItemWidth)

        // Calculate max index
        setMaxIndex(Math.max(0, techDomains.length - itemsPerView))
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [techDomains.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleDomainClick = (domainId: string) => {
    setActiveDomain(activeDomain === domainId ? null : domainId)
  }

  const domainColor = (domain: TechDomain) => {
    return isDark ? domain.color.dark : domain.color.light
  }

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-clash font-bold mb-4 ${isDark ? "text-cyan-300" : "text-pink-600"}`}
          >
            Tech Domains
          </h2>
          <p className={`max-w-2xl mx-auto font-satoshi ${isDark ? "text-cyan-300/70" : "text-gray-600"}`}>
            Explore specialized technology domains and find your area of interest.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 z-10">
            <Button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              variant="outline"
              size="icon"
              className={`rounded-full ${
                isDark
                  ? "bg-navy-900/50 border-cyan-700/50 text-cyan-400 hover:bg-cyan-950/50"
                  : "bg-white/50 border-pink-200 text-pink-600 hover:bg-pink-50"
              } backdrop-blur-sm ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 z-10">
            <Button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              variant="outline"
              size="icon"
              className={`rounded-full ${
                isDark
                  ? "bg-navy-900/50 border-cyan-700/50 text-cyan-400 hover:bg-cyan-950/50"
                  : "bg-white/50 border-pink-200 text-pink-600 hover:bg-pink-50"
              } backdrop-blur-sm ${currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              className="flex"
              animate={{ x: -currentIndex * itemWidth }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: `${techDomains.length * itemWidth}px` }}
            >
              {techDomains.map((domain) => (
                <motion.div
                  key={domain.id}
                  className="flex-shrink-0"
                  style={{ width: itemWidth }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="p-4">
                    <div
                      className={`h-full rounded-xl overflow-hidden backdrop-blur-sm ${
                        isDark ? "bg-navy-900/50 border border-cyan-900/50" : "bg-white/70 border border-pink-100"
                      } p-6 cursor-pointer transition-all duration-300`}
                      onClick={() => handleDomainClick(domain.id)}
                      style={{
                        boxShadow: activeDomain === domain.id ? `0 0 20px ${domainColor(domain)}40` : "none",
                        borderColor: activeDomain === domain.id ? domainColor(domain) : undefined,
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="p-3 rounded-md"
                          style={{
                            backgroundColor: `${domainColor(domain)}20`,
                            color: domainColor(domain),
                          }}
                        >
                          {domain.icon}
                        </div>
                        <Avatar
                          type={domain.avatarType as any}
                          size="sm"
                          animated={isHovering || activeDomain === domain.id}
                        />
                      </div>
                      <h3
                        className="text-xl font-clash font-bold mb-3 transition-transform"
                        style={{ color: domainColor(domain) }}
                      >
                        {domain.name}
                      </h3>
                      <p className={`text-sm mb-4 font-satoshi ${isDark ? "text-cyan-300/70" : "text-gray-600"}`}>
                        {domain.description}
                      </p>

                      <AnimatePresence>
                        {activeDomain === domain.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div
                              className="pt-4 mt-4 border-t border-dashed"
                              style={{ borderColor: `${domainColor(domain)}30` }}
                            >
                              <Link href={`/galaxy?domain=${domain.id}`}>
                                <Button
                                  className="w-full"
                                  style={{
                                    backgroundColor: `${domainColor(domain)}20`,
                                    color: domainColor(domain),
                                    borderColor: `${domainColor(domain)}50`,
                                  }}
                                  variant="outline"
                                >
                                  Explore {domain.name}
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? isDark
                      ? "bg-cyan-400 w-6"
                      : "bg-pink-500 w-6"
                    : isDark
                      ? "bg-cyan-800"
                      : "bg-pink-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
