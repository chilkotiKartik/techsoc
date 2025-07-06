"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Terminal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

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
    name: "Labs",
    path: "/labs",
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

export function NeoHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? "bg-navy-900/90 backdrop-blur-md border-b border-cyan-900/20"
            : "bg-white/90 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
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
                className={`w-8 h-8 rounded-md flex items-center justify-center border transition-colors ${
                  isDark
                    ? "bg-cyan-950/30 border-cyan-700/30 group-hover:border-cyan-500/60"
                    : "bg-pink-50 border-pink-200 group-hover:border-pink-300"
                }`}
              >
                <Terminal className={`h-5 w-5 ${isDark ? "text-cyan-400" : "text-pink-500"}`} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
                  isDark ? "bg-cyan-400" : "bg-pink-500"
                }`}
              ></motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <span
                className={`text-xl font-bold leading-none ${isDark ? "text-cyan-400" : "text-pink-600"} font-clash`}
              >
                TechNova
              </span>
              <span
                className={`text-[10px] leading-none font-satoshi ${isDark ? "text-cyan-500/70" : "text-pink-500/70"}`}
              >
                IITM BS Tech Society
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`px-3 py-2 font-satoshi text-sm transition-colors flex items-center ${
                      isDark ? "text-cyan-400/80 hover:text-cyan-300" : "text-gray-700 hover:text-pink-600"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-3 w-3" />
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        isDark ? "bg-cyan-400" : "bg-pink-500"
                      }`}
                    ></span>
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`px-3 py-2 font-satoshi text-sm transition-colors relative group ${
                      isDark ? "text-cyan-400/80 hover:text-cyan-300" : "text-gray-700 hover:text-pink-600"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        isDark ? "bg-cyan-400" : "bg-pink-500"
                      }`}
                    ></span>
                  </Link>
                )}

                {item.dropdown && activeDropdown === item.name && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-48 rounded-md overflow-hidden shadow-lg z-50 ${
                      isDark
                        ? "bg-navy-900/90 backdrop-blur-md border border-cyan-900/20"
                        : "bg-white/90 backdrop-blur-md border border-gray-200"
                    }`}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.path}
                        href={dropdownItem.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isDark
                            ? "text-cyan-400/80 hover:bg-cyan-950/50 hover:text-cyan-300"
                            : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                        }`}
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
              <Button
                variant="outline"
                className={`font-satoshi flex items-center gap-2 ${
                  isDark
                    ? "border-cyan-700/50 text-cyan-400 hover:bg-cyan-950/50"
                    : "border-pink-300 text-pink-600 hover:bg-pink-50"
                }`}
              >
                <Avatar type="hacker" size="xs" animated={false} />
                <span>Login</span>
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button onClick={toggleMenu} className={`focus:outline-none ${isDark ? "text-cyan-400" : "text-pink-600"}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${
              isDark ? "bg-navy-900/95 border-b border-cyan-900/20" : "bg-white/95 border-b border-gray-200"
            }`}
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
                        className={`flex justify-between items-center w-full py-2 transition-colors ${
                          isDark ? "text-cyan-400/80 hover:text-cyan-300" : "text-gray-700 hover:text-pink-600"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div
                          className={`pl-4 mt-2 space-y-2 ${
                            isDark ? "border-l border-cyan-800/20" : "border-l border-pink-100"
                          }`}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              href={dropdownItem.path}
                              className={`block py-2 transition-colors ${
                                isDark ? "text-cyan-400/70 hover:text-cyan-300" : "text-gray-600 hover:text-pink-600"
                              }`}
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
                      className={`block py-2 transition-colors ${
                        isDark ? "text-cyan-400/80 hover:text-cyan-300" : "text-gray-700 hover:text-pink-600"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div variants={item}>
                <Button
                  variant="outline"
                  className={`w-full font-satoshi flex items-center justify-center gap-2 ${
                    isDark
                      ? "border-cyan-700/50 text-cyan-400 hover:bg-cyan-950/50"
                      : "border-pink-300 text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  <Avatar type="hacker" size="xs" animated={false} />
                  <span>Login</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
