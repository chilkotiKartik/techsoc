"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginStep, setLoginStep] = useState<"credentials" | "domain">("credentials")
  const [selectedDomain, setSelectedDomain] = useState<"web" | "cybersec" | null>(null)
  const router = useRouter()

  // Demo credentials
  const DEMO_EMAIL = "1234@ds.study.iitm.ac.in"
  const DEMO_PASSWORD = "12345"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setLoginStep("domain")
    } else {
      setError("Invalid credentials. Try the demo: 1234@ds.study.iitm.ac.in / 12345")
    }

    setIsLoading(false)
  }

  const handleDomainSelection = async (domain: "web" | "cybersec") => {
    setSelectedDomain(domain)
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user info and domain preference in localStorage
    localStorage.setItem(
      "techNovaUser",
      JSON.stringify({
        email,
        name: email.split("@")[0],
        domain,
        isLoggedIn: true,
      }),
    )

    // Redirect to dashboard with the selected domain
    router.push(`/dashboard/${domain}`)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {loginStep === "credentials" ? (
          <motion.div
            key="credentials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 text-center">
              <div className="flex justify-center mb-4">
                <Avatar type="ai" size="lg" animated />
              </div>
              <h2 className="text-2xl font-orbitron neon-text mb-2">Access TechNova Portal</h2>
              <p className="text-primary/70">
                <TerminalText text="Enter your credentials to continue" speed={20} />
              </p>
            </div>

            <div className="cyber-card p-6">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary/70 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-primary/50" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-black/50 border-primary/30 text-primary"
                        placeholder="1234@ds.study.iitm.ac.in"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-primary/70 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-primary/50" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-black/50 border-primary/30 text-primary"
                        placeholder="••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary/50 hover:text-primary"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm p-2 bg-red-400/10 border border-red-400/20 rounded">
                      {error}
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-primary/20 hover:bg-primary/30 text-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Authenticating...
                        </div>
                      ) : (
                        <span>Login</span>
                      )}
                    </Button>
                  </div>

                  <div className="text-center text-xs text-primary/50 mt-4">
                    <p>Demo Credentials:</p>
                    <p>Email: 1234@ds.study.iitm.ac.in</p>
                    <p>Password: 12345</p>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="domain"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-orbitron neon-text mb-2">Choose Your Domain</h2>
              <p className="text-primary/70">
                <TerminalText text="Select your primary area of interest" speed={20} />
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Web Development Domain */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className={`cyber-card p-6 cursor-pointer transition-all ${
                  selectedDomain === "web" ? "border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.3)]" : ""
                }`}
                onClick={() => handleDomainSelection("web")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-cyan-500/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cyan-400"
                    >
                      <path d="m18 16 4-4-4-4" />
                      <path d="m6 8-4 4 4 4" />
                      <path d="m14.5 4-5 16" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-orbitron neon-text-cyan mb-2">Web Development</h3>
                  <p className="text-primary/70 mb-4">
                    Frontend, backend, full-stack development, and modern web technologies.
                  </p>
                  <Button
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                    onClick={() => handleDomainSelection("web")}
                    disabled={isLoading}
                  >
                    {isLoading && selectedDomain === "web" ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-cyan-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <span>Select Web Development</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Cybersecurity Domain */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className={`cyber-card p-6 cursor-pointer transition-all ${
                  selectedDomain === "cybersec" ? "border-pink-500 shadow-[0_0_15px_rgba(255,0,255,0.3)]" : ""
                }`}
                onClick={() => handleDomainSelection("cybersec")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-pink-500/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-pink-400"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-orbitron neon-text-pink mb-2">Cybersecurity</h3>
                  <p className="text-primary/70 mb-4">
                    Network security, ethical hacking, penetration testing, and digital forensics.
                  </p>
                  <Button
                    className="bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30"
                    onClick={() => handleDomainSelection("cybersec")}
                    disabled={isLoading}
                  >
                    {isLoading && selectedDomain === "cybersec" ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-pink-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <span>Select Cybersecurity</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
