"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Terminal, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Tech Galaxy",
    path: "/galaxy",
  },
  {
    name: "Events",
    path: "/events",
  },
  {
    name: "Explore",
    path: "#",
    dropdown: [
      { name: "Clubs & Chapters", path: "/clubs" },
      { name: "Projects", path: "/projects" },
      { name: "Resources", path: "/resources" },
      { name: "Members & Mentors", path: "/members" },
    ],
  },
  {
    name: "Join Us",
    path: "/join",
  },
  {
    name: "Contact",
    path: "/contact",
  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userDomain, setUserDomain] = useState<string | null>(null)
  const router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("techNovaUser")
    if (user) {
      const userData = JSON.parse(user)
      if (userData.isLoggedIn) {
        setIsLoggedIn(true)
        setUserDomain(userData.domain)
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("techNovaUser")
    setIsLoggedIn(false)
    setUserDomain(null)
    router.push("/")
  }

  // Optimized animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-primary/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-colors"
              >
                <Terminal className="h-5 w-5 text-primary" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"
              ></motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <span className="neon-text text-xl font-bold leading-none">TechNova</span>
              <span className="text-[10px] text-primary/70 leading-none">IITM BS Tech Society</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="px-3 py-2 font-sora text-sm text-primary/80 hover:text-primary transition-colors flex items-center"
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-3 w-3" />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className="px-3 py-2 font-sora text-sm text-primary/80 hover:text-primary transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}

                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-md border border-primary/20 rounded-md overflow-hidden shadow-lg z-50">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.path}
                        href={dropdownItem.path}
                        className="block px-4 py-2 text-sm text-primary/80 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="ml-2 flex items-center space-x-2">
              <ThemeToggle />

              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="neon-border font-sora text-primary hover:bg-primary/10 flex items-center gap-2"
                  >
                    <Link href={`/dashboard/${userDomain}`}>
                      <Avatar type={userDomain === "web" ? "developer" : "hacker"} size="xs" animated={false} />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="text-primary/50 hover:text-primary hover:bg-primary/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="neon-border font-sora text-primary hover:bg-primary/10 flex items-center gap-2"
                >
                  <Link href="/login">
                    <Avatar type="hacker" size="xs" animated={false} />
                    <span>Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button onClick={toggleMenu} className="text-primary focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/95 border-b border-primary/20"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="container mx-auto px-4 py-4 flex flex-col space-y-4"
          >
            {navItems.map((item) => (
              <motion.div key={item.path} variants={item}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex justify-between items-center w-full py-2 text-primary/80 hover:text-primary transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4 mt-2 border-l border-primary/20 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            href={dropdownItem.path}
                            className="block py-2 text-primary/70 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className="block py-2 text-primary/80 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.div variants={item}>
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full neon-border font-sora text-primary hover:bg-primary/10 flex items-center justify-center gap-2"
                  >
                    <Link href={`/dashboard/${userDomain}`} onClick={() => setIsOpen(false)}>
                      <Avatar type={userDomain === "web" ? "developer" : "hacker"} size="xs" animated={false} />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-primary/50 hover:text-primary hover:bg-primary/10 flex items-center justify-center gap-2"
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="w-full neon-border font-sora text-primary hover:bg-primary/10 flex items-center justify-center gap-2"
                >
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Avatar type="hacker" size="xs" animated={false} />
                    <span>Login</span>
                  </Link>
                </Button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </header>
  )
}
