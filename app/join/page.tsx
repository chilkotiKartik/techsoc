"use client"

import Link from "next/link"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalText } from "@/components/terminal-text"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, User, Mail, Lock, Code, Github, Linkedin, Twitter, Check } from "lucide-react"

// Form steps
type FormStep = "welcome" | "personal" | "skills" | "avatar" | "complete"

// Skill options
const skillOptions = [
  { id: "frontend", label: "Frontend Development", icon: <Code className="h-4 w-4" /> },
  { id: "backend", label: "Backend Development", icon: <Code className="h-4 w-4" /> },
  { id: "ai", label: "AI & Machine Learning", icon: <Code className="h-4 w-4" /> },
  { id: "cybersec", label: "Cyber Security", icon: <Code className="h-4 w-4" /> },
  { id: "blockchain", label: "Blockchain", icon: <Code className="h-4 w-4" /> },
  { id: "cloud", label: "Cloud Computing", icon: <Code className="h-4 w-4" /> },
  { id: "iot", label: "IoT", icon: <Code className="h-4 w-4" /> },
  { id: "mobile", label: "Mobile Development", icon: <Code className="h-4 w-4" /> },
]

// Avatar customization options
const avatarTypes = ["hacker", "ai", "mentor", "student"]

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState<FormStep>("welcome")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: [] as string[],
    avatarType: "hacker",
    github: "",
    linkedin: "",
    twitter: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data
  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  // Toggle skill selection
  const toggleSkill = (skillId: string) => {
    setFormData((prev) => {
      const skills = prev.skills.includes(skillId)
        ? prev.skills.filter((id) => id !== skillId)
        : [...prev.skills, skillId]
      return { ...prev, skills }
    })
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setCurrentStep("complete")
  }

  // Go to next step
  const goToNextStep = () => {
    if (currentStep === "welcome") setCurrentStep("personal")
    else if (currentStep === "personal") setCurrentStep("skills")
    else if (currentStep === "skills") setCurrentStep("avatar")
    else if (currentStep === "avatar") handleSubmit()
  }

  // Go to previous step
  const goToPrevStep = () => {
    if (currentStep === "personal") setCurrentStep("welcome")
    else if (currentStep === "skills") setCurrentStep("personal")
    else if (currentStep === "avatar") setCurrentStep("skills")
  }

  // Check if current step is valid
  const isCurrentStepValid = () => {
    if (currentStep === "welcome") return true
    if (currentStep === "personal") {
      return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.password.trim() !== ""
    }
    if (currentStep === "skills") {
      return formData.skills.length > 0
    }
    if (currentStep === "avatar") {
      return true
    }
    return false
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-orbitron neon-text mb-4"
        >
          Join TechVerse
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-primary/70 max-w-2xl mx-auto"
        >
          Become part of our growing community of tech enthusiasts, innovators, and creators.
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            {["welcome", "personal", "skills", "avatar", "complete"].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    currentStep === step
                      ? "bg-primary text-black"
                      : ["complete", currentStep].indexOf(step as FormStep) >= 0 ||
                          ["complete", currentStep].indexOf(
                            ["welcome", "personal", "skills", "avatar", "complete"][index - 1] as FormStep,
                          ) >= 0
                        ? "bg-primary/20 text-primary border border-primary"
                        : "bg-primary/10 text-primary/50 border border-primary/30"
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`mt-2 text-xs ${currentStep === step ? "text-primary" : "text-primary/50"}`}>
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 h-1 bg-primary/10 w-full rounded-full"></div>
            <motion.div
              className="absolute top-0 left-0 h-1 bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width:
                  currentStep === "welcome"
                    ? "0%"
                    : currentStep === "personal"
                      ? "25%"
                      : currentStep === "skills"
                        ? "50%"
                        : currentStep === "avatar"
                          ? "75%"
                          : "100%",
              }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Form Steps */}
        <div className="terminal-border overflow-hidden">
          <div className="terminal-header">
            <div className="terminal-title">TechVerse Onboarding</div>
            <div className="terminal-controls">
              <div className="terminal-control bg-red-500"></div>
              <div className="terminal-control bg-yellow-500"></div>
              <div className="terminal-control bg-green-500"></div>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Welcome Step */}
              {currentStep === "welcome" && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center text-center mb-8">
                    <Avatar type="ai" size="xl" animated />
                    <h2 className="text-2xl font-orbitron neon-text mt-6 mb-4">Welcome to TechVerse</h2>
                    <TerminalText
                      text="We're excited to have you join our community of tech enthusiasts. Let's get you set up with your TechVerse identity."
                      className="text-primary/70 max-w-lg"
                      speed={20}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={goToNextStep}
                      className="neon-border bg-primary/10 hover:bg-primary/20 text-primary group"
                    >
                      <span>Begin Onboarding</span>
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Personal Information Step */}
              {currentStep === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-orbitron neon-text mb-6">Personal Information</h2>
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-primary/70 mb-1">Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-primary/50" />
                        </div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          placeholder="Enter your name"
                          className="w-full pl-10 pr-4 py-2 bg-black/50 border border-primary/30 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-primary placeholder:text-primary/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary/70 mb-1">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-primary/50" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-2 bg-black/50 border border-primary/30 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-primary placeholder:text-primary/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary/70 mb-1">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-primary/50" />
                        </div>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => updateFormData("password", e.target.value)}
                          placeholder="Create a password"
                          className="w-full pl-10 pr-4 py-2 bg-black/50 border border-primary/30 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-primary placeholder:text-primary/50"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={goToPrevStep}
                      className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      disabled={!isCurrentStepValid()}
                      className={`neon-border bg-primary/10 hover:bg-primary/20 text-primary group ${
                        !isCurrentStepValid() ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Skills Step */}
              {currentStep === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-orbitron neon-text mb-6">Your Tech Skills</h2>
                  <p className="text-primary/70 mb-4">Select the areas you're interested in or have experience with.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`flex items-center gap-3 p-3 rounded-md border transition-colors ${
                          formData.skills.includes(skill.id)
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-black/50 border-primary/30 text-primary/70 hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            formData.skills.includes(skill.id)
                              ? "bg-primary text-black"
                              : "bg-primary/10 text-primary/50"
                          }`}
                        >
                          {formData.skills.includes(skill.id) ? <Check className="h-4 w-4" /> : skill.icon}
                        </div>
                        <span>{skill.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={goToPrevStep}
                      className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      disabled={!isCurrentStepValid()}
                      className={`neon-border bg-primary/10 hover:bg-primary/20 text-primary group ${
                        !isCurrentStepValid() ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Avatar Step */}
              {currentStep === "avatar" && (
                <motion.div
                  key="avatar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-orbitron neon-text mb-6">Customize Your Avatar</h2>
                  <div className="flex flex-col items-center mb-8">
                    <div className="mb-6">
                      <Avatar type={formData.avatarType as any} size="xl" animated />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md">
                      {avatarTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateFormData("avatarType", type)}
                          className={`p-3 rounded-md border transition-colors ${
                            formData.avatarType === type
                              ? "bg-primary/20 border-primary"
                              : "bg-black/50 border-primary/30 hover:bg-primary/10"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Avatar type={type as any} size="md" animated={false} />
                            <span
                              className={`mt-2 text-xs capitalize ${
                                formData.avatarType === type ? "text-primary" : "text-primary/70"
                              }`}
                            >
                              {type}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-orbitron text-primary/80 mb-4">Social Profiles (Optional)</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Github className="h-5 w-5 text-primary/50" />
                        </div>
                        <input
                          type="text"
                          value={formData.github}
                          onChange={(e) => updateFormData("github", e.target.value)}
                          placeholder="GitHub username"
                          className="w-full pl-10 pr-4 py-2 bg-black/50 border border-primary/30 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-primary placeholder:text-primary/50"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Linkedin className="h-5 w-5 text-primary/50" />
                        </div>
                        <input
                          type="text"
                          value={formData.linkedin}
                          onChange={(e) => updateFormData("linkedin", e.target.value)}
                          placeholder="LinkedIn username"
                          className="w-full pl-10 pr-4 py-2 bg-black/50 border border-primary/30 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-primary placeholder:text-primary/50"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Twitter className="h-5 w-5 text-primary/50" />
                        </div>
                        <input
                          type="text"
                          value={formData.twitter}
                          onChange={(e) => updateFormData("twitter", e.target.value)}
                          placeholder="Twitter username"
                          className="w-full pl-10 pr-4 py-2 bg-black/50 border border-primary/30 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-primary placeholder:text-primary/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={goToPrevStep}
                      className="border-primary/30 text-primary/70 hover:text-primary hover:bg-primary/10"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="neon-border bg-primary/10 hover:bg-primary/20 text-primary group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
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
                          Processing...
                        </span>
                      ) : (
                        <>
                          <span>Complete Registration</span>
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Complete Step */}
              {currentStep === "complete" && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-primary/30 animate-pulse"></div>
                      <Avatar type={formData.avatarType as any} size="xl" animated />
                    </div>
                  </div>
                  <h2 className="text-2xl font-orbitron neon-text mb-4">Welcome to TechVerse, {formData.name}!</h2>
                  <div className="mb-6 inline-block px-4 py-2 bg-black/50 border border-primary/30 rounded-md">
                    <TerminalText
                      text={`> [ACCESS GRANTED] Agent ${formData.name} successfully registered.`}
                      className="text-primary"
                      speed={20}
                    />
                  </div>
                  <p className="text-primary/70 mb-8 max-w-lg mx-auto">
                    Your TechVerse journey begins now. Explore our resources, join labs, and connect with fellow tech
                    enthusiasts.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild className="neon-border bg-primary/10 hover:bg-primary/20 text-primary group">
                      <Link href="/galaxy">
                        <span>Explore Galaxy</span>
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="neon-border-purple bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/50 group"
                    >
                      <Link href="/labs">
                        <span>Enter Labs</span>
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
