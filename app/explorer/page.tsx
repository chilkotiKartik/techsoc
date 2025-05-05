"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { Folder, FileText } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface CommandResult {
  type: "text" | "error" | "success" | "file" | "directory" | "avatar" | "help"
  content: string
  metadata?: any
}

export default function ExplorerPage() {
  const searchParams = useSearchParams()
  const initialDomain = searchParams.get("domain")

  const [input, setInput] = useState("")
  const [history, setHistory] = useState<{ command: string; result: CommandResult[] }[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentDirectory, setCurrentDirectory] = useState("/")
  const [showWelcome, setShowWelcome] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // File system structure
  const fileSystem = {
    "/": {
      type: "directory",
      children: ["home", "projects", "resources", "events", "about.txt"],
    },
    "/home": {
      type: "directory",
      children: ["welcome.txt", "getting-started.md"],
    },
    "/projects": {
      type: "directory",
      children: ["ai", "cybersec", "web", "blockchain", "cloud", "iot"],
    },
    "/projects/ai": {
      type: "directory",
      children: ["ml-basics.py", "neural-networks.md", "computer-vision.txt"],
    },
    "/projects/cybersec": {
      type: "directory",
      children: ["ethical-hacking.md", "penetration-testing.sh", "security-tools.txt"],
    },
    "/projects/web": {
      type: "directory",
      children: ["frontend.js", "backend.js", "fullstack.md"],
    },
    "/projects/blockchain": {
      type: "directory",
      children: ["smart-contracts.sol", "crypto.md", "web3.js"],
    },
    "/projects/cloud": {
      type: "directory",
      children: ["aws.md", "azure.txt", "gcp.md"],
    },
    "/projects/iot": {
      type: "directory",
      children: ["sensors.md", "arduino.ino", "raspberry-pi.py"],
    },
    "/resources": {
      type: "directory",
      children: ["tutorials", "documentation", "tools"],
    },
    "/resources/tutorials": {
      type: "directory",
      children: ["beginner", "intermediate", "advanced"],
    },
    "/events": {
      type: "directory",
      children: ["upcoming.md", "past.md", "hackathons.txt"],
    },
    "/home/welcome.txt": {
      type: "file",
      content: "Welcome to TechVerse Explorer Terminal! Type 'help' to see available commands.",
    },
    "/home/getting-started.md": {
      type: "file",
      content:
        "# Getting Started with TechVerse\n\n1. Explore the file system using 'ls' and 'cd' commands\n2. Check out projects in the /projects directory\n3. View upcoming events in /events/upcoming.md\n4. Run 'help' for more commands",
    },
    "/about.txt": {
      type: "file",
      content:
        "TechVerse is the digital frontier of IITM BS Cyber Society. Our mission is to foster a community of tech enthusiasts, innovators, and creators.",
    },
    "/events/upcoming.md": {
      type: "file",
      content:
        "# Upcoming Events\n\n## ByteBurst Hackathon 2.0\nDate: June 15-17, 2025\nLocation: Virtual\nDescription: 48-hour coding challenge with amazing prizes.\n\n## AI Workshop Series\nDate: July 5-7, 2025\nLocation: Online\nDescription: Learn the fundamentals of AI and machine learning.",
    },
  }

  // Available commands
  const commands = {
    help: () => {
      return [
        {
          type: "help",
          content: "Available commands:",
          metadata: {
            commands: [
              { name: "ls", description: "List directory contents" },
              { name: "cd [directory]", description: "Change directory" },
              { name: "cat [file]", description: "Display file contents" },
              { name: "clear", description: "Clear the terminal" },
              { name: "pwd", description: "Print working directory" },
              { name: "echo [text]", description: "Print text to the terminal" },
              { name: "whoami", description: "Display current user" },
              { name: "sudo [command]", description: "Execute command with superuser privileges" },
              { name: "exit", description: "Exit the terminal" },
            ],
          },
        },
      ]
    },
    ls: (args: string[] = []) => {
      const path = args.length > 0 ? resolvePath(args[0]) : currentDirectory
      if (!fileSystem[path]) {
        return [{ type: "error", content: `ls: cannot access '${path}': No such file or directory` }]
      }

      if (fileSystem[path].type === "file") {
        return [{ type: "text", content: path.split("/").pop() || "" }]
      }

      return [
        {
          type: "directory",
          content: "Contents of " + path,
          metadata: {
            items: fileSystem[path].children.map((item) => {
              const fullPath = path === "/" ? `/${item}` : `${path}/${item}`
              const isDirectory = fileSystem[fullPath] && fileSystem[fullPath].type === "directory"
              return {
                name: item,
                isDirectory,
              }
            }),
          },
        },
      ]
    },
    cd: (args: string[] = []) => {
      if (args.length === 0 || args[0] === "~") {
        setCurrentDirectory("/home")
        return [{ type: "text", content: "Changed directory to /home" }]
      }

      const path = resolvePath(args[0])

      if (!fileSystem[path]) {
        return [{ type: "error", content: `cd: no such file or directory: ${args[0]}` }]
      }

      if (fileSystem[path].type !== "directory") {
        return [{ type: "error", content: `cd: not a directory: ${args[0]}` }]
      }

      setCurrentDirectory(path)
      return [{ type: "text", content: `Changed directory to ${path}` }]
    },
    cat: (args: string[] = []) => {
      if (args.length === 0) {
        return [{ type: "error", content: "cat: missing file operand" }]
      }

      const path = resolvePath(args[0])

      if (!fileSystem[path]) {
        return [{ type: "error", content: `cat: ${args[0]}: No such file or directory` }]
      }

      if (fileSystem[path].type !== "file") {
        return [{ type: "error", content: `cat: ${args[0]}: Is a directory` }]
      }

      return [{ type: "file", content: fileSystem[path].content }]
    },
    clear: () => {
      setHistory([])
      return []
    },
    pwd: () => {
      return [{ type: "text", content: currentDirectory }]
    },
    echo: (args: string[] = []) => {
      return [{ type: "text", content: args.join(" ") }]
    },
    whoami: () => {
      return [{ type: "text", content: "guest@techverse" }]
    },
    sudo: (args: string[] = []) => {
      if (args.length === 0) {
        return [{ type: "error", content: "sudo: missing command operand" }]
      }

      if (args[0] === "hack") {
        return [
          { type: "text", content: "Initiating hack sequence..." },
          { type: "text", content: "Accessing mainframe..." },
          { type: "text", content: "Bypassing security protocols..." },
          { type: "success", content: "Access granted! Welcome, Agent." },
          {
            type: "avatar",
            content: "I've been expecting you. Welcome to the hidden layer of TechVerse.",
            metadata: { avatarType: "hacker" },
          },
        ]
      }

      return [{ type: "text", content: `sudo: command not found: ${args[0]}` }]
    },
    exit: () => {
      return [{ type: "text", content: "Goodbye! Closing terminal session..." }]
    },
  }

  // Helper function to resolve paths
  const resolvePath = (path: string): string => {
    if (path.startsWith("/")) {
      return path
    }

    if (path === "..") {
      const parts = currentDirectory.split("/").filter(Boolean)
      if (parts.length === 0) {
        return "/"
      }
      parts.pop()
      return "/" + parts.join("/")
    }

    if (path === ".") {
      return currentDirectory
    }

    return currentDirectory === "/" ? `/${path}` : `${currentDirectory}/${path}`
  }

  // Execute command
  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(" ")
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    if (command === "") {
      return [{ type: "text", content: "" }]
    }

    if (commands[command as keyof typeof commands]) {
      return commands[command as keyof typeof commands](args)
    }

    return [{ type: "error", content: `command not found: ${command}` }]
  }

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (input.trim() === "") return

    const result = executeCommand(input)
    setHistory([...history, { command: input, result }])
    setInput("")

    // Auto-scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 100)
  }

  // Focus input on click
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Initialize terminal
  useEffect(() => {
    setIsLoaded(true)

    // If domain is specified, navigate to that directory
    if (initialDomain) {
      const domainPath = `/projects/${initialDomain}`
      if (fileSystem[domainPath]) {
        setCurrentDirectory(domainPath)
        setHistory([
          {
            command: `cd ${domainPath}`,
            result: [{ type: "text", content: `Changed directory to ${domainPath}` }],
          },
          {
            command: "ls",
            result: commands.ls(),
          },
        ])
      }
    } else {
      // Show welcome message
      setHistory([
        {
          command: "cat /home/welcome.txt",
          result: [{ type: "file", content: fileSystem["/home/welcome.txt"].content }],
        },
      ])
    }

    // Focus input
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [initialDomain])

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-orbitron neon-text mb-4"
        >
          TechVerse Explorer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-primary/70 max-w-2xl mx-auto"
        >
          Navigate the digital frontier through our command-line interface.
        </motion.p>
      </div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="terminal-border overflow-hidden">
          <div className="terminal-header">
            <div className="terminal-title">TechVerse Terminal</div>
            <div className="terminal-controls">
              <div className="terminal-control bg-red-500"></div>
              <div className="terminal-control bg-yellow-500"></div>
              <div className="terminal-control bg-green-500"></div>
            </div>
          </div>

          <div
            ref={terminalRef}
            className="p-4 font-mono text-sm h-[60vh] overflow-y-auto bg-black"
            onClick={focusInput}
          >
            {/* Welcome message */}
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 border border-primary/30 bg-primary/5 rounded-md"
                >
                  <div className="flex items-start gap-4">
                    <Avatar type="ai" size="md" animated />
                    <div>
                      <h3 className="text-lg font-orbitron neon-text mb-2">Welcome to TechVerse Explorer</h3>
                      <p className="text-primary/70 text-sm mb-2">
                        This terminal allows you to navigate the TechVerse digital ecosystem. Type{" "}
                        <span className="text-primary">help</span> to see available commands.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 border-primary/30 text-primary/70"
                        onClick={() => setShowWelcome(false)}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Command history */}
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center text-primary/80 mb-1">
                  <span className="text-cyan-400 mr-2">guest@techverse</span>
                  <span className="text-primary/50 mr-2">:</span>
                  <span className="text-blue-400 mr-2">{currentDirectory}</span>
                  <span className="text-primary/50 mr-2">$</span>
                  <span>{item.command}</span>
                </div>

                {item.result.map((result, resultIndex) => (
                  <div key={resultIndex} className="ml-2 mb-2">
                    {result.type === "text" && <div className="text-primary/70">{result.content}</div>}

                    {result.type === "error" && <div className="text-red-400">{result.content}</div>}

                    {result.type === "success" && <div className="text-green-400">{result.content}</div>}

                    {result.type === "file" && (
                      <div className="p-2 bg-black/50 border border-primary/20 rounded-md text-primary/80 whitespace-pre-wrap">
                        {result.content}
                      </div>
                    )}

                    {result.type === "directory" && (
                      <div>
                        <div className="text-primary/70 mb-1">{result.content}</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {result.metadata.items.map((item: any, itemIndex: number) => (
                            <div key={itemIndex} className="flex items-center gap-1 text-primary/80">
                              {item.isDirectory ? (
                                <Folder className="h-4 w-4 text-blue-400" />
                              ) : (
                                <FileText className="h-4 w-4 text-primary/60" />
                              )}
                              <span className={item.isDirectory ? "text-blue-400" : ""}>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.type === "help" && (
                      <div>
                        <div className="text-primary/70 mb-1">{result.content}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                          {result.metadata.commands.map((cmd: any, cmdIndex: number) => (
                            <div key={cmdIndex} className="flex items-start gap-2">
                              <code className="text-cyan-400 whitespace-nowrap">{cmd.name}</code>
                              <span className="text-primary/60 text-xs">{cmd.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.type === "avatar" && (
                      <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-md">
                        <Avatar type={result.metadata.avatarType} size="sm" animated />
                        <div className="text-primary/90">{result.content}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Input prompt */}
            <div className="flex items-center text-primary/80">
              <span className="text-cyan-400 mr-2">guest@techverse</span>
              <span className="text-primary/50 mr-2">:</span>
              <span className="text-blue-400 mr-2">{currentDirectory}</span>
              <span className="text-primary/50 mr-2">$</span>
              <form onSubmit={handleSubmit} className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-primary"
                  autoFocus
                />
              </form>
            </div>
          </div>
        </div>

        {/* Terminal help */}
        <div className="mt-4 text-center text-sm text-primary/50">
          Type <code className="text-primary/80 bg-primary/10 px-1 rounded">help</code> to see available commands
        </div>
      </motion.div>
    </div>
  )
}
