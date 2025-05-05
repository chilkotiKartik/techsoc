"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AvatarProps {
  type?:
    | "hacker"
    | "ai"
    | "mentor"
    | "student"
    | "robot"
    | "cyborg"
    | "hologram"
    | "developer"
    | "designer"
    | "researcher"
    | "gamer"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
  onClick?: () => void
  glowing?: boolean
  badge?: string
}

export function Avatar({
  type = "hacker",
  size = "md",
  animated = true,
  className,
  onClick,
  glowing = false,
  badge,
}: AvatarProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const colorScheme = {
    hacker: {
      primary: "#954ce9",
      secondary: "#1a0933",
      accent: "#b985f4",
    },
    ai: {
      primary: "#00ffff",
      secondary: "#003333",
      accent: "#66ffff",
    },
    mentor: {
      primary: "#ff00ff",
      secondary: "#330033",
      accent: "#ff66ff",
    },
    student: {
      primary: "#ffff00",
      secondary: "#333300",
      accent: "#ffff66",
    },
    robot: {
      primary: "#ff5500",
      secondary: "#331100",
      accent: "#ff8844",
    },
    cyborg: {
      primary: "#0088ff",
      secondary: "#002244",
      accent: "#44aaff",
    },
    hologram: {
      primary: "#88ffff",
      secondary: "#004444",
      accent: "#aaffff",
    },
    developer: {
      primary: "#00ff88",
      secondary: "#003322",
      accent: "#66ffaa",
    },
    designer: {
      primary: "#ff0088",
      secondary: "#330022",
      accent: "#ff66aa",
    },
    researcher: {
      primary: "#8800ff",
      secondary: "#220033",
      accent: "#aa66ff",
    },
    gamer: {
      primary: "#ff8800",
      secondary: "#332200",
      accent: "#ffaa66",
    },
  }

  const colors = colorScheme[type]

  const floatAnimation = animated
    ? {
        y: [0, -5, 0],
        transition: {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
        },
      }
    : {}

  return (
    <motion.div
      className={cn("relative rounded-full overflow-hidden", sizeClasses[size], className)}
      animate={floatAnimation}
      onClick={onClick}
    >
      {glowing && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 5px rgba(149, 76, 233, 0.7)",
              "0 0 15px rgba(149, 76, 233, 0.7)",
              "0 0 5px rgba(149, 76, 233, 0.7)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      )}

      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background */}
        <circle cx="50" cy="50" r="50" fill={colors.secondary} />

        {/* Grid pattern */}
        <path
          d="M0,0 L100,100 M0,20 L80,100 M20,0 L100,80 M0,40 L60,100 M40,0 L100,60 M0,60 L40,100 M60,0 L100,40 M0,80 L20,100 M80,0 L100,20"
          stroke={colors.primary}
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />

        {/* Face elements based on type */}
        {type === "hacker" && (
          <>
            {/* Hacker mask */}
            <rect x="25" y="30" width="50" height="25" rx="5" fill="black" stroke={colors.primary} strokeWidth="1" />
            {/* Eyes */}
            <rect
              x="35"
              y="40"
              width="10"
              height="5"
              fill={colors.primary}
              className={animated ? "animate-pulse" : ""}
            />
            <rect
              x="55"
              y="40"
              width="10"
              height="5"
              fill={colors.primary}
              className={animated ? "animate-pulse" : ""}
            />
            {/* Mouth */}
            <path d="M40,65 Q50,70 60,65" stroke={colors.primary} strokeWidth="2" fill="transparent" />
            {/* Hood */}
            <path d="M25,30 Q50,10 75,30" stroke={colors.primary} strokeWidth="1" fill="none" strokeDasharray="3,2" />
          </>
        )}

        {type === "ai" && (
          <>
            {/* AI face */}
            <circle cx="50" cy="40" r="15" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Eyes */}
            <circle cx="42" cy="40" r="3" fill={colors.primary} className={animated ? "animate-pulse" : ""} />
            <circle cx="58" cy="40" r="3" fill={colors.primary} className={animated ? "animate-pulse" : ""} />
            {/* Circuit lines */}
            <path d="M35,60 H65 M40,65 H60 M45,70 H55" stroke={colors.primary} strokeWidth="2" />
            {/* Data flow */}
            <circle cx="30" cy="30" r="2" fill={colors.accent} className={animated ? "animate-pulse" : ""} />
            <circle cx="70" cy="30" r="2" fill={colors.accent} className={animated ? "animate-pulse" : ""} />
            <path d="M30,30 Q50,20 70,30" stroke={colors.accent} strokeWidth="1" fill="none" strokeDasharray="2,2" />
          </>
        )}

        {type === "mentor" && (
          <>
            {/* Mentor face */}
            <circle cx="50" cy="35" r="15" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Eyes */}
            <circle cx="43" cy="35" r="2" fill={colors.primary} />
            <circle cx="57" cy="35" r="2" fill={colors.primary} />
            {/* Smile */}
            <path d="M40,40 Q50,50 60,40" stroke={colors.primary} strokeWidth="2" fill="transparent" />
            {/* Glasses */}
            <rect x="38" y="32" width="10" height="6" rx="2" fill="none" stroke={colors.primary} strokeWidth="1" />
            <rect x="52" y="32" width="10" height="6" rx="2" fill="none" stroke={colors.primary} strokeWidth="1" />
            <line x1="48" y1="35" x2="52" y2="35" stroke={colors.primary} strokeWidth="1" />
            {/* Body */}
            <path d="M35,65 L50,55 L65,65" stroke={colors.primary} strokeWidth="2" fill="none" />
            {/* Bow tie */}
            <path
              d="M48,52 L52,52 L50,55 Z M48,58 L52,58 L50,55 Z"
              fill={colors.primary}
              stroke={colors.primary}
              strokeWidth="0.5"
            />
          </>
        )}

        {type === "student" && (
          <>
            {/* Student face */}
            <circle cx="50" cy="40" r="15" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Eyes */}
            <circle cx="43" cy="40" r="2" fill={colors.primary} />
            <circle cx="57" cy="40" r="2" fill={colors.primary} />
            {/* Neutral expression */}
            <line x1="43" y1="48" x2="57" y2="48" stroke={colors.primary} strokeWidth="2" />
            {/* Graduation cap */}
            <rect x="35" y="25" width="30" height="5" fill={colors.primary} />
            <polygon points="50,20 60,25 40,25" fill={colors.primary} />
            <line x1="50" y1="20" x2="65" y2="30" stroke={colors.primary} strokeWidth="1" />
            {/* Book */}
            <rect x="40" y="65" width="20" height="15" fill="none" stroke={colors.primary} strokeWidth="1" />
            <line x1="50" y1="65" x2="50" y2="80" stroke={colors.primary} strokeWidth="1" />
          </>
        )}

        {type === "robot" && (
          <>
            {/* Robot head */}
            <rect x="35" y="25" width="30" height="30" rx="2" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Eyes */}
            <rect
              x="40"
              y="35"
              width="6"
              height="6"
              fill={colors.primary}
              className={animated ? "animate-pulse" : ""}
            />
            <rect
              x="54"
              y="35"
              width="6"
              height="6"
              fill={colors.primary}
              className={animated ? "animate-pulse" : ""}
            />
            {/* Mouth */}
            <rect x="40" y="48" width="20" height="3" fill={colors.primary} />
            {/* Antenna */}
            <line x1="50" y1="25" x2="50" y2="15" stroke={colors.primary} strokeWidth="2" />
            <circle cx="50" cy="12" r="3" fill={colors.accent} className={animated ? "animate-pulse" : ""} />
            {/* Body */}
            <rect x="40" y="60" width="20" height="15" rx="2" fill="none" stroke={colors.primary} strokeWidth="1" />
            <line x1="45" y1="60" x2="45" y2="75" stroke={colors.primary} strokeWidth="1" />
            <line x1="55" y1="60" x2="55" y2="75" stroke={colors.primary} strokeWidth="1" />
          </>
        )}

        {type === "cyborg" && (
          <>
            {/* Cyborg face */}
            <circle cx="50" cy="40" r="15" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Cybernetic eye */}
            <circle cx="42" cy="40" r="5" fill="none" stroke={colors.primary} strokeWidth="1" />
            <circle cx="42" cy="40" r="2" fill={colors.primary} className={animated ? "animate-pulse" : ""} />
            {/* Human eye */}
            <circle cx="58" cy="40" r="2" fill={colors.primary} />
            {/* Mouth */}
            <path d="M40,48 H60" stroke={colors.primary} strokeWidth="1.5" />
            {/* Implants */}
            <rect x="30" y="30" width="5" height="5" fill={colors.accent} className={animated ? "animate-pulse" : ""} />
            <line x1="35" y1="32.5" x2="40" y2="32.5" stroke={colors.accent} strokeWidth="1" />
            {/* Circuits */}
            <path
              d="M30,50 Q40,60 50,65 Q60,70 70,65"
              stroke={colors.primary}
              strokeWidth="1"
              fill="none"
              strokeDasharray="2,1"
            />
          </>
        )}

        {type === "hologram" && (
          <>
            {/* Hologram face - more transparent */}
            <circle cx="50" cy="40" r="15" fill="none" stroke={colors.primary} strokeWidth="1" strokeDasharray="3,2" />
            {/* Eyes */}
            <circle cx="42" cy="40" r="3" fill="none" stroke={colors.primary} strokeWidth="1" />
            <circle cx="58" cy="40" r="3" fill="none" stroke={colors.primary} strokeWidth="1" />
            {/* Mouth */}
            <path d="M40,48 Q50,55 60,48" stroke={colors.primary} strokeWidth="1" fill="none" strokeDasharray="2,1" />
            {/* Holographic distortion lines */}
            <path
              d="M20,20 H80 M20,30 H80 M20,40 H80 M20,50 H80 M20,60 H80 M20,70 H80 M20,80 H80"
              stroke={colors.accent}
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            {/* Glitchy elements */}
            <rect
              x="45"
              y="35"
              width="10"
              height="3"
              fill={colors.accent}
              fillOpacity="0.5"
              className={animated ? "animate-pulse" : ""}
            />
            <rect
              x="55"
              y="45"
              width="8"
              height="2"
              fill={colors.accent}
              fillOpacity="0.5"
              className={animated ? "animate-pulse" : ""}
            />
          </>
        )}

        {type === "developer" && (
          <>
            {/* Developer face */}
            <circle cx="50" cy="40" r="15" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Eyes */}
            <rect x="42" y="38" width="5" height="5" rx="1" fill={colors.primary} />
            <rect x="53" y="38" width="5" height="5" rx="1" fill={colors.primary} />
            {/* Mouth */}
            <path d="M45,50 L55,50" stroke={colors.primary} strokeWidth="1.5" />
            {/* Headphones */}
            <path d="M35,40 C35,30 65,30 65,40" stroke={colors.primary} strokeWidth="1.5" fill="none" />
            <rect x="30" y="37" width="5" height="8" rx="2" fill={colors.primary} />
            <rect x="65" y="37" width="5" height="8" rx="2" fill={colors.primary} />
            {/* Code */}
            <path
              d="M35,65 L40,60 L35,55 M65,65 L60,60 L65,55 M45,70 L55,50"
              stroke={colors.primary}
              strokeWidth="1"
              fill="none"
            />
          </>
        )}

        {type === "designer" && (
          <>
            {/* Designer face */}
            <circle cx="50" cy="40" r="15" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Eyes */}
            <circle cx="43" cy="40" r="2" fill={colors.primary} />
            <circle cx="57" cy="40" r="2" fill={colors.primary} />
            {/* Smile */}
            <path d="M43,45 Q50,50 57,45" stroke={colors.primary} strokeWidth="1.5" fill="none" />
            {/* Beret */}
            <path d="M35,30 Q50,20 65,30 L60,35 Q50,30 40,35 Z" fill={colors.primary} />
            {/* Palette */}
            <circle cx="35" cy="60" r="8" fill="none" stroke={colors.primary} strokeWidth="1" />
            <circle cx="32" cy="57" r="2" fill={colors.accent} />
            <circle cx="38" cy="57" r="2" fill="#00ffff" />
            <circle cx="35" cy="63" r="2" fill="#ffff00" />
          </>
        )}

        {type === "researcher" && (
          <>
            {/* Researcher face */}
            <circle cx="50" cy="40" r="15" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Eyes */}
            <circle cx="43" cy="40" r="2" fill={colors.primary} />
            <circle cx="57" cy="40" r="2" fill={colors.primary} />
            {/* Thoughtful expression */}
            <path d="M43,48 Q50,46 57,48" stroke={colors.primary} strokeWidth="1.5" fill="none" />
            {/* Glasses */}
            <circle cx="43" cy="40" r="5" fill="none" stroke={colors.primary} strokeWidth="1" />
            <circle cx="57" cy="40" r="5" fill="none" stroke={colors.primary} strokeWidth="1" />
            <line x1="48" y1="40" x2="52" y2="40" stroke={colors.primary} strokeWidth="1" />
            {/* Lab flask */}
            <path d="M45,65 L40,75 H60 L55,65 M45,65 H55" fill="none" stroke={colors.primary} strokeWidth="1.5" />
            <path d="M45,70 Q50,68 55,70" stroke={colors.primary} strokeWidth="1" strokeDasharray="2,1" />
          </>
        )}

        {type === "gamer" && (
          <>
            {/* Gamer face */}
            <circle cx="50" cy="40" r="15" fill="none" stroke={colors.primary} strokeWidth="2" />
            {/* Eyes */}
            <rect x="40" y="38" width="7" height="5" rx="1" fill={colors.primary} />
            <rect x="53" y="38" width="7" height="5" rx="1" fill={colors.primary} />
            {/* Determined expression */}
            <path d="M43,48 L57,48" stroke={colors.primary} strokeWidth="2" />
            {/* Gaming headset */}
            <path d="M35,40 C35,30 65,30 65,40" stroke={colors.primary} strokeWidth="1.5" fill="none" />
            <rect x="30" y="37" width="5" height="8" rx="2" fill={colors.primary} />
            <rect x="65" y="37" width="5" height="8" rx="2" fill={colors.primary} />
            <path d="M65,41 L70,45" stroke={colors.primary} strokeWidth="1.5" />
            {/* Controller */}
            <rect x="40" y="65" width="20" height="10" rx="3" fill="none" stroke={colors.primary} strokeWidth="1.5" />
            <circle cx="45" cy="70" r="2" fill={colors.primary} />
            <circle cx="55" cy="70" r="2" fill={colors.primary} />
          </>
        )}

        {/* Glowing effect */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1"
          className={animated ? "animate-pulse" : ""}
        />
      </svg>

      {/* Badge if provided */}
      {badge && (
        <div className="absolute -top-1 -right-1 bg-primary text-black text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center badge-glow">
          {badge}
        </div>
      )}
    </motion.div>
  )
}
