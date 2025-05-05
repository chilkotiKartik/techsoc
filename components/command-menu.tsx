"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const commands = [
    { id: "home", name: "Go to Home", path: "/" },
    { id: "galaxy", name: "Explore Galaxy", path: "/galaxy" },
    { id: "resources", name: "Browse Resources", path: "/resources" },
    { id: "labs", name: "Enter Labs", path: "/labs" },
    { id: "events", name: "View Events", path: "/events" },
    { id: "join", name: "Join TechVerse", path: "/join" },
    { id: "explorer", name: "Open Explorer", path: "/explorer" },
    { id: "mentors", name: "Find Mentors", path: "/mentors" },
  ]

  const filteredCommands = commands.filter((command) => command.name.toLowerCase().includes(searchQuery.toLowerCase()))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command menu with Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }

      if (isOpen) {
        // Close with Escape
        if (e.key === "Escape") {
          setIsOpen(false)
        }

        // Navigate with arrow keys
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : prev))
        }

        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        }

        // Execute command with Enter
        if (e.key === "Enter" && filteredCommands.length > 0) {
          e.preventDefault()
          executeCommand(filteredCommands[selectedIndex])
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands])

  const executeCommand = (command: (typeof commands)[0]) => {
    router.push(command.path)
    setIsOpen(false)
    setSearchQuery("")
    setSelectedIndex(0)
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 md:bottom-8 md:right-8">
        <Button
          variant="outline"
          size="sm"
          className="neon-border bg-black/80 backdrop-blur-md"
          onClick={() => setIsOpen(true)}
        >
          <Command className="h-4 w-4 mr-2" />
          <span className="text-xs">Press</span>
          <kbd className="pointer-events-none mx-1 inline-flex h-5 select-none items-center gap-1 rounded border border-primary/30 bg-primary/10 px-1.5 text-[10px] font-mono text-primary/70">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="fixed left-[50%] top-[40%] z-50 w-full max-w-lg -translate-x-[50%] -translate-y-[50%] p-4"
            >
              <div className="terminal-border overflow-hidden">
                <div className="terminal-header">
                  <div className="terminal-title">TechVerse Command Center</div>
                  <div className="terminal-controls">
                    <div className="terminal-control bg-red-500"></div>
                    <div className="terminal-control bg-yellow-500"></div>
                    <div className="terminal-control bg-green-500"></div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex items-center border border-primary/30 bg-black rounded-md mb-4">
                    <Command className="h-4 w-4 ml-2 text-primary/50" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setSelectedIndex(0)
                      }}
                      placeholder="Type a command or search..."
                      className="flex-1 bg-transparent border-0 focus:ring-0 text-sm text-primary p-2 placeholder:text-primary/50"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {filteredCommands.length === 0 ? (
                      <div className="py-6 text-center text-primary/50 text-sm">No commands found</div>
                    ) : (
                      <ul>
                        {filteredCommands.map((command, index) => (
                          <li key={command.id}>
                            <button
                              className={`w-full text-left px-2 py-2 rounded-md text-sm ${
                                selectedIndex === index
                                  ? "bg-primary/20 text-primary"
                                  : "text-primary/70 hover:bg-primary/10"
                              }`}
                              onClick={() => executeCommand(command)}
                              onMouseEnter={() => setSelectedIndex(index)}
                            >
                              {command.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
