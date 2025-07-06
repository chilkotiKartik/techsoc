"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Sparkles, Rocket } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

export function NeoHero() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [viewportWidth, setViewportWidth] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 600])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Spring animations for smoother movement
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
  const springY1 = useSpring(y1, springConfig)
  const springY2 = useSpring(y2, springConfig)
  const springY3 = useSpring(y3, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleResize = () => {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
    }

    handleResize()
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Calculate parallax effect based on mouse position
  const calcParallaxX = (depth = 10) => {
    if (viewportWidth === 0) return 0
    const centerX = viewportWidth / 2
    return ((mousePosition.x - centerX) / centerX) * depth
  }

  const calcParallaxY = (depth = 10) => {
    if (viewportHeight === 0) return 0
    const centerY = viewportHeight / 2
    return ((mousePosition.y - centerY) / centerY) * depth
  }

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className={`absolute rounded-full ${isDark ? "bg-cyan-400" : "bg-pink-400"}`}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Larger glowing orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: isDark
                ? `radial-gradient(circle, rgba(0,255,255,${Math.random() * 0.1 + 0.05}) 0%, rgba(0,0,0,0) 70%)`
                : `radial-gradient(circle, rgba(255,105,180,${Math.random() * 0.1 + 0.05}) 0%, rgba(255,255,255,0) 70%)`,
              y: i % 2 === 0 ? springY2 : springY3,
            }}
          />
        ))}

        {/* Grid lines */}
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-grid-dark opacity-20" : "bg-grid-light opacity-10"
          } pointer-events-none`}
          style={{
            backgroundSize: "50px 50px",
            transform: `translateX(${calcParallaxX(5)}px) translateY(${calcParallaxY(5)}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ y: springY1 }}
          >
            <motion.div
              className={`mb-4 inline-flex items-center px-4 py-1.5 rounded-full backdrop-blur-sm ${
                isDark ? "bg-cyan-950/30 border border-cyan-700/30" : "bg-pink-50/80 border border-pink-200/50"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.span
                className={`animate-pulse mr-2 w-2 h-2 rounded-full ${isDark ? "bg-cyan-400" : "bg-pink-500"}`}
              ></motion.span>
              <span className={`text-xs font-satoshi ${isDark ? "text-cyan-300/80" : "text-pink-600/80"}`}>
                IITM BS Technical Society
              </span>
            </motion.div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-clash font-bold mb-6 ${
                isDark ? "text-cyan-300" : "text-pink-600"
              }`}
            >
              <TerminalText text="TechNova" speed={50} glitch={true} />
            </h1>

            <p className="text-xl md:text-2xl font-satoshi mb-8 max-w-xl">
              <TerminalText
                text="Empowering Tech Minds @ IITM BS"
                speed={20}
                delay={1000}
                className={isDark ? "text-cyan-300/80" : "text-gray-700"}
              />
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className={`group ${
                  isDark
                    ? "bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-700/50"
                    : "bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-300"
                } backdrop-blur-sm`}
              >
                <Link href="/join">
                  <Rocket className="mr-2 h-4 w-4" />
                  <span>Join the Orbit</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className={`group ${
                  isDark
                    ? "border-cyan-700/50 text-cyan-400 hover:bg-cyan-950/50"
                    : "border-pink-300 text-pink-600 hover:bg-pink-50"
                }`}
              >
                <Link href="/galaxy">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Explore Society</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center"
            style={{ y: springY2 }}
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* 3D Society Avatar with IITM BS Badge */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40"
                style={{
                  x: calcParallaxX(-15),
                  y: calcParallaxY(-15),
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    boxShadow: isDark
                      ? [
                          "0 0 20px rgba(0, 255, 255, 0.3)",
                          "0 0 40px rgba(0, 255, 255, 0.5)",
                          "0 0 20px rgba(0, 255, 255, 0.3)",
                        ]
                      : [
                          "0 0 20px rgba(255, 105, 180, 0.3)",
                          "0 0 40px rgba(255, 105, 180, 0.5)",
                          "0 0 20px rgba(255, 105, 180, 0.3)",
                        ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <Avatar type="ai" size="xl" animated />
              </motion.div>

              {/* Orbiting IITM BS Badge */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{
                  x: calcParallaxX(-10),
                  y: calcParallaxY(-10),
                }}
              >
                <motion.div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 p-2 rounded-full backdrop-blur-sm ${
                    isDark ? "bg-navy-900/80 border-2 border-cyan-700" : "bg-white/80 border-2 border-pink-300"
                  }`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className={`text-xs font-clash ${isDark ? "text-cyan-400" : "text-pink-600"}`}>IITM BS</span>
                </motion.div>
              </motion.div>

              {/* Animated tech orbit */}
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{
                  transform: `translateX(${calcParallaxX(-5)}px) translateY(${calcParallaxY(-5)}px)`,
                }}
              >
                {/* Outer circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={isDark ? "#00ffff" : "#ff69b4"}
                  strokeWidth="1"
                  className="animate-pulse"
                />

                {/* Middle circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke={isDark ? "#00ffff" : "#ff69b4"}
                  strokeWidth="1"
                  strokeDasharray="10,5"
                  className="animate-spin"
                  style={{ animationDuration: "30s" }}
                />

                {/* Inner circle */}
                <circle cx="100" cy="100" r="50" fill="none" stroke={isDark ? "#00ffff" : "#ff69b4"} strokeWidth="1" />

                {/* Grid lines */}
                <line
                  x1="10"
                  y1="100"
                  x2="190"
                  y2="100"
                  stroke={isDark ? "#00ffff" : "#ff69b4"}
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                />
                <line
                  x1="100"
                  y1="10"
                  x2="100"
                  y2="190"
                  stroke={isDark ? "#00ffff" : "#ff69b4"}
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                />

                {/* Diagonal grid lines */}
                <line
                  x1="30"
                  y1="30"
                  x2="170"
                  y2="170"
                  stroke={isDark ? "#00ffff" : "#ff69b4"}
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
                <line
                  x1="170"
                  y1="30"
                  x2="30"
                  y2="170"
                  stroke={isDark ? "#00ffff" : "#ff69b4"}
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />

                {/* Center emblem */}
                <polygon
                  points="100,60 120,90 100,120 80,90"
                  fill={isDark ? "#00ffff" : "#ff69b4"}
                  fillOpacity="0.2"
                  stroke={isDark ? "#00ffff" : "#ff69b4"}
                  strokeWidth="1"
                  className="animate-pulse"
                />

                {/* Orbiting dots */}
                <circle cx="100" cy="30" r="5" fill={isDark ? "#00ffff" : "#ff69b4"} className="animate-pulse">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 100 100"
                    to="360 100 100"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </circle>

                <circle cx="170" cy="100" r="5" fill={isDark ? "#0ff" : "#ff69b4"} className="animate-pulse">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 100 100"
                    to="360 100 100"
                    dur="15s"
                    repeatCount="indefinite"
                  />
                </circle>

                <circle cx="100" cy="170" r="5" fill={isDark ? "#0ff" : "#ff69b4"} className="animate-pulse">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 100 100"
                    to="360 100 100"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Binary code */}
                <text
                  x="50"
                  y="50"
                  fill={isDark ? "#00ffff" : "#ff69b4"}
                  fontSize="3"
                  fontFamily="monospace"
                  opacity="0.7"
                >
                  10110101
                </text>
                <text
                  x="130"
                  y="70"
                  fill={isDark ? "#00ffff" : "#ff69b4"}
                  fontSize="3"
                  fontFamily="monospace"
                  opacity="0.7"
                >
                  01001010
                </text>
                <text
                  x="70"
                  y="150"
                  fill={isDark ? "#00ffff" : "#ff69b4"}
                  fontSize="3"
                  fontFamily="monospace"
                  opacity="0.7"
                >
                  11001100
                </text>
                <text
                  x="140"
                  y="130"
                  fill={isDark ? "#00ffff" : "#ff69b4"}
                  fontSize="3"
                  fontFamily="monospace"
                  opacity="0.7"
                >
                  00110011
                </text>
              </svg>

              {/* Avatars around the circle */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translateX(calc(-50% + ${calcParallaxX(-20)}px)) translateY(calc(-50% + ${calcParallaxY(-20)}px))`,
                }}
              >
                <Avatar type="developer" size="md" animated />
              </div>
              <div
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translateX(calc(50% + ${calcParallaxX(20)}px)) translateY(calc(-50% + ${calcParallaxY(-20)}px))`,
                }}
              >
                <Avatar type="hacker" size="md" animated />
              </div>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                style={{
                  transform: `translateX(calc(-50% + ${calcParallaxX(-20)}px)) translateY(calc(50% + ${calcParallaxY(20)}px))`,
                }}
              >
                <Avatar type="mentor" size="md" animated />
              </div>
              <div
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translateX(calc(-50% + ${calcParallaxX(-20)}px)) translateY(calc(-50% + ${calcParallaxY(-20)}px))`,
                }}
              >
                <Avatar type="designer" size="md" animated />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className={`w-6 h-10 rounded-full border-2 ${isDark ? "border-cyan-500" : "border-pink-400"} flex justify-center`}
          >
            <motion.div
              className={`w-1.5 h-3 ${isDark ? "bg-cyan-400" : "bg-pink-500"} rounded-full mt-2`}
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
