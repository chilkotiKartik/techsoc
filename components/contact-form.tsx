"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TerminalText } from "@/components/terminal-text"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-orbitron neon-text mb-4">Message Sent!</h2>
          <p className="text-primary/70 mb-6">
            <TerminalText text="Thank you for reaching out. We'll get back to you soon." speed={20} />
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({ name: "", email: "", subject: "", message: "" })
            }}
            className="bg-primary/20 hover:bg-primary/30 text-primary"
          >
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary/70 mb-1">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-black/50 border-primary/30 text-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary/70 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-black/50 border-primary/30 text-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-primary/70 mb-1">
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="bg-black/50 border-primary/30 text-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-primary/70 mb-1">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-black/50 border-primary/30 text-primary min-h-[150px]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary/20 hover:bg-primary/30 text-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </div>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
