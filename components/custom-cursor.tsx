"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    const handleButtonHoverStart = () => setButtonHovered(true)
    const handleButtonHoverEnd = () => setButtonHovered(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    const links = document.querySelectorAll("a")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart)
      link.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    const buttons = document.querySelectorAll("button")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleButtonHoverStart)
      button.addEventListener("mouseleave", handleButtonHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })

      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleButtonHoverStart)
        button.removeEventListener("mouseleave", handleButtonHoverEnd)
      })
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        animate={{
          x: position.x - (linkHovered || buttonHovered ? 15 : 5),
          y: position.y - (linkHovered || buttonHovered ? 15 : 5),
          scale: clicked ? 0.8 : linkHovered || buttonHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.5,
          stiffness: 400,
        }}
      >
        <motion.div
          className={`rounded-full ${
            linkHovered || buttonHovered ? "w-8 h-8 border-2 border-primary bg-transparent" : "w-3 h-3 bg-primary"
          }`}
          animate={{
            opacity: clicked ? 0.5 : 1,
            borderColor: buttonHovered ? "#00ffff" : "#00ff00",
          }}
        />
      </motion.div>
    </>
  )
}
