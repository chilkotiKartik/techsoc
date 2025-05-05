"use client"

import { useEffect, useRef, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()
  const [isLowPower, setIsLowPower] = useState(false)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  // Particle class with optimized rendering
  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    alpha: number
    connections: number[]

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 1.5 + 0.5
      this.speedX = (Math.random() - 0.5) * 0.3
      this.speedY = (Math.random() - 0.5) * 0.3
      this.color = "#00ff00"
      this.alpha = Math.random() * 0.5 + 0.1
      this.connections = []
    }

    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width) this.x = 0
      else if (this.x < 0) this.x = canvas.width
      if (this.y > canvas.height) this.y = 0
      else if (this.y < 0) this.y = canvas.height
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.globalAlpha = this.alpha
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }

  useEffect(() => {
    // Check if device is low-powered
    const checkDeviceCapabilities = () => {
      // Check for hardware concurrency
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setIsLowPower(true)
        return
      }

      // Check for battery API
      if ("getBattery" in navigator) {
        // @ts-ignore - getBattery exists but TypeScript doesn't know about it
        navigator
          .getBattery()
          .then((battery) => {
            if (battery.charging === false && battery.level < 0.2) {
              setIsLowPower(true)
            }
          })
          .catch(() => {
            // If we can't access battery info, assume it's not low power
          })
      }
    }

    checkDeviceCapabilities()
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions()
        initParticles()
      }, 200)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    // Create particles
    const initParticles = () => {
      const particleCount = isLowPower ? 15 : isMobile ? 30 : 60
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas))
      }
    }

    initParticles()

    // Animation loop with optimized rendering
    const animate = () => {
      // Clear only what's necessary
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(canvas)
        particlesRef.current[i].draw(ctx)
      }

      // Draw connections (only if not low power)
      if (!isLowPower) {
        ctx.strokeStyle = "#00ff00"
        ctx.lineWidth = 0.3

        // Only check connections for particles that are visible
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x
            const dy = particlesRef.current[i].y - particlesRef.current[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.globalAlpha = (100 - distance) / 1000
              ctx.beginPath()
              ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
              ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
              ctx.stroke()
            }
          }
        }
        ctx.globalAlpha = 1
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(resizeTimeout)
    }
  }, [isMobile, isLowPower])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}
