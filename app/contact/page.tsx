"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import { TerminalText } from "@/components/terminal-text"
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron neon-text mb-4">Contact Us</h1>
          <p className="text-lg text-primary/70 max-w-2xl mx-auto">
            <TerminalText text="Have questions or want to get involved? Reach out to the TechNova team." speed={20} />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="cyber-card p-6 mb-8">
              <h2 className="text-2xl font-orbitron neon-text mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-1">Email</h3>
                    <p className="text-primary/70">contact@technova.iitm.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-1">Location</h3>
                    <p className="text-primary/70">IIT Madras BS Program, Chennai, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-1">Phone</h3>
                    <p className="text-primary/70">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6">
              <h2 className="text-2xl font-orbitron neon-text mb-6">Connect With Us</h2>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="cyber-card p-6">
              <h2 className="text-2xl font-orbitron neon-text mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
