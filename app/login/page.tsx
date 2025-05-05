"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LoginForm } from "@/components/auth/login-form"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("techNovaUser")
    if (user) {
      const userData = JSON.parse(user)
      if (userData.isLoggedIn && userData.domain) {
        router.push(`/dashboard/${userData.domain}`)
      }
    }

    setIsLoaded(true)
  }, [router])

  if (!isLoaded) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <LoginForm />
        </motion.div>
      </div>
    </div>
  )
}
